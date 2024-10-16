import { useRef } from "react";
import { Canvas } from "./Canvas";

export const MapAndControls = () => {
    const canvasRef = useRef(null);
    const offScreenRef = useRef(null)

    return (
        <>
        <Canvas canvasRef={canvasRef} offScreenRef={offScreenRef}/>
        </>
    )
};