import {
  CodeComponentElement,
  CSSProperties,
  PlasmicElement,
} from "./element-types";
import {
  ContextDependentConfig,
  InferDataType,
  ModalProps,
  PropType,
  RestrictPropType,
} from "./prop-types";
export type {
  CanvasComponentProps,
  ControlExtras,
  ControlContext,
  ContextDependentConfig,
  PropType,
} from "./prop-types";

const root = globalThis as any;

export interface ActionProps<P> {
  componentProps: P;
  /**
   * `contextData` can be `null` if the prop controls are rendering before
   * the component instance itself (it will re-render once the component
   * calls `setControlContextData`)
   */
  contextData: InferDataType<P> | null;
  studioOps: {
    showModal: (
      modalProps: Omit<ModalProps, "onClose"> & { onClose?: () => void }
    ) => void;
    refreshQueryData: () => void;
    appendToSlot: (element: PlasmicElement, slotName: string) => void;
    removeFromSlotAt: (pos: number, slotName: string) => void;
    updateProps: (newValues: any) => void;
  };
  /**
   * The document that the component will be rendered into; instead of using
   * `document` directly (for, say, `document.querySelector()` etc.), you
   * should use this instead.
   */
  studioDocument: typeof document;
}

export type Action<P> =
  | {
      type: "button-action";
      label: string;
      onClick: (props: ActionProps<P>) => void;
      hidden?: ContextDependentConfig<P, boolean>;
    }
  | {
      type: "custom-action";
      control: React.ComponentType<ActionProps<P>>;
      hidden?: ContextDependentConfig<P, boolean>;
    };

type DistributedKeyOf<T> = T extends any ? keyof T : never;

interface ComponentTemplate<P>
  extends Omit<CodeComponentElement<P>, "type" | "name"> {
  /**
   * A preview picture for the template.
   */
  previewImg?: string;
}

export interface ComponentTemplates<P> {
  [name: string]: ComponentTemplate<P>;
}

export type StateSpec = {
  onChangeProp: string;
} & (
  | {
      type: "readonly";
      variableType: "text";
      initVal?: string;
    }
  | {
      type: "readonly";
      variableType: "number";
      initVal?: number;
    }
  | {
      type: "readonly";
      variableType: "boolean";
      initVal?: boolean;
    }
  | {
      type: "readonly";
      variableType: "array";
      initVal?: any[];
    }
  | {
      type: "readonly";
      variableType: "object";
      initVal?: object;
    }
  | {
      type: "writable";
      variableType: "text" | "number" | "boolean" | "array" | "object";
      valueProp: string;
    }
);

export interface StateHelpers<P, T> {
  initFunc?: ($props: P) => T;
  onChangeArgsToValue?: (...args: any) => T;
}

export type ComponentHelpers<P> = {
  states: Record<string, StateHelpers<P, any>>;
};

export type ExternalComponentHelpers<P> = {
  helpers: ComponentHelpers<P>;
  importPath: string;
} & (
  | {
      importName: string;
    }
  | {
      isDefaultExport: true;
    }
);

export type StyleSection =
  | "visibility"
  | "typography"
  | "sizing"
  | "spacing"
  | "background"
  | "transform"
  | "transitions"
  | "layout"
  | "overflow"
  | "border"
  | "shadows"
  | "effects";

