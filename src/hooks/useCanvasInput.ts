import { useEffect, type RefObject } from "react";
import { Coord } from "../Coord";
import { useDrawingService } from "./useDrawingService";

export function useCanvasInput(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const service = useDrawingService();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let startCoord: Coord | null = null;
    let lastCoord: Coord | null = null;
    let previewCoord: Coord | null = null;
    let previewSnapshot: ImageData | null = null;

    const restorePreviewSnapshot = () => {
      if (previewSnapshot) {
        ctx.putImageData(previewSnapshot, 0, 0);
      }
    };

    const drawPreview = () => {
      if (!startCoord || !previewCoord) return;

      const previewCommand = service.inputDragPreview(startCoord, previewCoord);
      if (previewCommand) {
        previewCommand.apply(canvas);
      }
    };

    const unsubscribe = service.subscribe((cmd) => {
      if (previewSnapshot) {
        restorePreviewSnapshot();
        cmd.apply(canvas);
        previewSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        drawPreview();
        return;
      }

      cmd.apply(canvas);
    });

    const extractCoord = (event: PointerEvent) => {
      // TODO: perform transformation to get
      // coordinates in canvas element.
      const x = event.offsetX;
      const y = event.offsetY;
      return new Coord(x, y);
    };

    const handlePointerDown = (event: PointerEvent) => {
      startCoord = extractCoord(event);
      lastCoord = startCoord;
      previewCoord = null;
      previewSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.setPointerCapture(event.pointerId);

      const command = service.inputPointerDown(startCoord);
      if (command) {
        command.apply(canvas);
        previewSnapshot = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!startCoord || !lastCoord) return;

      const currentCoord = extractCoord(event);
      const command = service.inputPointerMove(lastCoord, currentCoord);
      if (command) {
        command.apply(canvas);
        lastCoord = currentCoord;
        return;
      }

      previewCoord = currentCoord;
      lastCoord = currentCoord;
      restorePreviewSnapshot();
      drawPreview();
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!startCoord) return;

      const endCoord = extractCoord(event);
      previewCoord = endCoord;
      restorePreviewSnapshot();
      drawPreview();
      service.inputDragEnd(startCoord, endCoord);

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      startCoord = null;
      lastCoord = null;
      previewCoord = null;
      previewSnapshot = null;
    };

    const handlePointerCancel = (event: PointerEvent) => {
      restorePreviewSnapshot();

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      startCoord = null;
      lastCoord = null;
      previewCoord = null;
      previewSnapshot = null;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
      unsubscribe();
    };
  }, [canvasRef, service]);
}
