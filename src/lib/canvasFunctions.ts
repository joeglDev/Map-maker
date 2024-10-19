import { CANVAS_HEIGHT, CANVAS_WIDTH, COLOURS } from "../constants/canvas.constants";
import { getPerlinNoise } from "./perlinNoise";

const getFillStyle = (v: number, oceanHeight: number): string => {
    const modifiedV = v - oceanHeight;
    switch (true) {
        case modifiedV < 0.05:
            return COLOURS.oceanBlue;
        case modifiedV >= 0.05 && modifiedV < 1:
            return COLOURS.oceanLightBlue;
        case modifiedV >= 1 && modifiedV < 1.5:
            return COLOURS.beachYellow;
        case modifiedV >= 1.5 && modifiedV < 2.5:
            return COLOURS.greenPlains;
        case modifiedV >= 2.5 && modifiedV < 3:
            return COLOURS.greenJungle;
        case modifiedV >= 3 && modifiedV < 3.5:
            return COLOURS.brownBadlands;
        case modifiedV >= 3.5 && modifiedV < 4.5:
            return COLOURS.greyMountain;
        case modifiedV >= 4.5:
            return COLOURS.whiteSnow;
        default:
            return COLOURS.whiteSnow;
    }
};

export const drawPoint = (x: number, y: number, ctx: CanvasRenderingContext2D, seed: number, gridSize: number, resolution: number, oceanHeight: number) => {
    const pixel_size = CANVAS_WIDTH / resolution;
    const v = getPerlinNoise(x, y, seed);
    ctx.fillStyle = getFillStyle(v, oceanHeight);
    ctx.fillRect(
        x / gridSize * CANVAS_WIDTH,
        y / gridSize * CANVAS_HEIGHT,
        pixel_size,
        pixel_size
    );
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);