export interface CodeComponentMeta<P> {
  /**
   * Any unique string name used to identify that component. Each component
   * should be registered with a different `meta.name`, even if they have the
   * same name in the code.
   */
  name: string;
  /**
   * The name to be displayed for the component in Studio. Optional: if not
   * specified, `meta.name` is used.
   */
  displayName?: string;
  /**
   * The description of the component to be shown in Studio.
   */
  description?: string;
  /**
   * The javascript name to be used when generating code. Optional: if not
   * provided, `meta.name` is used.
   */
  importName?: string;
  /**
   * An object describing the component properties to be used in Studio.
   * For each `prop`, there should be an entry `meta.props[prop]` describing
   * its type.
   */
  props: { [prop in DistributedKeyOf<P>]?: RestrictPropType<P[prop], P> } & {
    [prop: string]: PropType<P>;
  };
  /**
   * An object describing the component states to be used in Studio.
   */
  states?: Record<string, StateSpec>;
  /**
   * An object describing the components helpers to be used in Studio.
   *   1. states helpers: Each state can receive an "initFunc" prop to initialize
   *      the implicit state in Studio, and an "onChangeArgsToValue" prop to
   *      transform the event handler arguments into a value
   */
  componentHelpers?: ExternalComponentHelpers<P>;
  /**
   * An array describing the component actions to be used in Studio.
   */
  actions?: Action<P>[];
  /**
   * Whether style sections should be shown in Studio. For styles to work, the
   * component must accept a `className` prop. If unset, defaults to all styles.
   * Set to `false` if this component cannot be styled (for example, if it doesn't
   * render any DOM elements).
   */
  styleSections?: StyleSection[] | boolean;
  /**
   * Whether the element can be repeated in Studio. If unset, defaults to true.
   */
  isRepeatable?: boolean;
  /**
   * The path to be used when importing the component in the generated code.
   * It can be the name of the package that contains the component, or the path
   * to the file in the project (relative to the root directory).
   */
  importPath: string;
  /**
   *  Whether the component is the default export from that path. Optional: if
   * not specified, it's considered `false`.
   */
  isDefaultExport?: boolean;
  /**
   * The prop that expects the CSS classes with styles to be applied to the
   * component. Optional: if not specified, Plasmic will expect it to be
   * `className`. Notice that if the component does not accept CSS classes, the
   * component will not be able to receive styles from the Studio.
   */
  classNameProp?: string;
  /**
   * The prop that receives and forwards a React `ref`. Plasmic only uses `ref`
   * to interact with components, so it's not used in the generated code.
   * Optional: If not provided, the usual `ref` is used.
   */
  refProp?: string;
  /**
   * Default styles to start with when instantiating the component in Plasmic.
   */
  defaultStyles?: CSSProperties;
  /**
   * Component templates to start with on Plasmic.
   */
  templates?: ComponentTemplates<P>;
  /**
   * Registered name of parent component, used for grouping related components.
   */
  parentComponentName?: string;
  /**
   * Whether the component can be used as an attachment to an element.
   */
  isAttachment?: boolean;
  /**
   * Whether the component provides data to its slots using DataProvider.
   */
  providesData?: boolean;

  /**
   * If specified, then Figma components with the specified names will be mapped
   * to this component when you paste Figma content into Plasmic
   */
  figmaMappings?: {
    figmaComponentName: string;
  }[];

  /**
   * If true, when an instance of this component is added, the element
   * will always be named by the name of this component.
   */
  alwaysAutoName?: boolean;

  refActions?: Record<string, RefActionRegistration<P>>;
}

export type CodeComponentMode =
  | "advanced"
  | "simplified"
  | "database-schema-driven";

/**
 * @deprecated use CodeComponentMeta instead
 */
export type ComponentMeta<P> = CodeComponentMeta<P>;

export interface FunctionParam<P> {
  name: string;
  displayName?: string;
  type: PropType<P>;
}

export interface RefActionRegistration<P> {
  displayName?: string;
  description?: string;
  argTypes: FunctionParam<P>[];
}

export interface ComponentRegistration {
  component: React.ComponentType<any>;
  meta: CodeComponentMeta<any>;
}

declare global {
  interface Window {
    __PlasmicComponentRegistry: ComponentRegistration[];
  }
}

if (root.__PlasmicComponentRegistry == null) {
  root.__PlasmicComponentRegistry = [];
}

export default function registerComponent<T extends React.ComponentType<any>>(
  component: T,
  meta: CodeComponentMeta<React.ComponentProps<T>>
) {
  // Check for duplicates
  if (
    root.__PlasmicComponentRegistry.some(
      (r: ComponentRegistration) =>
        r.component === component && r.meta.name === meta.name
    )
  ) {
    return;
  }
  root.__PlasmicComponentRegistry.push({ component, meta });
}
