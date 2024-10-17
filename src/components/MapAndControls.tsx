import { useRef, useState } from "react";
import { Canvas } from "./Canvas";

export const MapAndControls = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [seed, setSeed] = useState(Math.floor(Math.random() * 90000) + 10000);

    const onNewSeed = () => setSeed(Math.floor(Math.random() * 90000) + 10000);

    return (
        <>
        <Canvas canvasRef={canvasRef} seed={seed}/>

        <div>
            <button onClick={onNewSeed}>Reset seed</button>
        </div>
        </>
    )
};