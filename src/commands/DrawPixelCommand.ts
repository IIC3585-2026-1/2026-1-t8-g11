import type { StyleOptions } from "@/components/StyleConfiguration";
import type { Coord } from "../Coord";
import type { Command } from "./Command";

export class DrawPixelCommand implements Command {
  type = "DrawPixel";
  private coord: Coord;
  private style: StyleOptions;

  constructor(coord: Coord, style: StyleOptions) {
    this.coord = coord;
    this.style = { ...style };
  }

  static fromJSON(data: any) {
    return new DrawPixelCommand(data.coord, data.style);
  }

  apply(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d")!;

    ctx.beginPath();
    ctx.rect(this.coord.x, this.coord.y, 1, 1);
    ctx.fillStyle = this.style.fillColor;
    ctx.fill();
  }
}
