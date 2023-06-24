import './StolenIn60Seconds.css';
import {useContext, useEffect, useRef} from "react";
import {draw} from "./misc/draw";
import {StateContext} from "../misc/StateProvider";
import StageUI from "./StageUI";
import {useSwipeable} from "react-swipeable";
import {keyboardObs} from "./misc/utils";
import {Direction} from "./misc/types";

function StolenIn60SecondsGame() {
    const {stageProps} = useContext(StateContext);
    console.log(stageProps)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasContainerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        draw(canvasRef.current, canvasContainerRef.current)
    }, [])

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === 'Left') keyboardObs.emit(Direction.left)
            if (eventData.dir === 'Right') keyboardObs.emit(Direction.right)
            if (eventData.dir === 'Up') keyboardObs.emit(Direction.up)
            if (eventData.dir === 'Down') keyboardObs.emit(Direction.down)
        },

        ...{
            delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
            preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
            trackTouch: true,                      // track touch input
            trackMouse: false,                     // track mouse input
            rotationAngle: 0,                      // set a rotation angle
            swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
            touchEventOptions: {passive: true},  // options for touch listeners (*See Details*)

        }

    });
    return (
        <div {...handlers}>
            <div ref={canvasContainerRef} className={"StolenIn60SecondsGame "+ (!stageProps.screenGrabbed ? "prevent-grab":"")}>
                <canvas ref={canvasRef} style={{touchAction: 'auto'}}></canvas>
                <StageUI/>
            </div>
        </div>
    );
}

export default StolenIn60SecondsGame;
