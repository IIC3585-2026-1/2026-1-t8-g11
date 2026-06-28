import type { Command } from "../commands/Command";
import type { ServerGateway, SubscriberCallback } from "./ServerGateway";

export class WebsocketServerGateway implements ServerGateway {
  private socket: WebSocket;
  private subscribers: SubscriberCallback[] = [];

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.addEventListener("open", () => {
      console.log("Connected to broadcast server");
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

  subscribe(callback: SubscriberCallback): void {
    this.subscribers.push(callback);
  }

  sendCommand(cmd: Command): void {
    this.socket.send(JSON.stringify(cmd));
  }
}
