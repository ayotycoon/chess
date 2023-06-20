import {gridToPosition, positionToGrid} from "../util";
import {Position} from "../types";


export default class Item{
    protected ctx: CanvasRenderingContext2D;
    protected state = {
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
            height: 120
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

        if (position) {
            this.state.position = position;
            this.state.grid = positionToGrid(position.x,position.y)
        } else {
            this.state.position = gridToPosition(gridX, gridY);
            this.state.grid = {
                x:gridX,
                y:gridY
            }
        }

        // @ ts-ignore
        if(style) {
            this.state = {...this.state, ...style};
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
        this.boundaries[0][0][0] = this.state.position.x;
        this.boundaries[0][0][1] = this.state.position.y;

        this.boundaries[0][1][0] = this.state.position.x + this.state.dimensions.width;
        this.boundaries[0][1][1] = this.state.position.y;

        this.boundaries[1][0][0] = this.state.position.x;
        this.boundaries[1][0][1] = this.state.position.y + this.state.dimensions.height;

        this.boundaries[1][1][0] = this.state.position.x + this.state.dimensions.width;
        this.boundaries[1][1][1] = this.state.position.y + this.state.dimensions.height;


    }
    public updateGrid(gridX: number, gridY: number) {
        this.state.position = gridToPosition(gridX, gridY);
        this.state.grid.x = gridX;
        this.state.grid.y = gridY;

        this.calculateBoundaries()

    }

    public draw = {
        all: () => {

        }
    }
    public getStyle = () =>{
        return this.state;
    }
    public debug = {
        cordinates: () => {
            this.getBoundaries().forEach(each => {
                each.forEach(boundary =>{
                    this.ctx.fillText(`${boundary[0]},${boundary[1]}`, boundary[0], boundary[1]);
                })

            })

        },
        highlight: () => {
            this.ctx.beginPath();

            this.ctx.strokeStyle = 'red';
            this.ctx.strokeRect(
                this.state.position.x,
                this.state.position.y,
                this.state.dimensions.width,
                this.state.dimensions.height,
            );
        },

        all: () => {
            this.debug.cordinates()
            this.debug.highlight()

        }
    }
}