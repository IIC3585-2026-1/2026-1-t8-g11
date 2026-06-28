import type { Command } from "./commands/Command";
import { DrawLineCommand } from "./commands/DrawLineCommand";
import type { Coord } from "./Coord";
import type { ServerGateway } from "./server/ServerGateway";

type CommandHandler = (cmd: Command) => void;

export class DrawingService {
  serverGateway: ServerGateway;
  constructor(serverGateway: ServerGateway) {
    this.serverGateway = serverGateway;
  }

  subscribe(handler: CommandHandler) {
    this.serverGateway.subscribe((data) => {
      const cmd = this.parseServerMessage(data);
      if (cmd) handler(cmd);
    });
  }

  parseServerMessage(data: any) {
    const msg = JSON.parse(data);
    switch (msg.type) {
      case "DrawLine":
        return DrawLineCommand.fromJSON(msg);
      default:
        console.warn("Unknown server message type");
        return;
    }
  }

  inputDragEnd(startCoord: Coord, endCoord: Coord) {
    const cmd = new DrawLineCommand(startCoord, endCoord);
    this.serverGateway.sendCommand(cmd);
  }
}
