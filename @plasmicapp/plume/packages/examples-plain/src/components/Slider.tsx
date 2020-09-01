import * as React from "react";
import {
  PlasmicSlider,
} from "./plasmic/plain_kit/PlasmicSlider";
import {PlumeSliderProps, useSlider, PlumeSliderRef} from "@plasmicapp/plume";

interface SliderProps extends PlumeSliderProps {
  isRange?: boolean;
}

const Slider = React.forwardRef(function Slider(props: SliderProps, ref: PlumeSliderRef) {
  const {plumeProps, state} = useSlider(
    PlasmicSlider,
    {
      ...props,
      ...props.isRange && !props.getThumbAriaLabel ? {
        getThumbAriaLabel: (index) => index === 0 ? "Min" : "Max"
      } : {}
    },
    {
      hasLabelVariant: ["hasLabel", "hasLabel"],
      root: "root",
      track: "track",
      thumbContainer: "thumbContainer",
      thumbTemplate: "thumbTemplate",
      label: "labelContainer"
    },
    ref
  );

  return (
    <PlasmicSlider
      {...plumeProps}
      filledTrack={{
        style: props.isRange && state.values.length === 2 ? {
          left: `${state.getThumbPercent(0) * 100}%`,
          width: `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
        } : state.values.length === 1 ? {
          left: 0,
          width: `${state.getThumbPercent(0) * 100}%`,
        } : {
          display: "none"
        }
      }}
  />);
});

export default Slider;
