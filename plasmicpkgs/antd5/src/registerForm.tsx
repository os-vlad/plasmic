import {
  ActionProps,
  DataProvider,
  repeatedElement,
  usePlasmicCanvasContext,
  CodeComponentMode,
} from "@plasmicapp/host";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import type { FormInstance, FormProps } from "antd/es/form";
import type { FormItemProps } from "antd/es/form/FormItem";
import type { FormListOperation, FormListProps } from "antd/es/form/FormList";
import type { ColProps } from "antd/es/grid/col";
import equal from "fast-deep-equal";
import React, { cloneElement, isValidElement } from "react";
import { mergeProps } from "./react-utils";
import { buttonComponentName } from "./registerButton";
import { checkboxComponentName } from "./registerCheckbox";
import {
  inputComponentName,
  inputNumberComponentName,
  passwordComponentName,
  textAreaComponentName,
} from "./registerInput";
import { radioGroupComponentName } from "./registerRadio";
import { selectComponentName } from "./registerSelect";
import { switchComponentName } from "./registerSwitch";
import { Registerable, registerComponentHelper, usePrevious } from "./utils";
import { PropType } from "@plasmicapp/host/registerComponent";

const reactNodeToString = function (reactNode: React.ReactNode): string {
  let string = "";
  if (typeof reactNode === "string") {
    string = reactNode;
  } else if (typeof reactNode === "number") {
    string = reactNode.toString();
  } else if (reactNode instanceof Array) {
    reactNode.forEach(function (child) {
      string += reactNodeToString(child);
    });
  } else if (isValidElement(reactNode)) {
    string += reactNodeToString(reactNode.props.children);
  }
  return string;
};

function ensureArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? x : [x];
}

const FormItem = Form.Item;
const FormList = Form.List;

interface InternalFormItemProps extends Omit<FormItemProps, "rules"> {
  rules?: PlasmicRule[];
  noLabel?: boolean;
  customizeProps?: (
    fieldData: CuratedFieldData,
    props: InternalFormItemProps
  ) => FormItemProps;
  setControlContextData?: (data: FormControlContextData) => void;
}

export enum InputType {
  Text = "Text",
  TextArea = "Text Area",
  Password = "Password",
  Number = "Number",
  Select = "Select",
  Option = "Option",
  OptionGroup = "Option Group",
  Radio = "Radio",
  RadioGroup = "Radio Group",
  Checkbox = "Checkbox",
  DatePicker = "DatePicker",
}

export interface SimplifiedFormItemsProp extends InternalFormItemProps {
  inputType: InputType;
  options?: {
    label: string;
    value: string;
  }[];
  optionType?: "default" | "button";
}

interface FormWrapperProps extends FormProps {
  /**
   * https://ant.design/components/form#setfieldsvalue-do-not-trigger-onfieldschange-or-onvalueschange
   * Because setFieldsValue doesn't trigger onValuesChange, we need to create our own onChange function.
   * This will allow us to trigger the onChange function and keep the value state updated in canvas.
   * We also don't invoke onValuesChange to avoid changing the standard behavior, since users may have
   * overridden this function in their codebase
   **/
  extendedOnValuesChange?: (
    values: Parameters<NonNullable<FormProps["onValuesChange"]>>[1]
  ) => void;
  formItems: SimplifiedFormItemsProp[];
  mode?: CodeComponentMode;
  submitSlot?: boolean;
}

const PathContext = React.createContext<{
  relativePath: (string | number)[]; // used for form.items inside a form.list
  fullPath: (string | number)[];
}>({ relativePath: [], fullPath: [] });

interface InternalFormInstanceContextData {
  fireOnValuesChange: () => void;
  forceRemount: () => void;
  layout: FormLayoutContextValue;
}

const InternalFormInstanceContext = React.createContext<
  InternalFormInstanceContextData | undefined
>(undefined);

interface FormLayoutContextValue {
  layout: React.ComponentProps<typeof Form>["layout"];
  labelSpan?: number;
}

const FormLayoutContext = React.createContext<
  FormLayoutContextValue | undefined
>(undefined);

