import Item, {StateActionItem} from "./Item";
import {Position} from "../types";
import {positionToGrid, stageObs} from "../utils";
import {node} from "../modules/linkedlist";

export default class Circle extends StateActionItem<{
    x:number;
    y:number;
}> {


    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0) {
        super(ctx, gridX, gridY, {dimensions: {yAxis: 10, xAxis: 10}})
        this.stateActionHistory.add(node({x: this.state.position.x, y: this.state.position.y,second:0}))

    }

    action = {
        goTo: (gridX: number, gridY: number) => {

            const previousPosition = {...this.getPreviousPosition()};

            const prevGrid = positionToGrid(previousPosition.x,previousPosition.y);

            const res = {
                prevPosition: previousPosition,
                reject: () => {
                    this.updateGrid(prevGrid.x, prevGrid.y);
                    this.draw.all();
                },
                accept: () => {

                }

            }
            this.updateGrid(gridX, gridY);
            return res;

        },
        down: (n = 1) => {
            const {x,y} = this.getPreviousGrid();
            return this.action.goTo(x, y + n)
        },
        up: (n = 1) => {
            const {x,y} = this.getPreviousGrid();
            return this.action.goTo(x, y - n)
        },
        right: (n = 1) => {
            const {x,y} = this.getPreviousGrid();
            return this.action.goTo(x + n, y)
        },
        left: (n = 1) => {
            const {x,y} = this.getPreviousGrid();
            return this.action.goTo(x - n, y)
        }
    }
    public draw = {
        history: () => {
            const arr = this.stateActionHistory.values();
            arr.forEach((curr, i) => {
                if (i == 0) return;
                const prev = arr[i - 1];
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.state.color;
                this.ctx.strokeRect(
                    prev.x,
                    prev.y,
                    curr.x - prev.x,
                    curr.y - prev.y,
                );
            })

        },
        arc: () => {
            this.ctx.beginPath();
            this.ctx.arc(
                this.state.position.x,
                this.state.position.y,
                (this.state.dimensions.xAxis) / 2,
                0,
                Math.PI * 2,
                false
            );

            this.ctx.fillStyle = this.state.color;
            this.ctx.fill();
        },
        all: () => {
            this.draw.history();
            this.draw.arc();
        }
    }

    public getPlayerMoves() {
        return this.stateActionHistory.tail()?.val.second || 0

    }

    timeElapsedAction = (currentSecond:number)=> {
        this.stateActionHistory.add(node({x:this.state.position.x,y:this.state.position.y,second: currentSecond}))
    }

    resetToTime = (second:number)=> {
        let resetNode: any = this._resetToTime(second);
        if(!resetNode) return false;

        this.state.position.x = resetNode.val.x
        this.state.position.y = resetNode.val.y

        this.state.grid = positionToGrid(resetNode.val.x,resetNode.val.y)

        return true;

    }

    private getPreviousPosition() {
        return this.stateActionHistory.tail()?.val
    }
    private getPreviousGrid() {
        const {x,y} = this.stateActionHistory.tail()?.val;
        return positionToGrid(x,y)
    }

    getLastActionSecond() {
        const tail = this.stateActionHistory.tail();
        return (tail?.val.second || 0) - ( tail?.prev?.val.second || 0)
    }
}
