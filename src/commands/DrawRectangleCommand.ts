import type { StyleOptions } from "@/components/StyleConfiguration";
import type { Coord } from "../Coord";
import type { Command } from "./Command";

export class DrawRectangleCommand implements Command {
  type = "DrawRectangle";
  private coord: Coord;
  private width: number;
  private height: number;
  private style: StyleOptions;

  constructor(
    coord: Coord,
    width: number,
    height: number,
    style: StyleOptions,
  ) {
    this.coord = coord;
    this.width = width;
    this.height = height;
    this.style = style;
  }

  static fromJSON(data: any) {
    return new DrawRectangleCommand(
      data.coord,
      data.width,
      data.height,
      data.style,
    );
  }

  apply(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d")!;

    ctx.beginPath();
    ctx.rect(this.coord.x, this.coord.y, this.width, this.height);
    ctx.fillStyle = this.style.fillColor;
    ctx.fill();
  }
}
