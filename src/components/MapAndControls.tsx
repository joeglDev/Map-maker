import { ChangeEvent, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export const MapAndControls = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [seed, setSeed] = useState(Math.floor(Math.random() * 90000) + 10000);
    const [gridSize, setGridSize] = useState(16);
    const [resolution, setResolution] = useState(8);

    const onNewSeed = () => setSeed(Math.floor(Math.random() * 90000) + 10000);

    const onGridSizeChange = (e: ChangeEvent<HTMLInputElement>) => { setGridSize(parseInt(e.target.value)) };

    const onResolutionChange = (e: ChangeEvent<HTMLInputElement>) => { setResolution(parseInt(e.target.value)) };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ margin: '5rem' }}>
                <div style={{ margin: '0 0 2rem 0' }}>
                    <button onClick={onNewSeed}>Reset seed</button>
                </div>

                <div style={{ margin: '0 0 2rem 0' }}>
                    <label htmlFor='grid-size-slider'>Zoom</label>
                    <div style={{ margin: '0 1rem 0 0' }}>
                        <input type="range" id="grid-size-slider" min="4" max="32" onChange={onGridSizeChange} />
                    </div>
                </div>

                <div style={{ margin: '0 0 2rem 0' }}>
                    <label htmlFor='resolution-slider'>Resolution</label>
                    <div style={{ margin: '0 1rem 0 0' }}>
                        <input type="range" id="resolution-slider" min="4" max="16" onChange={onResolutionChange} />
                    </div>
                </div>
                <Canvas canvasRef={canvasRef} seed={seed} gridSize={gridSize} resolution={resolution} />
            </div>
        </div>
    )
};