import './StolenIn60Seconds.css';
import {useContext, useEffect, useRef} from "react";
import {draw} from "./misc/draw";
import {StateContext} from "../misc/StateProvider";
import {Direction} from "./misc/types";
import {keyboardObs, stageObs} from "./misc/utils";


function TimePill(props:any) {
    const min = Math.floor(props.time / 60);
    const seconds = props.time % 60;
    return <div style={{background:'#ada69c', borderRadius:'5px',padding:'2.5px 5px',display:'inline-block',color:'#faf985',fontWeight:'bold',fontSize:'22px'}}>
        {min < 10 ? '0'+min: min}:{seconds < 10 ? '0'+seconds: seconds}
    </div>

}
function Controls() {
    return <div>

        <div style={{display: 'flex', justifyContent:'space-evenly'}}>
            <div onClick={() => keyboardObs.emit(Direction.up)} className={'button'}><i className="fa fa-arrow-up"></i>
            </div>
            <div onClick={() => keyboardObs.emit(Direction.down)} className={'button'}><i
                className="fa fa-arrow-down"></i></div>
        </div>


        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div onClick={() => keyboardObs.emit(Direction.left)} className={'button'}><i className="fa fa-arrow-left"></i></div>

            <div onClick={() => keyboardObs.emit(Direction.right)} className={'button'}><i className="fa fa-arrow-right"></i></div>

        </div>
        </div>
}

function BottomPanel() {
    const {stageProps,setStageProps} = useContext(StateContext);
    useEffect(()=>{
        stageObs.subscribe((val) => {
            if(val.time != undefined){
                stageProps.time = val.time;
                setStageProps({...stageProps})
            }
        })

    },[])
    return (
        <div style={{position: 'fixed', bottom: '0px', width: '100vw', background: '#213c42', zIndex: 10}} className={'p-2'}>
<div style={{textAlign:'right'}}>
    <TimePill time={stageProps.time} />
</div>

<br />
            <div className={"row"}>
                <div className={"col-6"}></div>
                <div className={"col-6"}>
                    <Controls />
                </div>

            </div>

        </div>
    )

}

export default BottomPanel;
