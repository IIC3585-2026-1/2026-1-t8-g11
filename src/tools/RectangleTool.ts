import { Coord } from "@/Coord";
import { Tool } from "./Tool";
import type { Command } from "@/commands/Command";
import { DrawRectangleCommand } from "@/commands/DrawRectangleCommand";
import type { StyleOptions } from "@/components/StyleConfiguration";

export class RectangleTool extends Tool {
  constructor(style: StyleOptions) {
    super(style);
  }

  inputDragEnd(startCoord: Coord, endCoord: Coord): Command | null {
    const x = Math.min(startCoord.x, endCoord.x);
    const y = Math.min(startCoord.y, endCoord.y);
    const coord = new Coord(x, y);

    const width = Math.abs(startCoord.x - endCoord.x);
    const height = Math.abs(startCoord.y - endCoord.y);

    return new DrawRectangleCommand(coord, width, height, this.style);
  }
}
