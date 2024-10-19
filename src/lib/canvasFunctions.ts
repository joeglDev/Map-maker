import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_SIZE, pixel_size } from "../constants/canvas.constants";
import { getPerlinNoise } from "./perlinNoise";

export const drawPoint = (x: number, y: number, ctx: CanvasRenderingContext2D, seed: number) => {
    const v = getPerlinNoise(x, y, seed);
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
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);