const Internal = (
  props: FormWrapperProps & {
    setRemountKey: React.Dispatch<React.SetStateAction<number>>;
    labelCol?: ColProps & { horizontalOnly?: boolean };
    wrapperCol?: ColProps & { horizontalOnly?: boolean };
  }
) => {
  const [form] = Form.useForm();
  const values = form.getFieldsValue(true);
  const lastValue = React.useRef(values);
  const { extendedOnValuesChange, setRemountKey, ...rest } = props;
  // extracted from https://github.com/react-component/field-form/blob/master/src/Form.tsx#L120
  let childrenNode;
  if (props.mode !== "simplified") {
    childrenNode =
      typeof props.children === "function"
        ? props.children(values, form)
        : props.children;
  } else {
    childrenNode = (
      <>
        {(props.formItems ?? []).map((formItem) => (
          <FormItemWrapper
            {...formItem}
            noLabel={
              formItem.inputType === InputType.Checkbox || formItem.noLabel
            }
            style={{ width: "100%" }}
          >
            {formItem.inputType === InputType.Text ? (
              <Input />
            ) : formItem.inputType === InputType.Password ? (
              <Input.Password />
            ) : formItem.inputType === InputType.TextArea ? (
              <Input.TextArea />
            ) : formItem.inputType === InputType.Number ? (
              <InputNumber />
            ) : formItem.inputType === InputType.Checkbox ? (
              <Checkbox>{formItem.label}</Checkbox>
            ) : formItem.inputType === InputType.Select ? (
              <Select options={formItem.options} />
            ) : formItem.inputType === InputType.DatePicker ? (
              <DatePicker />
            ) : formItem.inputType === InputType.RadioGroup ? (
              <Radio.Group
                options={formItem.options}
                optionType={formItem.optionType}
                style={{ padding: "8px" }}
              />
            ) : null}
          </FormItemWrapper>
        ))}
        {props.submitSlot}
      </>
    );
  }

  const fireOnValuesChange = React.useCallback(() => {
    const values = form.getFieldsValue(true);
    if (!equal(values, lastValue.current)) {
      extendedOnValuesChange?.(values);
      lastValue.current = values;
    }
  }, [form, lastValue]);

  React.useEffect(() => {
    fireOnValuesChange();
  }, []);
  const formLayout = React.useMemo(
    () => ({
      layout: props.layout,
      labelSpan: props.labelCol?.span as number | undefined,
    }),
    [props.layout, props.labelCol?.span]
  );
  return (
    <InternalFormInstanceContext.Provider
      value={{
        layout: formLayout,
        fireOnValuesChange,
        forceRemount: () => setRemountKey((k) => k + 1),
      }}
    >
      <FormLayoutContext.Provider value={formLayout}>
        <Form
          {...rest}
          key={
            props.initialValues
              ? JSON.stringify(props.initialValues)
              : undefined
          }
          onValuesChange={(...args) => {
            props.onValuesChange?.(...args);
            extendedOnValuesChange?.(args[1]);
          }}
          form={form}
          labelCol={
            props.labelCol?.horizontalOnly && props.layout !== "horizontal"
              ? undefined
              : props.labelCol
          }
          wrapperCol={
            props.wrapperCol?.horizontalOnly && props.layout !== "horizontal"
              ? undefined
              : props.wrapperCol
          }
        >
          {/*Remove built-in spacing on form fields*/}
          <style>{`
          .ant-form-item-explain + div, .ant-form-item-margin-offset {
            display: none;
          }
          `}</style>
          {childrenNode}
        </Form>
      </FormLayoutContext.Provider>
    </InternalFormInstanceContext.Provider>
  );
};
export function FormWrapper(props: FormWrapperProps) {
  const [remountKey, setRemountKey] = React.useState(0);
  const previousInitialValues = usePrevious(props.initialValues);

  React.useEffect(() => {
    if (
      previousInitialValues !== props.initialValues &&
      JSON.stringify(previousInitialValues) !==
        JSON.stringify(props.initialValues)
    ) {
      setRemountKey((k) => k + 1);
    }
  }, [previousInitialValues, props.initialValues]);

  return <Internal key={remountKey} {...props} setRemountKey={setRemountKey} />;
}

