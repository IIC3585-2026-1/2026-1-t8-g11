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

  override apply(): void {}
}
