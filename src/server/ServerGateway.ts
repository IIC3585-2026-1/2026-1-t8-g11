import type { Command } from "../commands/Command";

export type SubscriberCallback = (cmd: Command) => void;
export interface ServerGateway {
  subscribe(callback: SubscriberCallback): void;
  sendCommand(cmd: Command): void;
}
