import './StolenIn60Seconds.css';
import {useContext, useEffect, useRef} from "react";
import {draw} from "./misc/draw";
import {StateContext} from "../misc/StateProvider";
import {globalKeyboardEvent} from "./misc/util";
import {Direction} from "./misc/types";

function Controls() {
    return <div style={{position: 'absolute', bottom: 0, width: '100vw', background: 'white', zIndex: 10}}>

        <div style={{display: 'flex', justifyContent:'space-evenly'}}>
            <div onClick={() => globalKeyboardEvent.emit(Direction.up)} className={'button'}><i className="fa fa-arrow-up"></i>
            </div>
            <div onClick={() => globalKeyboardEvent.emit(Direction.down)} className={'button'}><i
                className="fa fa-arrow-down"></i></div>
        </div>


        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div onClick={() => globalKeyboardEvent.emit(Direction.left)} className={'button'}><i className="fa fa-arrow-left"></i></div>

            <div onClick={() => globalKeyboardEvent.emit(Direction.right)} className={'button'}><i className="fa fa-arrow-right"></i></div>

        </div>
        </div>
}

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
            {optionsClicked && <Controls/>}
        </div>
    );
}

export default StolenIn60SecondsGame;
