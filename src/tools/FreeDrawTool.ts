import type { Coord } from "@/Coord";
import { Tool } from "./Tool";
import type { Command } from "@/commands/Command";
import { DrawPixelCommand } from "@/commands/DrawPixelCommand";
import { DrawLineCommand } from "@/commands/DrawLineCommand";
import type { StyleOptions } from "@/components/StyleConfiguration";

export class FreeDrawTool extends Tool {
  constructor(style: StyleOptions) {
    super(style);
  }

  inputPointerDown(coord: Coord): Command | null {
    return new DrawPixelCommand(coord, this.style);
  }

  inputPointerMove(previousCoord: Coord, currentCoord: Coord): Command | null {
    return new DrawLineCommand(previousCoord, currentCoord, this.style);
  }
}
