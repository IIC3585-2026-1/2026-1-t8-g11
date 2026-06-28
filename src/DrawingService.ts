import { DrawLineCommand } from "./commands/DrawLineCommand";
import type { Coord } from "./Coord";
import type { ServerGateway } from "./server/ServerGateway";

export class DrawingService {
  serverGateway: ServerGateway;
  constructor(serverGateway: ServerGateway) {
    this.serverGateway = serverGateway;
  }

  inputDragEnd(startCoord: Coord, endCoord: Coord) {
    const cmd = new DrawLineCommand(startCoord, endCoord);
    this.serverGateway.sendCommand(cmd);
  }
}
