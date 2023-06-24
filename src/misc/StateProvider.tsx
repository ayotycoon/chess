import React, { FC, useState, createContext } from 'react';
import {Tool} from "../StolenIn60Seconds/misc/models/Tool";
import {PromptData} from "../StolenIn60Seconds/misc/types";

interface StageProps  {
    screenGrabbed?: boolean;
    time: number;
    toolsPrompt?:PromptData<Tool[], Tool>;
}
interface StateContext  {
    showNav: boolean;
    setShowNav: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    optionsClicked: boolean;
    setOptionsClicked: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    stageProps: {
        screenGrabbed?: boolean;
        time: number;
        toolsPrompt?:PromptData<Tool[], Tool>;
    },
    setStageProps: React.Dispatch<React.SetStateAction<StageProps>>
};


export const StateContext = createContext<StateContext>(
    {} as StateContext
);
const stagePropsObj ={
    content:{

    }

} as { content:StageProps }
export const getStageProps = () =>{
    return stagePropsObj.content
}
export const StateProvider = ({ children }: any) => {
    const [showNav, setShowNav] = useState(true);
    const [optionsClicked, setOptionsClicked] = useState(false);
    const [stageProps, _setStageProps] = useState({time:0} as StageProps);
    const  setStageProps:any = (obj:StageProps) => {
        stagePropsObj.content = obj;
        return _setStageProps(obj)
    }

    const states = {
        showNav, setShowNav,optionsClicked, setOptionsClicked,stageProps, setStageProps
    }

    return (
        <StateContext.Provider value={states}>
            {children}
        </StateContext.Provider>
    );
};
