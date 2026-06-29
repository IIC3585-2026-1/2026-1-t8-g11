import { ColorPicker, HStack, Portal } from "@chakra-ui/react";
import { parseColor } from "@chakra-ui/react";

export interface StyleOptions {
  fillColor: any;
  // lineThickness: any;
  // TODO more?
}

// TODO make eyedropper work
export function StyleConfiguration({
  style,
  onStyleChange,
}: {
  style: StyleOptions;
  onStyleChange: (style: StyleOptions) => void;
}) {
  const fillColorHandler = (color) => {
    onStyleChange({ ...style, fillColor: color.value.toString("rgba") });
  };

  return (
    <ColorPicker.Root onValueChange={fillColorHandler}>
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Fill Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger px="2">
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
