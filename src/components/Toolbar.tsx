import { useDrawingService } from "@/hooks/useDrawingService";
import { HStack, RadioCard } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StyleConfiguration } from "./StyleConfiguration";
import { LineTool } from "@/tools/LineTool";
import { RectangleTool } from "@/tools/RectangleTool";

export function Toolbar() {
  const service = useDrawingService();
  const tools = ["Line", "Rectangle"];
  const [currentTool, setCurrentTool] = useState(tools[0]);
  const [style, setStyle] = useState(service.getCurrentTool().getStyle());

  useEffect(() => {
    service.getCurrentTool().setStyle(style);
  }, [style]);

  useEffect(() => {
    let tool;
    switch (currentTool) {
      case "Line":
        tool = new LineTool(style);
        break;
      case "Rectangle":
        tool = new RectangleTool(style);
        break;
      default:
        return;
    }

    service.setCurrentTool(tool);
  }, [currentTool]);

  return (
    <HStack>
      <RadioCard.Root
        value={currentTool}
        onValueChange={(e) => setCurrentTool(e.value)}
      >
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
      <StyleConfiguration style={style} onStyleChange={setStyle} />
    </HStack>
  );
}
