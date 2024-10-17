import { MutableRefObject, useEffect } from "react";
import { getPerlinNoise } from "../lib/perlinNoise";

interface CanvasProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export const Canvas = ({ canvasRef }: CanvasProps) => {
    const GRID_SIZE = 16;
    const RESOLUTION = 64;
    const CANVAS_WIDTH = 640;
    const pixel_size = CANVAS_WIDTH / RESOLUTION;
    const num_pixels = GRID_SIZE / RESOLUTION;
    const SEED = Math.floor(Math.random() * 90000) + 10000;

    useEffect(() => {
        const current = canvasRef.current;
        const ctx = current!.getContext('2d');
        if (ctx !== null) {
            for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
                for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
                    const v = getPerlinNoise(x, y, SEED);
                    //ctx.fillStyle = 'hsl(' + v + ',50%,50%)';
                    ctx.globalAlpha = Math.max(0, v);
                    /*
                    add colour value here based on value of v e.g 0 = blue, 0.1 = green
                    */
                    ctx.fillStyle = 'black';
                    ctx.fillRect(
                        x / GRID_SIZE * CANVAS_WIDTH,
                        y / GRID_SIZE * CANVAS_WIDTH,
                        pixel_size,
                        pixel_size
                    );
                }
                ctx.globalAlpha = 1;
            }
        }
    }, [canvasRef, num_pixels, pixel_size, SEED]);


    return (
        <canvas style={{ width: '80rem', height: '40rem' }} ref={canvasRef} />
    )
};