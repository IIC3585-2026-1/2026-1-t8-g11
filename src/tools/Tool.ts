import type { StyleOptions } from "@/components/StyleConfiguration.tsx";
import type { Coord } from "../Coord.ts";
import type { Command } from "../commands/Command.ts";

export abstract class Tool {
  protected style: StyleOptions;
  constructor(style: StyleOptions) {
    this.style = style;
  }

  getStyle() {
    return this.style;
  }

  setStyle(style: StyleOptions) {
    this.style = style;
  }

  inputDragEnd(_startCoord: Coord, _endCoord: Coord): Command | null {
    return null;
  }
}
