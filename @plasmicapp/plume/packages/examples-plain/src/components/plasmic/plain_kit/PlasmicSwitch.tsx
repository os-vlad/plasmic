/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsx createPlasmicElementProxy */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: wtmthg1Ku3JDsEq1LhL9ox
// Component: iXSR2ghqMB
import * as React from 'react';
import {
  hasVariant,
  classNames,
  Flex,
  wrapWithClassName,
  Renderer,
  NodeRenderer,
  createPlasmicElementProxy,
  makeFragment,
  PlasmicIcon,
  PlasmicSlot,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
} from '@plasmicapp/react-web';

import '@plasmicapp/react-web/lib/plasmic.css';
import '../plasmic__default_style.css'; // plasmic-import: global/defaultcss
import './plasmic_plain_kit.css'; // plasmic-import: wtmthg1Ku3JDsEq1LhL9ox/projectcss
import './PlasmicSwitch.css'; // plasmic-import: iXSR2ghqMB/css

export type PlasmicSwitch__VariantsArgs = {
  isSelected?: SingleBooleanChoiceArg<'isSelected'>;
  hasLabel?: SingleBooleanChoiceArg<'hasLabel'>;
  isDisabled?: SingleBooleanChoiceArg<'isDisabled'>;
};

export const PlasmicSwitch__VariantProps = new Array<
  keyof PlasmicSwitch__VariantsArgs
>('isSelected', 'hasLabel', 'isDisabled');

export type PlasmicSwitch__ArgsType = {
  children?: React.ReactNode;
};

export const PlasmicSwitch__ArgProps = new Array<keyof PlasmicSwitch__ArgsType>(
  'children'
);

export type PlasmicSwitch__OverridesType = {
  root?: Flex<'div'>;
  _switch?: Flex<'div'>;
  thumb?: Flex<'div'>;
  focusRing?: Flex<'div'>;
  track?: Flex<'div'>;
  labelContainer?: Flex<'div'>;
};

export interface DefaultSwitchProps {
  children?: React.ReactNode;
  isSelected?: SingleBooleanChoiceArg<'isSelected'>;
  hasLabel?: SingleBooleanChoiceArg<'hasLabel'>;
  isDisabled?: SingleBooleanChoiceArg<'isDisabled'>;
  className?: string;
}

function PlasmicSwitch__RenderFunc(props: {
  variants: PlasmicSwitch__VariantsArgs;
  args: PlasmicSwitch__ArgsType;
  overrides: PlasmicSwitch__OverridesType;
  forNode?: string;
}) {
  const { variants, args, overrides, forNode } = props;

  const [
    isRootFocusVisibleWithin,
    triggerRootFocusVisibleWithinProps,
  ] = useTrigger('useFocusVisibleWithin', {
    isTextInput: false,
  });

  const triggers = {
    focusVisibleWithin_root: isRootFocusVisibleWithin,
  };

  return (
    <div
      data-plasmic-name={'root'}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      data-plasmic-wrap-flex-child={true}
      className={classNames({
        'Switch__root--isDisabled__gmrzoKL47J': hasVariant(
          variants,
          'isDisabled',
          'isDisabled'
        ),

        Switch__root__gmrzo: true,
        'plasmic-default__all': true,
        'plasmic-default__div': true,
      })}
      data-plasmic-trigger-props={[triggerRootFocusVisibleWithinProps]}
    >
      <div
        data-plasmic-name={'_switch'}
        data-plasmic-override={overrides._switch}
        className={classNames({
          'Switch___switch--isDisabled__S22uRKL47J': hasVariant(
            variants,
            'isDisabled',
            'isDisabled'
          ),

          'Switch___switch--isSelected__S22uROjTJ4': hasVariant(
            variants,
            'isSelected',
            'isSelected'
          ),

          Switch___switch__S22uR: true,
          'plasmic-default__all': true,
          'plasmic-default__div': true,
        })}
      >
        <div
          data-plasmic-name={'thumb'}
          data-plasmic-override={overrides.thumb}
          className={classNames({
            'Switch__thumb--__BQnizeVudc': triggers.focusVisibleWithin_root,
            'Switch__thumb--isSelected__BQnizOjTJ4': hasVariant(
              variants,
              'isSelected',
              'isSelected'
            ),

            Switch__thumb__BQniz: true,
            'plasmic-default__all': true,
            'plasmic-default__div': true,
          })}
        >
          {(triggers.focusVisibleWithin_root ? true : false) ? (
            <div
              data-plasmic-name={'focusRing'}
              data-plasmic-override={overrides.focusRing}
              className={classNames({
                'Switch__focusRing--__SafrUeVudc':
                  triggers.focusVisibleWithin_root,
                Switch__focusRing__SafrU: true,
                'plasmic-default__all': true,
                'plasmic-default__div': true,
              })}
            ></div>
          ) : null}
        </div>

        <div
          data-plasmic-name={'track'}
          data-plasmic-override={overrides.track}
          className={classNames({
            'Switch__track--isSelected__Ncm9TOjTJ4': hasVariant(
              variants,
              'isSelected',
              'isSelected'
            ),

            Switch__track__Ncm9T: true,
            'plasmic-default__all': true,
            'plasmic-default__div': true,
          })}
        ></div>
      </div>

      {(hasVariant(variants, 'hasLabel', 'hasLabel') ? true : false) ? (
        <div
          data-plasmic-name={'labelContainer'}
          data-plasmic-override={overrides.labelContainer}
          className={classNames({
            'Switch__labelContainer--hasLabel__3HTrOSbuZN': hasVariant(
              variants,
              'hasLabel',
              'hasLabel'
            ),

            Switch__labelContainer__3HTrO: true,
            'plasmic-default__all': true,
            'plasmic-default__div': true,
          })}
        >
          <PlasmicSlot defaultContents={'Switch me!'} value={args.children} />
        </div>
      ) : null}
    </div>
  ) as React.ReactElement | null;
}

