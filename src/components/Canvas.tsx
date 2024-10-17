import { MutableRefObject, useEffect } from "react";
import { getPerlinNoise } from "../lib/perlinNoise";

interface CanvasProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    seed: number;
}

export const Canvas = ({ canvasRef, seed }: CanvasProps) => {
    const GRID_SIZE = 16;
    const RESOLUTION = 64;
    const CANVAS_WIDTH = 640;
    const CANVAS_HEIGHT = 320;
    const pixel_size = CANVAS_WIDTH / RESOLUTION;
    const num_pixels = GRID_SIZE / RESOLUTION;

    useEffect(() => {
        const current = canvasRef.current;
        const ctx = current!.getContext('2d');

        if (ctx !== null) {
            // clear for each redraw
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
                for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
                    const v = getPerlinNoise(x, y, seed);
                    //ctx.fillStyle = 'hsl(' + v + ',50%,50%)';
                    ctx.globalAlpha = Math.max(0, v);
                    /*
                    add colour value here based on value of v e.g 0 = blue, 0.1 = green
                    */
                    ctx.fillStyle = 'black';
                    ctx.fillRect(
                        x / GRID_SIZE * CANVAS_WIDTH,
                        y / GRID_SIZE * CANVAS_HEIGHT,
                        pixel_size,
                        pixel_size
                    );
                }
                ctx.globalAlpha = 1;
            }
        }
    }, [canvasRef, num_pixels, pixel_size, seed]);


    return (
        <canvas style={{ width: '80rem', height: '40rem' }} ref={canvasRef} />
    )
};