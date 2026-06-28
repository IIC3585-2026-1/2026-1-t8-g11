import type { Command } from "../commands/Command";

export interface ServerGateway {
  sendCommand(cmd: Command): void;
}
