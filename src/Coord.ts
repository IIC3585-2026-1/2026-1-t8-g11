export class Coord {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static distance(start: Coord, end: Coord) {
    return ((start.x - end.x) ** 2 + (start.y - end.y) ** 2) ** 0.5;
  }
}
