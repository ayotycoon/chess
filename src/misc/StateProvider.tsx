import React, { FC, useState, createContext } from 'react';

interface StateContext  {
    showNav: boolean;
    setShowNav: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    optionsClicked: boolean;
    setOptionsClicked: (value: (((prevState: boolean) => boolean) | boolean)) => void;
};


export const StateContext = createContext<StateContext>(
    {} as StateContext
);

export const StateProvider = ({ children }: any) => {
    const [showNav, setShowNav] = useState(true);
    const [optionsClicked, setOptionsClicked] = useState(false);

    const states = {
        showNav, setShowNav,optionsClicked, setOptionsClicked
    }

    return (
        <StateContext.Provider value={states}>
            {children}
        </StateContext.Provider>
    );
};
