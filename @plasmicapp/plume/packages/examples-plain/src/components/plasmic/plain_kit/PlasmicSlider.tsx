/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsx createPlasmicElementProxy */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: wtmthg1Ku3JDsEq1LhL9ox
// Component: AJ2JM8R_qB
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
import SliderThumb from '../../SliderThumb'; // plasmic-import: zv45Jzqo2A/component

import '@plasmicapp/react-web/lib/plasmic.css';
import '../plasmic__default_style.css'; // plasmic-import: global/defaultcss
import './plasmic_plain_kit.css'; // plasmic-import: wtmthg1Ku3JDsEq1LhL9ox/projectcss
import './PlasmicSlider.css'; // plasmic-import: AJ2JM8R_qB/css

export type PlasmicSlider__VariantsArgs = {
  hasLabel?: SingleBooleanChoiceArg<'hasLabel'>;
};

export const PlasmicSlider__VariantProps = new Array<
  keyof PlasmicSlider__VariantsArgs
>('hasLabel');

export type PlasmicSlider__ArgsType = {
  label?: React.ReactNode;
};

export const PlasmicSlider__ArgProps = new Array<keyof PlasmicSlider__ArgsType>(
  'label'
);

export type PlasmicSlider__OverridesType = {
  root?: Flex<'div'>;
  labelContainer?: Flex<'div'>;
  sliderContainer?: Flex<'div'>;
  track?: Flex<'div'>;
  rail?: Flex<'div'>;
  filledTrack?: Flex<'div'>;
  thumbContainer?: Flex<'div'>;
  thumbTemplate?: Flex<typeof SliderThumb>;
};

export interface DefaultSliderProps {
  label?: React.ReactNode;
  hasLabel?: SingleBooleanChoiceArg<'hasLabel'>;
  className?: string;
}

function PlasmicSlider__RenderFunc(props: {
  variants: PlasmicSlider__VariantsArgs;
  args: PlasmicSlider__ArgsType;
  overrides: PlasmicSlider__OverridesType;
  forNode?: string;
}) {
  const { variants, args, overrides, forNode } = props;

  return (
    <div
      data-plasmic-name={'root'}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames({
        Slider__root__6N5sp: true,
        'plasmic-default__all': true,
        'plasmic-default__div': true,
      })}
    >
      {(hasVariant(variants, 'hasLabel', 'hasLabel') ? true : false) ? (
        <div
          data-plasmic-name={'labelContainer'}
          data-plasmic-override={overrides.labelContainer}
          className={classNames({
            'Slider__labelContainer--hasLabel__Uf1Fjb0kel': hasVariant(
              variants,
              'hasLabel',
              'hasLabel'
            ),

            Slider__labelContainer__Uf1Fj: true,
            'plasmic-default__all': true,
            'plasmic-default__div': true,
          })}
        >
          <PlasmicSlot
            defaultContents={'Enter some text'}
            value={args.label}
            className={classNames({ Slider__slotLabel__80kIL: true })}
          />
        </div>
      ) : null}

      <div
        data-plasmic-name={'sliderContainer'}
        data-plasmic-override={overrides.sliderContainer}
        className={classNames({
          Slider__sliderContainer__CAmFF: true,
          'plasmic-default__all': true,
          'plasmic-default__div': true,
        })}
      >
        <div
          data-plasmic-name={'track'}
          data-plasmic-override={overrides.track}
          className={classNames({
            Slider__track__qPTVc: true,
            'plasmic-default__all': true,
            'plasmic-default__div': true,
          })}
        >
          <div
            data-plasmic-name={'rail'}
            data-plasmic-override={overrides.rail}
            className={classNames({
              Slider__rail__VRDgK: true,
              'plasmic-default__all': true,
              'plasmic-default__div': true,
            })}
          ></div>

          <div
            data-plasmic-name={'filledTrack'}
            data-plasmic-override={overrides.filledTrack}
            className={classNames({
              'Slider__filledTrack__0-5Hf': true,
              'plasmic-default__all': true,
              'plasmic-default__div': true,
            })}
          ></div>
        </div>

        <div
          data-plasmic-name={'thumbContainer'}
          data-plasmic-override={overrides.thumbContainer}
          className={classNames({
            Slider__thumbContainer__5hRNG: true,
            'plasmic-default__all': true,
            'plasmic-default__div': true,
          })}
        >
          <SliderThumb
            data-plasmic-name={'thumbTemplate'}
            data-plasmic-override={overrides.thumbTemplate}
            className={classNames({
              Slider__thumbTemplate__saA5p: true,
              __wab_instance: true,
            })}
            {...({} as any)}
          ></SliderThumb>
        </div>
      </div>
    </div>
  ) as React.ReactElement | null;
}

