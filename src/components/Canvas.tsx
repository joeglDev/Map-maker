import { MutableRefObject, useEffect } from "react";
import { getPerlinNoise } from "../lib/perlinNoise";
import { generatePerlinNoise } from "../lib/perlinNoiseV2";

interface CanvasProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export const Canvas = ({ canvasRef }: CanvasProps) => {
    const GRID_SIZE = 16;
    const RESOLUTION = 64;
    const CANVAS_WIDTH = 640;
    const pixel_size = CANVAS_WIDTH / RESOLUTION;
    const num_pixels = GRID_SIZE / RESOLUTION;

    useEffect(() => {
        const current = canvasRef.current;
        const ctx = current!.getContext('2d');
        if (ctx !== null) {
            for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
                for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
                    const v = getPerlinNoise(x, y);
                    const alpha = Math.max(0, v);
                    console.log(v, alpha)
                    //ctx.fillStyle = 'hsl(' + v + ',50%,50%)';
                    ctx.globalAlpha = alpha;
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
    }, [canvasRef, num_pixels, pixel_size]);


    return (
        <canvas style={{ width: '80rem', height: '40rem' }} ref={canvasRef} />
    )
};