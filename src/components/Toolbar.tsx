import { useDrawingService } from "@/hooks/useDrawingService";
import { HStack, RadioCard } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StyleConfiguration } from "./StyleConfiguration";
import { LineTool } from "@/tools/LineTool";
import { RectangleTool } from "@/tools/RectangleTool";
import { FreeDrawTool } from "@/tools/FreeDrawTool";

const controlHeight = "44px";
const toolItemWidth = "124px";

export function Toolbar() {
  const service = useDrawingService();
  const tools = ["Line", "Rectangle", "FreeDraw"];
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
      case "FreeDraw":
        tool = new FreeDrawTool(style);
        break;
      default:
        return;
    }

    service.setCurrentTool(tool);
  }, [currentTool]);

  return (
    <HStack alignItems="end" gap={4} flexWrap="wrap" justifyContent="center">
      <RadioCard.Root
        value={currentTool}
        onValueChange={(e) => {
          if (e.value) setCurrentTool(e.value);
        }}
      >
        <RadioCard.Label>Select Tool</RadioCard.Label>
        <HStack gap={2}>
          {tools.map((tool) => {
            return (
              <RadioCard.Item key={tool} value={tool} w={toolItemWidth}>
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl
                  h={controlHeight}
                  px={3}
                  alignItems="center"
                  justifyContent="center"
                >
                  <RadioCard.ItemContent
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="row"
                    gap={2}
                  >
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
