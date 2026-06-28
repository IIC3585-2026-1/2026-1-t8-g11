export abstract class Command {
  abstract apply(canvas: HTMLCanvasElement): void;
}
