import { ColorPicker, HStack, Portal, type Color } from "@chakra-ui/react";

interface StyleOptions {
  fillColor: Color;
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
    onStyleChange({ ...style, fillColor: color.value });
  };
  return (
    <ColorPicker.Root onValueChangeEnd={fillColorHandler}>
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