class PlasmicSlider__Renderer extends Renderer<
  PlasmicSlider__VariantsArgs,
  PlasmicSlider__ArgsType,
  PlasmicSlider__OverridesType,
  'root'
> {
  constructor(
    variants: PlasmicSlider__VariantsArgs,
    args: PlasmicSlider__ArgsType
  ) {
    super(variants, args, PlasmicSlider__RenderFunc, 'root');
  }

  protected create(
    variants: PlasmicSlider__VariantsArgs,
    args: PlasmicSlider__ArgsType
  ) {
    return new PlasmicSlider__Renderer(variants, args);
  }

  getInternalVariantProps(): (keyof PlasmicSlider__VariantsArgs)[] {
    return PlasmicSlider__VariantProps;
  }

  getInternalArgProps(): (keyof PlasmicSlider__ArgsType)[] {
    return PlasmicSlider__ArgProps;
  }

  forNode(
    name: 'thumbTemplate'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      thumbTemplate?: Flex<typeof SliderThumb>;
    }
  >;

  forNode(
    name: 'thumbContainer'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      thumbContainer?: Flex<'div'>;
      thumbTemplate?: Flex<typeof SliderThumb>;
    }
  >;

  forNode(
    name: 'filledTrack'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      filledTrack?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'rail'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      rail?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'track'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      track?: Flex<'div'>;
      rail?: Flex<'div'>;
      filledTrack?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'sliderContainer'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      sliderContainer?: Flex<'div'>;
      track?: Flex<'div'>;
      rail?: Flex<'div'>;
      filledTrack?: Flex<'div'>;
      thumbContainer?: Flex<'div'>;
      thumbTemplate?: Flex<typeof SliderThumb>;
    }
  >;

  forNode(
    name: 'labelContainer'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      labelContainer?: Flex<'div'>;
    }
  >;

  forNode(
    name: 'root'
  ): NodeRenderer<
    PlasmicSlider__VariantsArgs,
    PlasmicSlider__ArgsType,
    {
      root?: Flex<'div'>;
      labelContainer?: Flex<'div'>;
      sliderContainer?: Flex<'div'>;
      track?: Flex<'div'>;
      rail?: Flex<'div'>;
      filledTrack?: Flex<'div'>;
      thumbContainer?: Flex<'div'>;
      thumbTemplate?: Flex<typeof SliderThumb>;
    }
  >;

  forNode(name: keyof PlasmicSlider__OverridesType) {
    return super.forNode(name);
  }
}

type PlasmicSliderRootProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      root?: Flex<'div'>;
      labelContainer?: Flex<'div'>;
      sliderContainer?: Flex<'div'>;
      track?: Flex<'div'>;
      rail?: Flex<'div'>;
      filledTrack?: Flex<'div'>;
      thumbContainer?: Flex<'div'>;
      thumbTemplate?: Flex<typeof SliderThumb>;
    };

    root?: Flex<'div'>;
    labelContainer?: Flex<'div'>;
    sliderContainer?: Flex<'div'>;
    track?: Flex<'div'>;
    rail?: Flex<'div'>;
    filledTrack?: Flex<'div'>;
    thumbContainer?: Flex<'div'>;
    thumbTemplate?: Flex<typeof SliderThumb>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'root'
    | 'labelContainer'
    | 'sliderContainer'
    | 'track'
    | 'rail'
    | 'filledTrack'
    | 'thumbContainer'
    | 'thumbTemplate'
  >;

export const PlasmicSlider = function PlasmicSliderRoot<
  T extends PlasmicSliderRootProps
>(props: T & StrictProps<T, PlasmicSliderRootProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'root',
    descendantNames: [
      'root',
      'labelContainer',
      'sliderContainer',
      'track',
      'rail',
      'filledTrack',
      'thumbContainer',
      'thumbTemplate',
    ],

    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'root',
  });
};

type PlasmicSliderLabelContainerProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      labelContainer?: Flex<'div'>;
    };

    labelContainer?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'labelContainer'
  >;

PlasmicSlider.labelContainer = function PlasmicSliderLabelContainer<
  T extends PlasmicSliderLabelContainerProps
>(props: T & StrictProps<T, PlasmicSliderLabelContainerProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'labelContainer',
    descendantNames: ['labelContainer'],
    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'labelContainer',
  });
};

type PlasmicSliderSliderContainerProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      sliderContainer?: Flex<'div'>;
      track?: Flex<'div'>;
      rail?: Flex<'div'>;
      filledTrack?: Flex<'div'>;
      thumbContainer?: Flex<'div'>;
      thumbTemplate?: Flex<typeof SliderThumb>;
    };

    sliderContainer?: Flex<'div'>;
    track?: Flex<'div'>;
    rail?: Flex<'div'>;
    filledTrack?: Flex<'div'>;
    thumbContainer?: Flex<'div'>;
    thumbTemplate?: Flex<typeof SliderThumb>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'sliderContainer'
    | 'track'
    | 'rail'
    | 'filledTrack'
    | 'thumbContainer'
    | 'thumbTemplate'
  >;

PlasmicSlider.sliderContainer = function PlasmicSliderSliderContainer<
  T extends PlasmicSliderSliderContainerProps
>(props: T & StrictProps<T, PlasmicSliderSliderContainerProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'sliderContainer',
    descendantNames: [
      'sliderContainer',
      'track',
      'rail',
      'filledTrack',
      'thumbContainer',
      'thumbTemplate',
    ],

    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'sliderContainer',
  });
};

type PlasmicSliderTrackProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      track?: Flex<'div'>;
      rail?: Flex<'div'>;
      filledTrack?: Flex<'div'>;
    };

    track?: Flex<'div'>;
    rail?: Flex<'div'>;
    filledTrack?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'track'
    | 'rail'
    | 'filledTrack'
  >;

PlasmicSlider.track = function PlasmicSliderTrack<
  T extends PlasmicSliderTrackProps
>(props: T & StrictProps<T, PlasmicSliderTrackProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'track',
    descendantNames: ['track', 'rail', 'filledTrack'],
    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'track',
  });
};

type PlasmicSliderRailProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      rail?: Flex<'div'>;
    };

    rail?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'rail'
  >;

PlasmicSlider.rail = function PlasmicSliderRail<
  T extends PlasmicSliderRailProps
>(props: T & StrictProps<T, PlasmicSliderRailProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'rail',
    descendantNames: ['rail'],
    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'rail',
  });
};

type PlasmicSliderFilledTrackProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      filledTrack?: Flex<'div'>;
    };

    filledTrack?: Flex<'div'>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'filledTrack'
  >;

PlasmicSlider.filledTrack = function PlasmicSliderFilledTrack<
  T extends PlasmicSliderFilledTrackProps
>(props: T & StrictProps<T, PlasmicSliderFilledTrackProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'filledTrack',
    descendantNames: ['filledTrack'],
    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'filledTrack',
  });
};

type PlasmicSliderThumbContainerProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      thumbContainer?: Flex<'div'>;
      thumbTemplate?: Flex<typeof SliderThumb>;
    };

    thumbContainer?: Flex<'div'>;
    thumbTemplate?: Flex<typeof SliderThumb>;
  } & Omit<
    Partial<React.ComponentProps<'div'>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'thumbContainer'
    | 'thumbTemplate'
  >;

PlasmicSlider.thumbContainer = function PlasmicSliderThumbContainer<
  T extends PlasmicSliderThumbContainerProps
>(props: T & StrictProps<T, PlasmicSliderThumbContainerProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'thumbContainer',
    descendantNames: ['thumbContainer', 'thumbTemplate'],
    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'thumbContainer',
  });
};

type PlasmicSliderThumbTemplateProps = PlasmicSlider__VariantsArgs &
  PlasmicSlider__ArgsType & {
    variants?: PlasmicSlider__VariantsArgs;
    args?: PlasmicSlider__ArgsType;
    overrides?: {
      thumbTemplate?: Flex<typeof SliderThumb>;
    };

    thumbTemplate?: Flex<typeof SliderThumb>;
  } & Omit<
    Partial<React.ComponentProps<typeof SliderThumb>>,
    | keyof PlasmicSlider__VariantsArgs
    | keyof PlasmicSlider__ArgsType
    | 'variants'
    | 'args'
    | 'thumbTemplate'
  >;

PlasmicSlider.thumbTemplate = function PlasmicSliderThumbTemplate<
  T extends PlasmicSliderThumbTemplateProps
>(props: T & StrictProps<T, PlasmicSliderThumbTemplateProps>) {
  const { variants, args, overrides } = deriveRenderOpts(props, {
    name: 'thumbTemplate',
    descendantNames: ['thumbTemplate'],
    internalArgPropNames: PlasmicSlider__ArgProps,
    internalVariantPropNames: PlasmicSlider__VariantProps,
  });

  return PlasmicSlider__RenderFunc({
    variants,
    args,
    overrides,
    forNode: 'thumbTemplate',
  });
};

PlasmicSlider.createRenderer = () => new PlasmicSlider__Renderer({}, {});

export default PlasmicSlider;
/* prettier-ignore-end */
