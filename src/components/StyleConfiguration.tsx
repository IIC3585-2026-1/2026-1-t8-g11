import { ColorPicker, HStack, Portal } from "@chakra-ui/react";
import type { ComponentProps } from "react";

export interface StyleOptions {
  fillColor: string;
  // lineThickness: any;
  // TODO more?
}

const controlHeight = "44px";

// TODO make eyedropper work
export function StyleConfiguration({
  style,
  onStyleChange,
}: {
  style: StyleOptions;
  onStyleChange: (style: StyleOptions) => void;
}) {
  const fillColorHandler: NonNullable<
    ComponentProps<typeof ColorPicker.Root>["onValueChange"]
  > = (color) => {
    onStyleChange({ ...style, fillColor: color.value.toString("rgba") });
  };

  return (
    <ColorPicker.Root onValueChange={fillColorHandler}>
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Fill Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger h={controlHeight} px="3">
          <ColorPicker.ValueSwatch boxSize="6" />
          <ColorPicker.ValueText minW="160px" />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="sm" variant="outline" />
              <ColorPicker.Sliders />
              <ColorPicker.ValueSwatch />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  );
}
