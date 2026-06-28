import { createContext, useContext } from "react";

export const DrawingServiceContext = createContext({});
export function useDrawingService() {
  return useContext(DrawingServiceContext);
}
