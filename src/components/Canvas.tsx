import { MutableRefObject, useEffect } from "react";

interface CanvasProps {
    canvasRef: MutableRefObject<null>;
    offScreenRef: MutableRefObject<null>;
}

export const Canvas = ({ canvasRef, offScreenRef }: CanvasProps) => {
    /*
    const GRID_SIZE = 4;
    const RESOLUTION = 128;
    const COLOR_SCALE = 250;
    const pixel_size = CANVAS_WIDTH / RESOLUTION;
    const num_pixels = GRID_SIZE / RESOLUTION;
    */
    const CANVAS_WIDTH = 640;
    const CANVAS_HEIGHT = 1280;



 

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const offScreenCtx = offScreenRef.current.getContext('2d');
        console.log('hi')
        console.log(ctx, offScreenCtx)

        const saved_alpha = ctx!.globalAlpha

        // Fill the offscreen buffer with random noise. 
        offScreenCtx!.width = CANVAS_WIDTH;
        offScreenCtx!.height = CANVAS_HEIGHT;

        const offscreen_id = offScreenCtx.getImageData(0, 0,
            offScreenCtx!.width,
            offScreenCtx!.height),
            offscreen_pixels = offscreen_id.data

        for (let i = 0; i < offscreen_pixels.length; i += 4) {
            offscreen_pixels[i] =
                offscreen_pixels[i + 1] =
                offscreen_pixels[i + 2] = Math.floor(Math.random() * 255)
            offscreen_pixels[i + 3] = 255
        }

        offScreenCtx!.putImageData(offscreen_id, 0, 0)

        // Scale random iterations onto the canvas to generate Perlin noise. 
        for (let size = 4; size <= offScreenCtx!.width; size *= 2) {
            const x = Math.floor(Math.random() * (offScreenCtx!.width - size)),
                y = Math.floor(Math.random() * (offScreenCtx!.height - size))

            ctx!.globalAlpha = 4 / size
            ctx!.drawImage(offScreenRef.current, x, y, size, size,
                0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        }

        ctx!.globalAlpha = saved_alpha

    }, [canvasRef, offScreenRef]);


    return (
        <>
            <canvas style={{ width: '80rem', height: '40rem' }} ref={canvasRef} />
            <canvas style={{ width: '80rem', height: '40rem', display: 'none' }} ref={offScreenRef} />
        </>
    )
};