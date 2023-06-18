import './StolenIn60Seconds.css';
import {useEffect, useRef} from "react";
import {draw} from "./misc/draw";


function StolenIn60SecondsGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        draw(canvasRef.current)
    },[])
    return (
        <div className="StolenIn60SecondsGame">
            <canvas ref={canvasRef}></canvas>

        </div>
    );
}

export default StolenIn60SecondsGame;
