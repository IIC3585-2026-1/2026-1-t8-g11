import { useRef } from "react";
import { useCanvasInput } from "../hooks/useCanvasInput";

export default function RasterDisplay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInput = useCanvasInput(canvasRef);

  const width = 400;
  const height = 400;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: "2px solid black" }}
    />
  );
}