const COMMON_ACTIONS = [
  {
    type: "button-action" as const,
    label: "Append new Form Field",
    onClick: ({ studioOps }: ActionProps<any>) => {
      studioOps.appendToSlot(
        {
          type: "component",
          name: "plasmic-antd5-form-item",
        },
        "children"
      );
    },
    hidden: (props: any) => props.mode === "simplified",
  },
  // {
  //   type: "button-action" as const,
  //   label: "Append new Form Field Group",
  //   onClick: ({ studioOps }: ActionProps<any>) => {
  //     studioOps.appendToSlot(
  //       {
  //         type: "component",
  //         name: "plasmic-antd5-form-group",
  //       },
  //       "children"
  //     );
  //   },
  // },
  // {
  //   type: "button-action" as const,
  //   label: "Append new Form List",
  //   onClick: ({ studioOps }: ActionProps<any>) => {
  //     studioOps.appendToSlot(
  //       {
  //         type: "component",
  //         name: "plasmic-antd5-form-list",
  //       },
  //       "children"
  //     );
  //   },
  // },
];
const colProp = (
  displayName?: string,
  defaultValue?: object,
  description?: string
) =>
  ({
    type: "object",
    displayName: displayName,
    advanced: true,
    fields: {
      span: {
        type: "number",
        displayName: "Width",
        description:
          "The number of grid columns to span in width (out of 24 columns total)",
        min: 1,
        max: 24,
      },
      offset: {
        type: "number",
        displayName: "Offset",
        description:
          "Number of grid columns to skip from the left (out of 24 columns total)",
        min: 0,
        max: 23,
      },
      horizontalOnly: {
        type: "boolean",
        displayName: "Horizontal only",
        description: "Only apply when form layout is horizontal",
      },
    },
    description,
    defaultValue: defaultValue,
  } as const);

export const formComponentName = "plasmic-antd5-form";

