import { useRef } from "react";
import { useCanvasInput } from "../hooks/useCanvasInput";

export default function RasterDisplay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useCanvasInput(canvasRef);

  const width = 500;
  const height = 500;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ backgroundColor: "#fff", border: "2px solid black" }}
    />
  );
}
