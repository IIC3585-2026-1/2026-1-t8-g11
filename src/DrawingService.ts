import type { Command } from "./commands/Command";
import { DrawLineCommand } from "./commands/DrawLineCommand";
import { DrawRectangleCommand } from "./commands/DrawRectangleCommand";
import { DrawPixelCommand } from "./commands/DrawPixelCommand";
import type { Coord } from "./Coord";
import type { ServerGateway } from "./server/ServerGateway";
import { LineTool } from "./tools/LineTool";
import type { Tool } from "./tools/Tool";

type CommandHandler = (cmd: Command) => void;

export class DrawingService {
  private serverGateway: ServerGateway;
  private currentTool: Tool;
  constructor(serverGateway: ServerGateway) {
    this.serverGateway = serverGateway;
    this.currentTool = new LineTool({
      fillColor: "#000000",
    });
  }

  getCurrentTool() {
    return this.currentTool;
  }

  setCurrentTool(tool: Tool) {
    this.currentTool = tool;
  }

  subscribe(handler: CommandHandler) {
    return this.serverGateway.subscribe((data) => {
      const cmd = this.parseServerMessage(data);
      if (cmd) handler(cmd);
    });
  }

  parseServerMessage(data: any) {
    const msg = JSON.parse(data);
    switch (msg.type) {
      case "DrawLine":
        return DrawLineCommand.fromJSON(msg);
      case "DrawRectangle":
        return DrawRectangleCommand.fromJSON(msg);
      case "DrawPixel":
        return DrawPixelCommand.fromJSON(msg);
      default:
        console.warn("Unknown server message type");
        return;
    }
  }

  inputPointerDown(coord: Coord) {
    const cmd = this.currentTool.inputPointerDown(coord);
    if (cmd) {
      this.serverGateway.sendCommand(cmd);
    }
    return cmd;
  }

  inputPointerMove(startCoord: Coord, currentCoord: Coord) {
    const cmd = this.currentTool.inputPointerMove(startCoord, currentCoord);
    if (cmd) {
      this.serverGateway.sendCommand(cmd);
    }
    return cmd;
  }

  inputDragPreview(startCoord: Coord, currentCoord: Coord) {
    return this.currentTool.inputDragPreview(startCoord, currentCoord);
  }

  inputDragEnd(startCoord: Coord, endCoord: Coord) {
    const cmd = this.currentTool.inputDragEnd(startCoord, endCoord);
    if (cmd) {
      this.serverGateway.sendCommand(cmd);
    }
    return cmd;
  }
}
