import { createContext, useContext } from "react";
import { DrawingService } from "../DrawingService";
import { WebsocketServerGateway } from "../server/WebsocketServer";

const serverGateway = new WebsocketServerGateway("ws://localhost:8080/");
const drawingService = new DrawingService(serverGateway);

export const DrawingServiceContext = createContext(drawingService);
export function useDrawingService() {
  return useContext(DrawingServiceContext);
}
