import './StolenIn60Seconds.css';
import {useContext, useEffect, useRef} from "react";
import {draw} from "./misc/draw";
import {StateContext} from "../misc/StateProvider";
import BottomPanel from "./BottomPanel";

function StolenIn60SecondsGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasContainerRef = useRef<HTMLDivElement>(null)

    const {optionsClicked, setShowNav} = useContext(StateContext);

    useEffect(() => {
        draw(canvasRef.current, canvasContainerRef.current)
    }, [])
    return (
        <div ref={canvasContainerRef} className="StolenIn60SecondsGame">
            <canvas ref={canvasRef}></canvas>
            <BottomPanel/>
        </div>
    );
}

export default StolenIn60SecondsGame;