export function registerForm(loader?: Registerable) {
  registerComponentHelper(loader, FormWrapper, {
    name: formComponentName,
    displayName: "Form",
    defaultStyles: {
      layout: "vbox",
      alignItems: "flex-start",
    },
    props: {
      mode: {
        type: "controlMode",
        defaultValue: "simplified",
      } as any,
      formItems: {
        displayName: "Fields",
        type: "array",
        itemType: {
          type: "object",
          fields: {
            label: "string",
            inputType: {
              type: "choice",
              options: Object.values(InputType).filter(
                (inputType) =>
                  ![
                    InputType.Option,
                    InputType.OptionGroup,
                    InputType.Radio,
                  ].includes(inputType)
              ),
              defaultValue: InputType.Text,
            },
            options: {
              type: "array",
              itemType: {
                type: "object",
                fields: {
                  type: {
                    type: "choice",
                    options: [
                      { value: "option", label: "Option" },
                      { value: "option-group", label: "Option Group" },
                    ],
                    defaultValue: "option",
                    hidden: (ps, _ctx, { path }) => {
                      if (
                        ps.formItems?.[path[1] as number]?.inputType !==
                        InputType.Select
                      ) {
                        return true;
                      }
                      return false;
                    },
                  },
                  label: "string",
                  value: {
                    type: "string",
                    hidden: (ps, _ctx, { path, item }) => {
                      if (
                        ps.formItems?.[path[1] as number]?.inputType !==
                        InputType.Select
                      ) {
                        return false;
                      }
                      return item.type !== "option";
                    },
                  },
                  options: {
                    type: "array",
                    itemType: {
                      type: "object",
                      nameFunc: (item: any) => item.label || item.value,
                      fields: {
                        value: "string",
                        label: "string",
                      },
                    },
                    hidden: (ps, _ctx, { path, item }) => {
                      if (
                        ps.formItems?.[path[1] as number]?.inputType !==
                        InputType.Select
                      ) {
                        return true;
                      }
                      return item.type !== "option-group";
                    },
                  },
                },
                nameFunc: (item) => item?.label,
              },
              hidden: (_ps: any, _ctx: any, { item }) =>
                ![InputType.Select, InputType.RadioGroup].includes(
                  item.inputType
                ),
            },
            optionType: {
              type: "choice",
              options: [
                { value: "default", label: "Radio" },
                { value: "button", label: "Button" },
              ],
              hidden: (_ps: any, _ctx: any, { item }) =>
                InputType.RadioGroup !== item.inputType,
              defaultValueHint: "Radio",
              displayName: "Option Type",
            },
            ...commonFormItemProps,
          },
          nameFunc: (item) => item.label,
        },
        defaultValue: [
          {
            label: "Name",
            name: "name",
            inputType: InputType.Text,
          },
          {
            label: "Message",
            name: "message",
            inputType: InputType.TextArea,
          },
        ],
        hidden: (props) => props.mode !== "simplified",
      },
      submitSlot: {
        type: "slot",
        hidden: () => true,
        defaultValue: {
          type: "component",
          name: buttonComponentName,
          props: {
            type: "primary",
            submitsForm: true,
            children: {
              type: "text",
              value: "Submit",
            },
          },
        },
        ...{
          mergeWithParent: () => true,
          hiddenMergedProps: (ps: any) => !ps.mode,
        },
      },
      children: {
        type: "slot",
        defaultValue: [
          {
            type: "component",
            name: formItemComponentName,
            props: {
              label: {
                type: "text",
                value: "Name",
              },
              name: "name",
              children: {
                type: "component",
                name: inputComponentName,
              },
            },
          },
          {
            type: "component",
            name: formItemComponentName,
            props: {
              label: {
                type: "text",
                value: "Message",
              },
              name: "message",
              children: {
                type: "component",
                name: textAreaComponentName,
              },
            },
          },
          {
            type: "component",
            name: buttonComponentName,
            props: {
              children: {
                type: "text",
                value: "Submit",
              },
              type: "primary",
              submitsForm: true,
            },
          },
        ],
        hidden: (props) => props.mode === "simplified",
      },
      initialValues: {
        displayName: "Initial field values",
        type: "object",
      } as any,
      layout: {
        displayName: "Form layout",
        type: "choice",
        options: ["horizontal", "vertical", "inline"],
        defaultValue: "vertical",
      },
      labelAlign: {
        type: "choice",
        options: ["left", "right"],
        defaultValueHint: "right",
        advanced: true,
        hidden: (ps) => ps.layout !== "horizontal",
      },
      labelCol: colProp(
        "Label layout",
        {
          span: 8,
          horizontalOnly: true,
        },
        "Set the width and offset of the labels"
      ),
      wrapperCol: colProp(
        "Control layout",
        {
          span: 16,
          horizontalOnly: true,
        },
        "Set the width and offset of the form controls"
      ),
      colon: {
        type: "boolean",
        description: `Show a colon after labels by default (only for horizontal layout)`,
        defaultValueHint: true,
        advanced: true,
        hidden: (props) => (props.layout ?? "horizontal") !== "horizontal",
      },
      requiredMark: {
        displayName: "Required/optional indicators",
        type: "choice",
        options: [
          {
            value: "optional",
            label: "Indicate optional fields",
          },
          {
            value: true,
            label: "Indicate required fields with asterisk",
          },
          {
            value: false,
            label: "Show no indicators",
          },
        ],
        advanced: true,
        defaultValueHint: true,
      },
      extendedOnValuesChange: {
        type: "eventHandler",
        displayName: "On values change",
        argTypes: [
          {
            name: "changedValues",
            type: "object",
          },
          {
            name: "allValues",
            type: "object",
          },
        ],
      },
      onFinish: {
        type: "eventHandler",
        displayName: "On submit",
        argTypes: [
          {
            name: "values",
            type: "object",
          },
        ],
      },
      onFinishFailed: {
        // function({ values, errorFields, outOfDate })
        type: "eventHandler",
        displayName: "On invalid submit",
        argTypes: [
          {
            name: "data",
            type: "object",
          },
        ],
      },
      validateTrigger: {
        displayName: "Validate rules",
        type: "choice",
        options: [
          { value: "onBlur", label: "When a field loses focus" },
          { value: "onChange", label: "When a field changes" },
          { value: "onSubmit", label: "When the form is submitted" },
        ],
        multiSelect: true,
        defaultValueHint: ["onChange"],
        advanced: true,
      },
    },
    actions: COMMON_ACTIONS,
    states: {
      value: {
        type: "readonly",
        variableType: "object",
        onChangeProp: "extendedOnValuesChange",
      },
    },
    importPath: "@plasmicpkgs/antd5/skinny/registerForm",
    importName: "FormWrapper",
  });
}

interface FormControlContextData {
  internalFormCtx?: InternalFormInstanceContextData;
}

interface CuratedFieldData {
  status: string | undefined;
  // path: (string | number)[];
  // errors: string[];
  // warnings: string[];
  // value: any;
  // trigger: (x: any) => void;
}

interface InternalFormItemProps extends Omit<FormItemProps, "rules"> {
  rules?: PlasmicRule[];
  description?: React.ReactNode;
  noLabel?: boolean;
  hideValidationMessage?: boolean;
  customizeProps?: (
    fieldData: CuratedFieldData,
    props: InternalFormItemProps
  ) => FormItemProps;
  setControlContextData?: (data: FormControlContextData) => void;
  alignLabellessWithControls?: boolean;
}

