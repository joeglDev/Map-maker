import { CANVAS_HEIGHT, CANVAS_WIDTH, COLOURS, GRID_SIZE, pixel_size } from "../constants/canvas.constants";
import { getPerlinNoise } from "./perlinNoise";

const getFillStyle = (v: number): string => {
    switch (true) {
        case v < 1:
            return COLOURS.oceanBlue;
        case v < 2:
            return COLOURS.beachYellow;
        case v < 3:
            return COLOURS.greenJungle
        case v < 4:
            return COLOURS.greyMountain
        default:
            return COLOURS.whiteSnow;
    }
};

export const drawPoint = (x: number, y: number, ctx: CanvasRenderingContext2D, seed: number) => {
    const v =  getPerlinNoise(x, y, seed);
    ctx.fillStyle = getFillStyle(v);
    ctx.fillRect(
        x / GRID_SIZE * CANVAS_WIDTH,
        y / GRID_SIZE * CANVAS_HEIGHT,
        pixel_size,
        pixel_size
    );
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);