import {gridToPosition, positionToGrid} from "../utils";
import {ItemState, Position} from "../types";
import {LinkedList} from "../modules/linkedlist";

export function getDefaultState() {
    return {
        position: {
            x: 0,
            y: 0,
        },
        grid: {
            x: 0,
            y: 0,

        },
        dimensions: {
            xAxis: 20,
            yAxis: 120
        },
        color: 'black',
        noOfLines: 10,
    }
}

export default class Item {
    protected ctx: CanvasRenderingContext2D;
    protected state: ItemState = getDefaultState()


    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, style?: Partial<ItemState>) {
        this.ctx = ctx;


        // @ ts-ignore
        if (style) {
            this.state = {...this.state, ...style};
        }
        if(gridX != undefined && gridY != undefined)this.state.position = gridToPosition(gridX, gridY);
        this.state.grid = positionToGrid(this.state.position.x, this.state.position.y)

    }
    public getBoundaries() {
        const boundaries = [
            [[0, 0], [0, 0]],
            [[0, 0], [0, 0]],
        ]
        boundaries[0][0][0] = this.state.position.x;
        boundaries[0][0][1] = this.state.position.y;

        boundaries[0][1][0] = this.state.position.x + this.state.dimensions.xAxis;
        boundaries[0][1][1] = this.state.position.y;

        boundaries[1][0][0] = this.state.position.x;
        boundaries[1][0][1] = this.state.position.y + this.state.dimensions.yAxis;

        boundaries[1][1][0] = this.state.position.x + this.state.dimensions.xAxis;
        boundaries[1][1][1] = this.state.position.y + this.state.dimensions.yAxis;

        return boundaries;
    }

    public updateGrid(gridX: number, gridY: number) {
        this.state.position = gridToPosition(gridX, gridY);
        this.state.grid.x = gridX;
        this.state.grid.y = gridY;


    }

    public draw = {
        all: () => {

        }
    }
    public getState = () => {
        return this.state;
    }
    public debug = {
        cordinates: () => {
            this.getBoundaries().forEach(each => {
                each.forEach(boundary => {
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
                this.state.dimensions.xAxis,
                this.state.dimensions.yAxis,
            );
        },

        all: () => {
            this.debug.cordinates()
            this.debug.highlight()
            console.log('el', this)

        }
    }

    setActionState(param: { opened: boolean }) {
        this.state.action = {...this.state.action, ...param}
    }

    getActionState() {
        return this.state.action
    }
}

export class StateActionItem<T> extends Item {
    protected stateActionHistory = LinkedList<T & { second: number }>();


    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, style?: Partial<ItemState>) {
        super(ctx, gridX, gridY, style)

    }

    timeElapsedAction = (second: number) => {

    }

    public resetToTime = (second: number) => {

    }
    protected _resetToTime = (second: number) => {
        let x = this.stateActionHistory.head();
        let resetNode: typeof x;
        while (x) {
            if (x.val.second > second) {
                if (x.prev) {
                    resetNode = x.prev;
                    x.prev.next = undefined;

                    this.stateActionHistory.setCurr(x.prev)
                }
            }
            x = x.next;
        }

        return resetNode
    }


}

