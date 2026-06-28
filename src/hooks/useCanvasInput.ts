import { useEffect, type RefObject } from "react";
import { Coord } from "../Coord";
import { useDrawingService } from "./useDrawingService";

export function useCanvasInput(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const service = useDrawingService();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    service.subscribe((cmd) => cmd.apply(canvas));

    const extractCoord = (event: PointerEvent) => {
      // TODO: perform transformation to get
      // coordinates in canvas element.
      return new Coord(event.clientX, event.clientY);
    };

    let startCoord: Coord | null = null;
    let dragging = false;
    const handlePointerDown = (event: PointerEvent) => {
      startCoord = extractCoord(event);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const currentCoord = extractCoord(event);
      if (startCoord && Coord.distance(startCoord, currentCoord) >= 3) {
        dragging = true;
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const endCoord = extractCoord(event);
      console.log(dragging, startCoord, endCoord);
      if (startCoord && dragging) {
        service.inputDragEnd(startCoord, endCoord);
      }

      startCoord = null;
      dragging = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
    };
  }, [canvasRef, service]);
}