interface PlasmicRule {
  ruleType:
    | "enum"
    | "len"
    | "max"
    | "min"
    | "regex"
    | "required"
    | "whitespace"
    | "advanced";
  length?: number;
  pattern?: string;
  custom?: (...args: any[]) => any;
  options?: { value: string }[];
  message?: string;
}

function plasmicRulesToAntdRules(
  plasmicRules: PlasmicRule[],
  label: string | undefined
) {
  const effectiveLabel = label || "This field";
  const rules: FormItemProps["rules"] = [];
  for (const plasmicRule of plasmicRules) {
    switch (plasmicRule.ruleType) {
      case "enum":
        rules.push({
          type: "enum",
          enum: plasmicRule.options?.map((opt) => opt.value) ?? [],
          message:
            plasmicRule.message ?? `${effectiveLabel} must be a valid value`,
        });
        break;
      case "required":
        rules.push({
          required: true,
          message: plasmicRule.message ?? `${effectiveLabel} is required`,
        });
        break;
      case "regex":
        rules.push({
          pattern: new RegExp(plasmicRule.pattern ?? ""),
          message:
            plasmicRule.message ?? `${effectiveLabel} must be a valid value`,
        });
        break;
      case "whitespace":
        rules.push({
          whitespace: true,
          message: plasmicRule.message ?? `${effectiveLabel} is required`,
        });
        break;
      case "min":
        rules.push({
          [plasmicRule.ruleType]: plasmicRule.length,
          message:
            plasmicRule.message ??
            `${effectiveLabel} must be at least ${plasmicRule.length} characters`,
        });
        break;
      case "max":
        rules.push({
          [plasmicRule.ruleType]: plasmicRule.length,
          message:
            plasmicRule.message ??
            `${effectiveLabel} must be at most ${plasmicRule.length} characters`,
        });
        break;
      case "advanced":
        rules.push({
          validator: (...args) =>
            plasmicRule.custom?.apply(null, args)
              ? Promise.resolve()
              : Promise.reject(),
          message: plasmicRule.message,
        });
    }
  }
  return rules;
}

const useFormItemRelativeName = (name: FormItemProps["name"]) => {
  const pathCtx = React.useContext(PathContext);
  return typeof name === "object"
    ? [...pathCtx.relativePath, ...name]
    : typeof name === "string"
    ? [...pathCtx.relativePath, name]
    : undefined;
};

const useFormItemFullName = (name: FormItemProps["name"]) => {
  const pathCtx = React.useContext(PathContext);
  return typeof name === "object"
    ? [...pathCtx.fullPath, ...name]
    : typeof name === "string"
    ? [...pathCtx.fullPath, name]
    : undefined;
};

function useFormInstanceMaybe(): FormInstance<any> | undefined {
  return Form.useFormInstance();
}

export function FormItemWrapper(props: InternalFormItemProps) {
  const {
    rules: plasmicRules,
    description,
    noLabel,
    name,
    hideValidationMessage,
    customizeProps,
    setControlContextData,
    alignLabellessWithControls = true,
    ...rest
  } = props;
  const relativeFormItemName = useFormItemRelativeName(name);
  const fullFormItemName = useFormItemFullName(name);
  const bestEffortLabel =
    (!noLabel && reactNodeToString(props.label)) ||
    ensureArray(props.name).slice(-1)[0];
  const rules = plasmicRules
    ? plasmicRulesToAntdRules(
        plasmicRules,
        typeof bestEffortLabel === "number"
          ? "" + bestEffortLabel
          : bestEffortLabel
      )
    : undefined;
  const layoutContext = React.useContext(FormLayoutContext);
  const inCanvas = !!usePlasmicCanvasContext();
  if (inCanvas) {
    const form = useFormInstanceMaybe();
    const prevPropValues = React.useRef({
      initialValue: props.initialValue,
      name: props.name,
    });
    const internalFormCtx = React.useContext(InternalFormInstanceContext);
    const { fireOnValuesChange, forceRemount } = internalFormCtx ?? {};
    props.setControlContextData?.({
      internalFormCtx,
    });
    React.useEffect(() => {
      if (prevPropValues.current.name !== props.name) {
        forceRemount?.();
      }
      if (
        !fullFormItemName ||
        form?.getFieldValue(fullFormItemName) !==
          prevPropValues.current.initialValue
      ) {
        // this field value is set at the form level
        return;
      }
      form?.setFieldValue(fullFormItemName, props.initialValue);
      prevPropValues.current.initialValue = props.initialValue;
      fireOnValuesChange?.();
    }, [form, props.initialValue, fullFormItemName]);
  }
  return (
    <FormItem
      {...rest}
      label={noLabel ? undefined : props.label}
      name={relativeFormItemName}
      rules={rules}
      extra={description}
      help={hideValidationMessage ? "" : props.help}
      colon={noLabel ? false : undefined}
      valuePropName={deriveValuePropName(props)}
      // If in horizontal mode and no label, then we align the content
      // with the rest of the controls in the grid
      // if alignLabellessWithControls is true
      wrapperCol={
        layoutContext?.layout === "horizontal" &&
        noLabel &&
        alignLabellessWithControls &&
        layoutContext.labelSpan
          ? { offset: layoutContext.labelSpan }
          : undefined
      }
    >
      <FormItemForwarder formItemProps={props} />
    </FormItem>
  );
}

