import { MutableRefObject, useEffect } from "react";
import { clearCanvas, drawPoint } from "../lib/canvasFunctions";
import { GRID_SIZE, RESOLUTION } from "../constants/canvas.constants";

interface CanvasProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    seed: number;
}

export const Canvas = ({ canvasRef, seed }: CanvasProps) => {
    const num_pixels = GRID_SIZE / RESOLUTION;

    useEffect(() => {
        const ctx = canvasRef.current!.getContext('2d');

        if (ctx !== null) {
            clearCanvas(ctx)

            for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
                for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
                    drawPoint(x, y, ctx, seed)
                }
            }
        }
    }, [canvasRef, num_pixels, seed]);


    return (
        <canvas style={{ width: '80rem', height: '40rem' }} ref={canvasRef} />
    )
};