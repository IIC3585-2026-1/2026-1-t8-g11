import { parseColor } from "@chakra-ui/react";
import type { Command } from "./commands/Command";
import { DrawLineCommand } from "./commands/DrawLineCommand";
import type { Coord } from "./Coord";
import type { ServerGateway } from "./server/ServerGateway";
import { LineTool } from "./tools/LineTool";
import type { Tool } from "./tools/Tool";
import { DrawRectangleCommand } from "./commands/DrawRectangleCommand";

type CommandHandler = (cmd: Command) => void;

export class DrawingService {
  private serverGateway: ServerGateway;
  private currentTool: Tool;
  constructor(serverGateway: ServerGateway) {
    this.serverGateway = serverGateway;
    this.currentTool = new LineTool({
      fillColor: parseColor("#000000"),
    });
  }

  getCurrentTool() {
    return this.currentTool;
  }

  setCurrentTool(tool: Tool) {
    this.currentTool = tool;
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
      case "DrawRectangle":
        return DrawRectangleCommand.fromJSON(msg);
      default:
        console.warn("Unknown server message type");
        return;
    }
  }

  inputDragEnd(startCoord: Coord, endCoord: Coord) {
    const cmd = this.currentTool.inputDragEnd(startCoord, endCoord);
    if (cmd) {
      this.serverGateway.sendCommand(cmd);
    }
  }
}
