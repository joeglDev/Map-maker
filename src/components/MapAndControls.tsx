import { useRef } from "react";
import { Canvas } from "./Canvas";

export const MapAndControls = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    return (
        <>
        <Canvas canvasRef={canvasRef}/>
        </>
    )
};