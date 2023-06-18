import {gridToPosition} from "../util";


export default class Item{
    protected style = {
        position: {
            x: 0,
            y: 0
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

    constructor(style?: any) {
        // @ ts-ignore
        if(style) this.style = {...this.style, ...style};
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

        this.calculateBoundaries()

    }
}