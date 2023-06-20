import Item from "./Item";
import {Position} from "../types";
import {stageObs} from "../utils";

export default class Circle extends Item {
    private movementHistory: {x:number;y:number}[] = [];
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, {dimensions: {height: 10, width: 10}})
        this.movementHistory.push({x:this.state.position.x,y:this.state.position.y})
        this.draw.all()
    }

    action = {
        goTo: (gridX: number, gridY: number) => {
            const prevGrid = {...this.state.grid};
            const previousPosition = {...this.state.position};

            const res = {
                prevPosition: previousPosition,
                reject: () => {
                    this.updateGrid(prevGrid.x, prevGrid.y);
                    this.draw.all();
                },
                accept: () => {
                    this.movementHistory.push({...this.state.position})
                    stageObs.emit({time:this.movementHistory.length-1})
                    this.draw.all();
                }

            }
            this.updateGrid(gridX, gridY);
            return res;

        },
        down: (n = 1) => {
            return this.action.goTo(this.state.grid.x, this.state.grid.y + n)
        },
        up: (n = 1) => {
            return this.action.goTo(this.state.grid.x, this.state.grid.y - n)
        },
        right: (n = 1) => {
            return this.action.goTo(this.state.grid.x + n, this.state.grid.y)
        },
        left: (n = 1) => {
            return this.action.goTo(this.state.grid.x - n, this.state.grid.y)
        }
    }
    public draw = {
        history: () => {
            this.movementHistory.forEach((curr, i) => {
                if(i == 0) return;
                const prev = this.movementHistory[i-1];
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
                (this.state.dimensions.width) / 2,
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

}
