import type { Command } from "../commands/Command";
import type { ServerGateway, SubscriberCallback } from "./ServerGateway";

export class WebsocketServerGateway implements ServerGateway {
  private socket: WebSocket;
  private subscribers: SubscriberCallback[] = [];
  private queuedCommands: string[] = [];

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.addEventListener("open", () => {
      console.log("Connected to broadcast server");
      this.queuedCommands.forEach((command) => this.socket.send(command));
      this.queuedCommands = [];
    });

    this.socket.addEventListener("close", () => {
      console.error("Connection to server unexpectedly closed");
    });

    this.socket.addEventListener("error", () => {
      console.error("Error on websoket connection");
    });

    this.socket.addEventListener("message", (event: MessageEvent) => {
      console.info("Message received", event.data);
      this.subscribers.forEach((callback) => {
        callback(event.data);
      });
    });
  }

  subscribe(callback: SubscriberCallback): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(
        (subscriber) => subscriber !== callback,
      );
    };
  }

  sendCommand(cmd: Command): void {
    const serializedCommand = JSON.stringify(cmd);
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(serializedCommand);
      return;
    }

    this.queuedCommands.push(serializedCommand);
  }
}
