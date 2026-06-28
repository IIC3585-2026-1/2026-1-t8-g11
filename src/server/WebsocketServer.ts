import type { Command } from "../commands/Command";
import type { ServerGateway } from "./ServerGateway";

export class WebsocketServerGateway implements ServerGateway {
  private socket: WebSocket;
  // TODO: private subscribers: (() => void)[] = [];

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
      // TODO
    });
  }

  sendCommand(cmd: Command): void {
    console.log(cmd);
    this.socket.send("a");
  }
}
