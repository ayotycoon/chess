import './StolenIn60Seconds.css';
import {useContext, useEffect, useRef, useState} from "react";
import {draw} from "./misc/draw";
import {getStageProps, StateContext} from "../misc/StateProvider";
import {Direction, PromptData} from "./misc/types";
import {keyboardObs, stageObs} from "./misc/utils";
import {Hammer, Tool} from "./misc/models/Tool";
import {Button, CancelButton, CheckButton, GrabButton, UndoButton} from "./components/Button";


function Prompt(props: { data?: PromptData<Tool[], Tool>, dataRef?: any }) {
    const data = props.data;
    const [selectedTool, setSelectedTool] = useState(null as unknown as Tool);

    if (!data) return <></>;
    return <div style={{
        position: 'fixed',
        top: '0px',
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>


        <div style={{background: '#b5aaa0', width: '100%', maxWidth: '500px', padding: '5px'}}>
            <div style={{background: '#6f768a', padding: '2px', marginBottom: '10px'}}>
                {data.title}
            </div>

            <div style={{}}>
                {data.data.map(tool => {
                    const activeTool = tool.title == selectedTool?.title;
                    return (
                        <div key={tool.title} onClick={() => {
                            setSelectedTool(tool)
                        }} style={{

                            marginLeft: '10px',
                            marginBottom: '5px',
                            display: 'flex',
                            overflow: 'hidden',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid transparent',
                            ...(activeTool ? {

                                border: '1px solid white'
                            } : {})

                        }}>
                            <div style={{
                                background: '#b4aaa2',
                                borderRadius: '5px',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                overflow: 'hidden',

                            }}>
                                <img style={{width: '100%'}} src={tool.img}/>
                            </div>
                            <div style={{marginLeft: '10px'}}>
                                {tool.title}
                            </div>
                        </div>
                    )
                })}
            </div>


            <br/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <CheckButton onClick={() => props.dataRef.cb(selectedTool)} disabled={!selectedTool}/>

                <CancelButton onClick={() => props.dataRef.cb(null)}/>
            </div>

            {/*<div style={{}}>*/}
            {/*    {[1, 2, 3, 4, 5, 6].map(tool => {*/}
            {/*        return (*/}
            {/*            <div style={{*/}
            {/*                background: '#b4aaa2',*/}
            {/*                borderRadius: '5px',*/}
            {/*                width: '60px',*/}
            {/*                height: '60px',*/}
            {/*                display: 'inline-block',*/}
            {/*                margin: '5px',*/}
            {/*                overflow:'hidden',*/}
            {/*                */}
            {/*            }}>*/}
            {/*                <img style={{width:'100%'}} src={process.env.PUBLIC_URL + '/assets/hammer.avif'}/>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    </div>
}

function TimePill(props: any) {
    const min = Math.floor(props.time / 60);
    const seconds = props.time % 60;
    return <div style={{
        background: '#ada69c',
        borderRadius: '5px',
        padding: '2.5px 5px',
        display: 'inline-block',
        color: '#faf985',
        fontWeight: 'bold',
        fontSize: '22px'
    }}>
        {min < 10 ? '0' + min : min}:{seconds < 10 ? '0' + seconds : seconds}
    </div>

}

function StageUI() {
    const {stageProps, setStageProps} = useContext(StateContext);

    useEffect(() => {
        const obs = stageObs.subscribe((val) => {

            if (val.time != undefined) {
                stageProps.time = val.time;
            }
            stageProps.toolsPrompt = val.toolsPrompt;
            setStageProps({...stageProps})
        })
        return () => {
            obs.unsubscribe()
        }

    }, [])

    function BottomPanel() {
        return <div style={{position: 'fixed', bottom: '0px', width: '100vw', background: '#213c42', zIndex: 2}}
                    className={'p-2'}>
            <div style={{textAlign: 'right'}}>
                {(!!stageProps.time) && <UndoButton style={{margin:0,marginRight: '5px'}} onClick={() => {
                    keyboardObs.emit(Direction.undo)
                }}/>}

                <GrabButton enabled={stageProps.screenGrabbed} style={{margin:0,marginRight: '5px'}} onClick={() => {
                    setStageProps({...stageProps,screenGrabbed:!stageProps.screenGrabbed})
                }}/>

                <TimePill time={stageProps.time}/>
            </div>

            <br/>


        </div>
    }

    return (<>
            <Prompt data={stageProps.toolsPrompt} dataRef={getStageProps().toolsPrompt}/>
            <BottomPanel/>

        </>
    )

}

export default StageUI;
