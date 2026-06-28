import type { Coord } from "../Coord";
import { Command } from "./Command";

export class DrawLineCommand extends Command {
  type = "DrawLine";
  private startCoord: Coord;
  private endCoord: Coord;

  constructor(startCoord: Coord, endCoord: Coord) {
    super();
    this.startCoord = startCoord;
    this.endCoord = endCoord;
  }

  static fromJSON(data: any) {
    return new DrawLineCommand(data.startCoord, data.endCoord);
  }

  override apply(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d")!;
    console.log(ctx);
    ctx.moveTo(this.startCoord.x, this.startCoord.y);
    ctx.lineTo(this.endCoord.x, this.endCoord.y);
    ctx.stroke();
  }
}
