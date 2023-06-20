export interface Position {
    x: number;
    y: number;
}
export type WallType = 'H' | 'V' | 'B';
export enum Direction {
    up,
    down,
    right,
    left
}