/**
 * Derive the valuePropName to use, if the wrapped child has designated
 * one via its Component.__plasmicFormFieldMeta?.valueProp.
 */
function deriveValuePropName(props: InternalFormItemProps): string | undefined {
  if (props.valuePropName) {
    // Always prefer an explicitly specified valuePropName
    return props.valuePropName;
  }

  const valueProps = React.Children.map(props.children as any, (child) => {
    if (React.isValidElement(child)) {
      const childType = child.type;
      if (childType) {
        const x = (childType as any).__plasmicFormFieldMeta?.valueProp;
        if (x) {
          return x as string;
        }
        // Hard-coding "isChecked" for Plume checkbox / switch
        const plumeType = (childType as any).__plumeType;
        if (plumeType && (plumeType === "checkbox" || plumeType === "switch")) {
          return "isChecked";
        }
      }
    }
    return undefined;
  }).filter((x: any): x is string => !!x);
  if (valueProps.length > 0) {
    return valueProps[0];
  }
  return undefined;
}

function FormItemForwarder({ formItemProps, ...props }: any) {
  const status = Form.Item.useStatus();
  const internalFormCtx = React.useContext(InternalFormInstanceContext);
  // const value = props[formItemProps.valuePropName ?? "value"];
  // const trigger = props[formItemProps.trigger ?? "onChange"];
  const data: CuratedFieldData = {
    status: status.status,
  };
  props.setControlContextData?.({
    internalFormCtx,
    status,
  });
  return React.Children.map(formItemProps.children, (child, i) => {
    let newProps = {
      ...(child.props ?? {}),
      ...props,
      __plasmicFormField: true,
    };
    if (formItemProps.customizeProps) {
      newProps = mergeProps(
        newProps,
        formItemProps.customizeProps(data, newProps)
      );
    }
    return i === 0 && isValidElement(child)
      ? cloneElement(child, newProps)
      : child;
  });
}

const commonFormItemProps: Record<string, PropType<InternalFormItemProps>> = {
  name: {
    type: "string" as const,
  },
  initialValue: {
    type: "string" as const,
  },
  rules: {
    displayName: "Validation rules",
    type: "formValidationRules" as const,
  } as any,
  valuePropName: {
    type: "string" as const,
    advanced: true,
    defaultValueHint: "value",
    description:
      "The prop name for specifying the value of the form control component",
  },
  noLabel: {
    type: "boolean" as const,
    advanced: true,
  },
  alignLabellessWithControls: {
    type: "boolean" as const,
    displayName: "Align with controls?",
    description: "Aligns the content with form controls in the grid",
    hidden: (ps, ctx) =>
      !ps.noLabel || ctx?.internalFormCtx?.layout.layout !== "horizontal",
    defaultValueHint: true,
  },
  colon: {
    type: "boolean" as const,
    defaultValueHint: true,
    advanced: true,
    hidden: () => true,
  },
  labelAlign: {
    type: "choice" as const,
    options: ["left", "right"],
    advanced: true,
    hidden: (ps, ctx) =>
      !!ps.noLabel || ctx?.internalFormCtx?.layout.layout !== "horizontal",
  },
  hidden: {
    type: "boolean" as const,
    advanced: true,
  },
  validateTrigger: {
    type: "choice" as const,
    options: ["onSubmit", "onChange", "onBlur"],
    multiSelect: true as const,
    advanced: true,
  },
  shouldUpdate: {
    type: "boolean" as const,
    advanced: true,
    displayName: "Always re-render",
    description:
      "Form fields normally only re-render when the corresponding form value changes, for performance. This forces it to always re-render.",
  },
  dependencies: {
    type: "array" as const,
    advanced: true,
    displayName: "Dependencies",
    description:
      "Form fields can depend on other form fields. This forces it to re-evaluate the validation rules when the other form fields changes.",
  },
  hideValidationMessage: {
    type: "boolean" as const,
    displayName: "Hide validation message?",
    description: "If true, will hide the validation error message",
    defaultValueHint: false,
    advanced: true,
  },
  customizeProps: {
    type: "function" as const,
    description:
      "Customize the props passed into the wrapped field component. Takes the current status ('success', 'warning', 'error', or 'validating').)",
    argNames: ["fieldData"],
    argValues: (_ps: any, ctx: any) => [
      {
        status: ctx?.status?.status,
      },
    ],
    advanced: true,
  } as any,
  noStyle: {
    type: "boolean" as const,
    displayName: "Field control only",
    description:
      "Don't render anything but the field control - so no label, help text, validation error, etc.",
    advanced: true,
  },
};

