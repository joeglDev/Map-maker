import { MutableRefObject, useEffect } from "react";
import { clearCanvas, drawPoint } from "../lib/canvasFunctions";

interface CanvasProps {
    gridSize: number;
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    oceanHeight: number;
    resolution: number;
    seed: number;
}

export const Canvas = ({ canvasRef, seed, gridSize, oceanHeight, resolution }: CanvasProps) => {
    const num_pixels = gridSize / resolution;

    useEffect(() => {
        const ctx = canvasRef.current!.getContext('2d');

        if (ctx !== null) {
            clearCanvas(ctx)

            for (let y = 0; y < gridSize; y += num_pixels / gridSize) {
                for (let x = 0; x < gridSize; x += num_pixels / gridSize) {
                    drawPoint(x, y, ctx, seed, gridSize, resolution, oceanHeight)
                }
            }
        }
    }, [canvasRef, num_pixels, seed, gridSize, resolution, oceanHeight]);


    return (
        <canvas style={{ width: '80rem', height: '40rem', margin: '5rem' }} ref={canvasRef} />
    )
};