class PlasmicSwitch__Renderer extends Renderer<
  PlasmicSwitch__VariantsArgs,
  PlasmicSwitch__ArgsType,
  PlasmicSwitch__OverridesType,
  'root'
> {
  constructor(
    variants: PlasmicSwitch__VariantsArgs,
    args: PlasmicSwitch__ArgsType
  ) {
    super(variants, args, PlasmicSwitch__RenderFunc, 'root');
  }

  protected create(
    variants: PlasmicSwitch__VariantsArgs,
    args: PlasmicSwitch__ArgsType
  ) {
    return new PlasmicSwitch__Renderer(variants, args);
  }

  getInternalVariantProps(): (keyof PlasmicSwitch__VariantsArgs)[] {
    return PlasmicSwitch__VariantProps;
  }

  getInternalArgProps(): (keyof PlasmicSwitch__ArgsType)[] {
    return PlasmicSwitch__ArgProps;
  }

  forNode(
    name: 'labelContainer'
  ): NodeRenderer<
    PlasmicSwitch__VariantsArgs,
    PlasmicSwitch__ArgsType,
    {
      labelContainer?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'track'
  ): NodeRenderer<
    PlasmicSwitch__VariantsArgs,
    PlasmicSwitch__ArgsType,
    {
      track?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'focusRing'
  ): NodeRenderer<
    PlasmicSwitch__VariantsArgs,
    PlasmicSwitch__ArgsType,
    {
      focusRing?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'thumb'
  ): NodeRenderer<
    PlasmicSwitch__VariantsArgs,
    PlasmicSwitch__ArgsType,
    {
      thumb?: Flex<'div'>;
      focusRing?: Flex<'div'>;
    }
  >;

  forNode(
    name: '_switch'
  ): NodeRenderer<
    PlasmicSwitch__VariantsArgs,
    PlasmicSwitch__ArgsType,
    {
      _switch?: Flex<'div'>;
      thumb?: Flex<'div'>;
      focusRing?: Flex<'div'>;
      track?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'root'
  ): NodeRenderer<
    PlasmicSwitch__VariantsArgs,
    PlasmicSwitch__ArgsType,
    {
      root?: Flex<'div'>;
      _switch?: Flex<'div'>;
      thumb?: Flex<'div'>;
      focusRing?: Flex<'div'>;
      track?: Flex<'div'>;
      labelContainer?: Flex<'div'>;
    }
  >;

  forNode(name: keyof PlasmicSwitch__OverridesType) {
    return super.forNode(name);
  }
}

type PlasmicSwitchRootProps = PlasmicSwitch__VariantsArgs &
  PlasmicSwitch__ArgsType & {
    variants?: PlasmicSwitch__VariantsArgs;
    args?: PlasmicSwitch__ArgsType;
    overrides?: {
      root?: Flex<'div'>;
      _switch?: Flex<'div'>;
      thumb?: Flex<'div'>;
      focusRing?: Flex<'div'>;
      track?: Flex<'div'>;
      labelContainer?: Flex<'div'>;
    };

    root?: Flex<'div'>;
    _switch?: Flex<'div'>;
    thumb?: Flex<'div'>;
    focusRing?: Flex<'div'>;
    track?: Flex<'div'>;
    labelContainer?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSwitch__VariantsArgs
    | keyof PlasmicSwitch__ArgsType
    | 'variants'
    | 'args'
    | 'root'
    | '_switch'
    | 'thumb'
    | 'focusRing'
    | 'track'
    | 'labelContainer'
  >;

export const PlasmicSwitch = function PlasmicSwitchRoot<
  T extends PlasmicSwitchRootProps
>(props: T & StrictProps<T, PlasmicSwitchRootProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'root',
    descendantNames: [
      'root',
      '_switch',
      'thumb',
      'focusRing',
      'track',
      'labelContainer',
    ],

    internalArgPropNames: PlasmicSwitch__ArgProps,
    internalVariantPropNames: PlasmicSwitch__VariantProps,
  });

  return PlasmicSwitch__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'root',
  });
};