export const formItemComponentName = "plasmic-antd5-form-item";

export function registerFormItem(loader?: Registerable) {
  registerComponentHelper(loader, FormItemWrapper, {
    name: formItemComponentName,
    displayName: "Form Field",
    parentComponentName: formComponentName,
    defaultStyles: {
      marginBottom: "24px",
      width: "stretch",
    },
    props: {
      label: {
        type: "slot",
        defaultValue: {
          type: "text",
          value: "Label",
        },
        hidden: (ps) => !!ps.noLabel,
        ...({ mergeWithParent: true } as any),
      },
      children: {
        type: "slot",
        defaultValue: {
          type: "component",
          name: inputComponentName,
        },
        ...({ mergeWithParent: true } as any),
      },
      ...commonFormItemProps,
    },
    importPath: "@plasmicpkgs/antd5/skinny/registerForm",
    importName: "FormItemWrapper",
    templates: {
      Text: {
        props: {
          children: {
            type: "component",
            name: inputComponentName,
          },
        },
      },
      "Long Text": {
        props: {
          children: {
            type: "component",
            name: textAreaComponentName,
          },
        },
      },
      "Select dropdown": {
        props: {
          children: {
            type: "component",
            name: selectComponentName,
          },
        },
      },
      Number: {
        props: {
          children: {
            type: "component",
            name: inputNumberComponentName,
          },
        },
      },
      Checkbox: {
        props: {
          children: {
            type: "component",
            name: checkboxComponentName,
          },
          noLabel: true,
        },
      },
      Switch: {
        props: {
          children: {
            type: "component",
            name: switchComponentName,
          },
          noLabel: true,
        },
      },
      Radios: {
        props: {
          children: {
            type: "component",
            name: radioGroupComponentName,
          },
        },
      },
      Password: {
        props: {
          children: {
            type: "component",
            name: passwordComponentName,
          },
        },
      },
      "Submit button": {
        props: {
          children: {
            type: "component",
            name: buttonComponentName,
            props: {
              type: "primary",
            },
          },
          noLabel: true,
        },
      },
    },
    ...({ trapsSelection: true } as any),
  });
}

export interface FormGroupProps {
  name: string;
  children: React.ReactNode;
}

export function FormGroup(props: FormGroupProps) {
  const pathCtx = React.useContext(PathContext);
  return (
    <PathContext.Provider
      value={{
        relativePath: [...pathCtx.relativePath, props.name],
        fullPath: [...pathCtx.fullPath, props.name],
      }}
    >
      {props.children}
    </PathContext.Provider>
  );
}

export const formGroupComponentName = "plasmic-antd5-form-group";

export function registerFormGroup(loader?: Registerable) {
  registerComponentHelper(loader, FormGroup, {
    name: formGroupComponentName,
    displayName: "Form Field Group",
    parentComponentName: formComponentName,
    actions: COMMON_ACTIONS,
    props: {
      name: {
        type: "string",
      },
      children: {
        type: "slot",
      },
    },
    importPath: "@plasmicpkgs/antd5/skinny/registerForm",
    importName: "FormGroup",
  });
}

type FormListWrapperProps = FormListProps & {
  children: React.ReactNode;
};

