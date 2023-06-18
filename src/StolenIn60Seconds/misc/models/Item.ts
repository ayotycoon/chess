import {gridToPosition, positionToGrid} from "../util";
import {Position} from "../types";


export default class Item{

    protected ctx: CanvasRenderingContext2D;
    protected style = {
        position: {
            x: 0,
            y: 0,
        },
        grid: {
            x: 0,
            y: 0,

        },
        dimensions: {
            width: 20,
            height: 100
        },
        color: 'black',
        noOfLines: 10,
    }
    protected boundaries = [
        [[0,0],[0,0]],
        [[0,0],[0,0]],
    ]

    constructor(ctx: CanvasRenderingContext2D,  gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined,style?: any) {
        this.ctx = ctx;
        // @ ts-ignore
        if(style) this.style = {...this.style, ...style};
        if (position) {
            this.style.position = position;
            this.style.grid = positionToGrid(position.x,position.y)
        } else {
            this.style.position = gridToPosition(gridX, gridY);
            this.style.grid = {
                x:gridX,
                y:gridY
            }
        }
        this.calculateBoundaries()
    }

    public  getBoundaries(){
        return this.boundaries;
    }
    public isWithinBoundary (grid:number[][]){

        return false;

    }
    public  calculateBoundaries(){
        this.boundaries[0][0][0] = this.style.position.x;
        this.boundaries[0][0][1] = this.style.position.y;

        this.boundaries[0][1][0] = this.style.position.x + this.style.dimensions.width;
        this.boundaries[0][1][1] = this.style.position.y;

        this.boundaries[1][0][0] = this.style.position.x;
        this.boundaries[1][0][1] = this.style.position.y + this.style.dimensions.height;

        this.boundaries[1][1][0] = this.style.position.x + this.style.dimensions.width;
        this.boundaries[1][1][1] = this.style.position.y + this.style.dimensions.height;

    }
    public updateGrid(gridX: number, gridY: number) {
        this.style.position = gridToPosition(gridX, gridY);
        this.style.grid.x = gridX;
        this.style.grid.y = gridY;

        this.calculateBoundaries()

    }

    public draw = {
        all: () => {

        }
    }
    public getStyle = () =>{
        return this.style;
    }
}