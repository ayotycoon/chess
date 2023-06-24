import {Tool} from "./models/Tool";

export interface Position {
    x: number;
    y: number;
}

export type WallType = 'H' | 'V' | 'B';

export enum Direction {
    up,
    down,
    right,
    left,
    undo,
}
export interface PromptData<T,X>{
    title: string;
    data:T;
    cb: (data:X|null) => void

}


export interface ItemState {
    position: { x: number, y: number },
    grid: { x: number, y: number },
    dimensions: { width: number, height: number },
    color: string,
    noOfLines: number
    action?: {
        opened?: boolean
    }
}

