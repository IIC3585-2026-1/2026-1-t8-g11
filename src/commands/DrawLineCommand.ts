import type { StyleOptions } from "@/components/StyleConfiguration";
import type { Coord } from "../Coord";
import type { Command } from "./Command";

export class DrawLineCommand implements Command {
  type = "DrawLine";
  private startCoord: Coord;
  private endCoord: Coord;
  private style: StyleOptions;

  constructor(startCoord: Coord, endCoord: Coord, style: StyleOptions) {
    this.startCoord = startCoord;
    this.endCoord = endCoord;
    this.style = style;
  }

  static fromJSON(data: any) {
    return new DrawLineCommand(data.startCoord, data.endCoord, data.style);
  }

  apply(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d")!;

    ctx.beginPath();
    ctx.moveTo(this.startCoord.x, this.startCoord.y);
    ctx.lineTo(this.endCoord.x, this.endCoord.y);
    ctx.strokeStyle = this.style.fillColor;
    ctx.stroke();
  }
}
