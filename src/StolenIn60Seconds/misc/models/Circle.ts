import Item from "./Item";
import {Position} from "../types";

export default class Circle extends Item {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, {dimensions: {height: 20, width: 20}, noOfLines: 2})
        this.draw.all()
    }

    action = {
        goTo: (gridX: number, gridY: number) => {
            const prev = {...this.style.grid};

            const res = {
                reject: () => {
                    this.updateGrid(prev.x, prev.y);
                    this.draw.all();
                },
                accept: () => {
                    this.draw.all();
                }

            }
            this.updateGrid(gridX, gridY);
            return res;

        },
        down: (n = 1) => {
            return this.action.goTo(this.style.grid.x, this.style.grid.y + n)
        },
        up: (n = 1) => {
            return this.action.goTo(this.style.grid.x, this.style.grid.y - n)
        },
        right: (n = 1) => {
            return this.action.goTo(this.style.grid.x + n, this.style.grid.y)
        },
        left: (n = 1) => {
            return this.action.goTo(this.style.grid.x - n, this.style.grid.y)
        }
    }
    public draw = {
        arc: () => {
            this.ctx.beginPath();
            this.ctx.arc(
                this.style.position.x,
                this.style.position.y,
                (this.style.dimensions.width) / 2,
                0,
                Math.PI * 2,
                false
            );

            this.ctx.fillStyle = this.style.color;
            this.ctx.fill();
        },
        all: () => {
            this.draw.arc();
        }
    }

}
