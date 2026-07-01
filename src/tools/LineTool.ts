import type { Coord } from "@/Coord";
import { Tool } from "./Tool";
import type { Command } from "@/commands/Command";
import { DrawLineCommand } from "@/commands/DrawLineCommand";
import type { StyleOptions } from "@/components/StyleConfiguration";

export class LineTool extends Tool {
  constructor(style: StyleOptions) {
    super(style);
  }

  inputDragPreview(startCoord: Coord, currentCoord: Coord): Command | null {
    return this.createCommand(startCoord, currentCoord);
  }

  inputDragEnd(startCoord: Coord, endCoord: Coord): Command | null {
    return this.createCommand(startCoord, endCoord);
  }

  private createCommand(startCoord: Coord, endCoord: Coord): Command {
    return new DrawLineCommand(startCoord, endCoord, this.style);
  }
}
