import {gridToPosition} from "../util";
import {Position} from "../types";
import Item from "./Item";

class Wall extends Item{
    private readonly type:string;

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, type = 'V',state?: any) {
        super(ctx,gridX,gridY,position, state);
        this.ctx = ctx;
        this.type = type;
        this.state.noOfLines =  this.state.dimensions.height/10;

        if (type == 'H') {
            const temp = this.state.dimensions.width;
            this.state.dimensions.width = this.state.dimensions.height;
            this.state.dimensions.height = temp;
            this.calculateBoundaries();
        }

        this.draw.all();


    }
    public updateGrid(gridX: number, gridY: number) {
        this.updateGrid(gridX,gridY);
        this.draw.all();

    }
    public draw = {
        rect: () => {
            this.ctx.beginPath();

            this.ctx.strokeStyle = this.state.color;
            this.ctx.strokeRect(
                this.state.position.x,
                this.state.position.y,
                this.state.dimensions.width,
                this.state.dimensions.height,
            );

            this.ctx.fill();

        },
        lines: () => {
            if (this.type === 'V' || this.type === 'B') {
                const diff = this.state.dimensions.height / this.state.noOfLines;
                for (let i = 0; i < this.state.noOfLines; i++) {
                    const _height = (this.state.dimensions.width / 2) + (i * diff);

                    const heightWithPosition = _height + this.state.position.y;
                    const widthWithPosition = this.state.position.x + this.state.dimensions.width

                    if (_height > this.state.dimensions.height) {

                    }
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.state.color;
                    this.ctx.moveTo(this.state.position.x, this.state.position.y + (i * diff));
                    this.ctx.lineTo(widthWithPosition, heightWithPosition);

                    this.ctx.stroke();
                }
                return;
            }


            if(this.type == 'H'){
                const diff = this.state.dimensions.width / this.state.noOfLines;
                for (let i = 0; i < this.state.noOfLines; i++) {
                    const _width = (this.state.dimensions.height / 2) + (i * diff);

                    const widthWithPosition = _width + this.state.position.x;
                    const heightWithPosition = this.state.position.y + this.state.dimensions.height

                    if (_width > this.state.dimensions.width) {

                    }
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.state.color;
                    this.ctx.moveTo(this.state.position.x + (i * diff), this.state.position.y);
                    this.ctx.lineTo(widthWithPosition, heightWithPosition);

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
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined,style?:any) {
        super(ctx, gridX, gridY, position, 'H',style)
    }

}
export class VWall extends Wall {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined,style?:any) {
        super(ctx, gridX, gridY, position, 'V',style)
    }

}