type FormListRenderFuncParams = Parameters<FormListProps["children"]>;

export const FormListWrapper = React.forwardRef(function FormListWrapper(
  props: FormListWrapperProps,
  ref: React.Ref<FormListOperation>
) {
  const relativeFormItemName = useFormItemRelativeName(props.name);
  const fullFormItemName = useFormItemFullName(props.name);
  const operationsRef = React.useRef<FormListRenderFuncParams | undefined>(
    undefined
  );
  React.useImperativeHandle(
    ref,
    () => ({
      add(defaultValue, insertIndex) {
        if (operationsRef.current) {
          const { add } = operationsRef.current[1];
          add(defaultValue, insertIndex);
        }
      },
      remove(index) {
        if (operationsRef.current) {
          const { remove } = operationsRef.current[1];
          remove(index);
        }
      },
      move(from, to) {
        if (operationsRef.current) {
          const { move } = operationsRef.current[1];
          move(from, to);
        }
      },
    }),
    [operationsRef]
  );
  const inCanvas = !!usePlasmicCanvasContext();
  if (inCanvas) {
    const form = useFormInstanceMaybe();
    const prevPropValues = React.useRef({
      initialValue: props.initialValue,
      name: props.name,
    });
    const { fireOnValuesChange, forceRemount } =
      React.useContext(InternalFormInstanceContext) ?? {};
    React.useEffect(() => {
      if (prevPropValues.current.name !== props.name) {
        forceRemount?.();
      }
      if (fullFormItemName) {
        form?.setFieldValue(fullFormItemName, props.initialValue);
        prevPropValues.current.initialValue = props.initialValue;
        fireOnValuesChange?.();
      }
    }, [props.initialValue, fullFormItemName]);
  }
  return (
    <FormList {...props} name={relativeFormItemName ?? []}>
      {(...args) => {
        operationsRef.current = args;
        return args[0].map((field, index) => (
          <PathContext.Provider
            value={{
              relativePath: [field.name],
              fullPath: [...(fullFormItemName ?? []), field.name],
            }}
          >
            <DataProvider name={"currentField"} data={field}>
              <DataProvider name={"currentFieldIndex"} data={index}>
                {repeatedElement(index, props.children)}
              </DataProvider>
            </DataProvider>
          </PathContext.Provider>
        ));
      }}
    </FormList>
  );
});

export const formListComponentName = "plasmic-antd5-form-list";

export function registerFormList(loader?: Registerable) {
  registerComponentHelper(loader, FormListWrapper, {
    name: formListComponentName,
    parentComponentName: formComponentName,
    displayName: "Form List",
    actions: COMMON_ACTIONS,
    props: {
      children: {
        type: "slot",
        defaultValue: [
          {
            type: "hbox",
            children: [
              {
                type: "component",
                name: formItemComponentName,
                props: {
                  name: "firstName",
                  label: {
                    type: "text",
                    value: "First name",
                  },
                  children: {
                    type: "component",
                    name: "plasmic-antd5-input",
                  },
                },
              },
              {
                type: "component",
                name: formItemComponentName,
                props: {
                  name: "lastName",
                  label: {
                    type: "text",
                    value: "Last name",
                  },
                  children: {
                    type: "component",
                    name: "plasmic-antd5-input",
                  },
                },
              },
            ],
          },
        ],
      },
      name: {
        type: "string",
        defaultValue: "guests",
      },
      initialValue: {
        type: "array",
        defaultValue: [
          {
            firstName: "Jane",
            lastName: "Doe",
          },
          {
            firstName: "John",
            lastName: "Smith",
          },
        ],
      } as any,
    },
    refActions: {
      add: {
        displayName: "Add an item",
        argTypes: [
          {
            name: "defaultValue",
            displayName: "Default value",
            type: "object",
          },
          {
            name: "insertIndex",
            displayName: "Insert index",
            type: "number",
          },
        ],
      },
      remove: {
        displayName: "Remove an item",
        argTypes: [
          {
            name: "index",
            displayName: "Index",
            type: "number",
          },
        ],
      },
      move: {
        displayName: "Move field",
        argTypes: [
          {
            name: "from",
            displayName: "From",
            type: "number",
          },
          {
            name: "to",
            displayName: "To",
            type: "number",
          },
        ],
      },
    },
    importPath: "@plasmicpkgs/antd5/skinny/registerForm",
    importName: "FormListWrapper",
  });
}
