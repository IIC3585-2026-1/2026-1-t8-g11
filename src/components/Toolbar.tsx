import { DrawLineCommand } from "@/commands/DrawLineCommand";
import { useDrawingService } from "@/hooks/useDrawingService";
import { HStack, RadioCard } from "@chakra-ui/react";
import { useState } from "react";
import { StyleConfiguration } from "./StyleConfiguration";

export function Toolbar() {
  const service = useDrawingService();
  const [currentTool, setCurrentTool] = useState(service.getCurrentTool());
  const tools = ["Line", "Rectangle"];

  const toolSelectHandler = (toolName) => {
    switch (toolName) {
      case "Line":
        break;
      case "Rectangle":
        break;
    }
  };

  return (
    <HStack>
      <RadioCard.Root onValueChange={(e) => console.log(e)}>
        <RadioCard.Label>Select Tool</RadioCard.Label>
        <HStack>
          {tools.map((tool) => {
            return (
              <RadioCard.Item key={tool} value={tool}>
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>{tool}</RadioCard.ItemText>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemContent>
                </RadioCard.ItemControl>
              </RadioCard.Item>
            );
          })}
        </HStack>
      </RadioCard.Root>
      <StyleConfiguration onStyleChange={(style) => console.log(style)} />
    </HStack>
  );
}
