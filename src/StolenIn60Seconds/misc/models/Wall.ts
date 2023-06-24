import {Position} from "../types";
import Item, {getDefaultState} from "./Item";

class Wall extends Item {
    private readonly type: string;

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, type = 'V', state?: any) {
        super(ctx, gridX, gridY, position, state);
        this.ctx = ctx;
        this.type = type;
        this.state.noOfLines =  this.state.dimensions.yAxis/10;

        if (type == 'H') {
            const temp = this.state.dimensions.xAxis;
            this.state.dimensions.xAxis = this.state.dimensions.yAxis;
            this.state.dimensions.yAxis = temp;
        }


    }

    public updateGrid(gridX: number, gridY: number) {
        this.updateGrid(gridX, gridY);


    }

    public draw = {
        rect: () => {
            this.ctx.lineWidth = 2
            this.ctx.beginPath();

            this.ctx.strokeStyle = this.state.color;
            this.ctx.strokeRect(
                this.state.position.x,
                this.state.position.y,
                this.state.dimensions.xAxis,
                this.state.dimensions.yAxis,
            );

            this.ctx.fill();

        },
        lines: () => {
            if (this.type === 'V' || this.type === 'B') {
                const diff = this.state.dimensions.yAxis / this.state.noOfLines;
                for (let i = 0; i < this.state.noOfLines; i++) {
                    const _long = (this.state.dimensions.xAxis / 2) + (i * diff);

                    const longWithPosition = _long + this.state.position.y;
                    const shortWithPosition = this.state.position.x + this.state.dimensions.xAxis

                    if (_long > this.state.dimensions.yAxis) {

                    }
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.state.color;
                    this.ctx.moveTo(this.state.position.x, this.state.position.y + (i * diff));
                    this.ctx.lineTo(shortWithPosition, longWithPosition);

                    this.ctx.stroke();
                }
                return;
            }


            if (this.type == 'H') {
                const diff = this.state.dimensions.xAxis / this.state.noOfLines;
                for (let i = 0; i < this.state.noOfLines; i++) {
                    const _short = (this.state.dimensions.yAxis / 2) + (i * diff);

                    const shortWithPosition = _short + this.state.position.x;
                    const longWithPosition = this.state.position.y + this.state.dimensions.yAxis

                    if (_short > this.state.dimensions.xAxis) {

                    }
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.state.color;
                    this.ctx.moveTo(this.state.position.x + (i * diff), this.state.position.y);
                    this.ctx.lineTo(shortWithPosition, longWithPosition);

                    this.ctx.stroke();
                }
            }

        },
        all: () => {


            this.draw.rect();
            this.draw.lines();
        }
    }

}

export class HWall extends Wall {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, style?: any) {
        super(ctx, gridX, gridY, position, 'H', style)
    }

}

export class VWall extends Wall {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, style?: any) {
        super(ctx, gridX, gridY, position, 'V', style)
    }

}