type PlasmicSwitch_switchProps = PlasmicSwitch__VariantsArgs &
  PlasmicSwitch__ArgsType & {
    variants?: PlasmicSwitch__VariantsArgs;
    args?: PlasmicSwitch__ArgsType;
    overrides?: {
      _switch?: Flex<'div'>;
      thumb?: Flex<'div'>;
      focusRing?: Flex<'div'>;
      track?: Flex<'div'>;
    };

    _switch?: Flex<'div'>;
    thumb?: Flex<'div'>;
    focusRing?: Flex<'div'>;
    track?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSwitch__VariantsArgs
    | keyof PlasmicSwitch__ArgsType
    | 'variants'
    | 'args'
    | '_switch'
    | 'thumb'
    | 'focusRing'
    | 'track'
  >;

PlasmicSwitch._switch = function PlasmicSwitch_switch<
  T extends PlasmicSwitch_switchProps
>(props: T & StrictProps<T, PlasmicSwitch_switchProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: '_switch',
    descendantNames: ['_switch', 'thumb', 'focusRing', 'track'],
    internalArgPropNames: PlasmicSwitch__ArgProps,
    internalVariantPropNames: PlasmicSwitch__VariantProps,
  });

  return PlasmicSwitch__RenderFunc({
    variants,
    args,
    overrides,
    forNode: '_switch',
  });
};

type PlasmicSwitchThumbProps = PlasmicSwitch__VariantsArgs &
  PlasmicSwitch__ArgsType & {
    variants?: PlasmicSwitch__VariantsArgs;
    args?: PlasmicSwitch__ArgsType;
    overrides?: {
      thumb?: Flex<'div'>;
      focusRing?: Flex<'div'>;
    };

    thumb?: Flex<'div'>;
    focusRing?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSwitch__VariantsArgs
    | keyof PlasmicSwitch__ArgsType
    | 'variants'
    | 'args'
    | 'thumb'
    | 'focusRing'
  >;

PlasmicSwitch.thumb = function PlasmicSwitchThumb<
  T extends PlasmicSwitchThumbProps
>(props: T & StrictProps<T, PlasmicSwitchThumbProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'thumb',
    descendantNames: ['thumb', 'focusRing'],
    internalArgPropNames: PlasmicSwitch__ArgProps,
    internalVariantPropNames: PlasmicSwitch__VariantProps,
  });

  return PlasmicSwitch__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'thumb',
  });
};

type PlasmicSwitchFocusRingProps = PlasmicSwitch__VariantsArgs &
  PlasmicSwitch__ArgsType & {
    variants?: PlasmicSwitch__VariantsArgs;
    args?: PlasmicSwitch__ArgsType;
    overrides?: {
      focusRing?: Flex<'div'>;
    };

    focusRing?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSwitch__VariantsArgs
    | keyof PlasmicSwitch__ArgsType
    | 'variants'
    | 'args'
    | 'focusRing'
  >;

PlasmicSwitch.focusRing = function PlasmicSwitchFocusRing<
  T extends PlasmicSwitchFocusRingProps
>(props: T & StrictProps<T, PlasmicSwitchFocusRingProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'focusRing',
    descendantNames: ['focusRing'],
    internalArgPropNames: PlasmicSwitch__ArgProps,
    internalVariantPropNames: PlasmicSwitch__VariantProps,
  });

  return PlasmicSwitch__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'focusRing',
  });
};

type PlasmicSwitchTrackProps = PlasmicSwitch__VariantsArgs &
  PlasmicSwitch__ArgsType & {
    variants?: PlasmicSwitch__VariantsArgs;
    args?: PlasmicSwitch__ArgsType;
    overrides?: {
      track?: Flex<'div'>;
    };

    track?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSwitch__VariantsArgs
    | keyof PlasmicSwitch__ArgsType
    | 'variants'
    | 'args'
    | 'track'
  >;

PlasmicSwitch.track = function PlasmicSwitchTrack<
  T extends PlasmicSwitchTrackProps
>(props: T & StrictProps<T, PlasmicSwitchTrackProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'track',
    descendantNames: ['track'],
    internalArgPropNames: PlasmicSwitch__ArgProps,
    internalVariantPropNames: PlasmicSwitch__VariantProps,
  });

  return PlasmicSwitch__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'track',
  });
};

type PlasmicSwitchLabelContainerProps = PlasmicSwitch__VariantsArgs &
  PlasmicSwitch__ArgsType & {
    variants?: PlasmicSwitch__VariantsArgs;
    args?: PlasmicSwitch__ArgsType;
    overrides?: {
      labelContainer?: Flex<'div'>;
    };

    labelContainer?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSwitch__VariantsArgs
    | keyof PlasmicSwitch__ArgsType
    | 'variants'
    | 'args'
    | 'labelContainer'
  >;

PlasmicSwitch.labelContainer = function PlasmicSwitchLabelContainer<
  T extends PlasmicSwitchLabelContainerProps
>(props: T & StrictProps<T, PlasmicSwitchLabelContainerProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'labelContainer',
    descendantNames: ['labelContainer'],
    internalArgPropNames: PlasmicSwitch__ArgProps,
    internalVariantPropNames: PlasmicSwitch__VariantProps,
  });

  return PlasmicSwitch__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'labelContainer',
  });
};

PlasmicSwitch.createRenderer = () => new PlasmicSwitch__Renderer({}, {});

export default PlasmicSwitch;
/* prettier-ignore-end */
