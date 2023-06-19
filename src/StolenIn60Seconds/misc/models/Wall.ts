import {gridToPosition} from "../util";
import {Position} from "../types";
import Item from "./Item";

class Wall extends Item{
    private readonly type:string;

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, type = 'V',style?: any) {
        super(ctx,gridX,gridY,position, style);
        this.ctx = ctx;
        this.type = type;
        this.style.noOfLines =  this.style.dimensions.height/10;

        if (type == 'H') {
            const temp = this.style.dimensions.width;
            this.style.dimensions.width = this.style.dimensions.height;
            this.style.dimensions.height = temp;
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

            this.ctx.strokeStyle = this.style.color;
            this.ctx.strokeRect(
                this.style.position.x,
                this.style.position.y,
                this.style.dimensions.width,
                this.style.dimensions.height,
            );

            this.ctx.fill();

        },
        lines: () => {
            if (this.type === 'V' || this.type === 'B') {
                const diff = this.style.dimensions.height / this.style.noOfLines;
                for (let i = 0; i < this.style.noOfLines; i++) {
                    const _height = (this.style.dimensions.width / 2) + (i * diff);

                    const heightWithPosition = _height + this.style.position.y;
                    const widthWithPosition = this.style.position.x + this.style.dimensions.width

                    if (_height > this.style.dimensions.height) {

                    }
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.style.color;
                    this.ctx.moveTo(this.style.position.x, this.style.position.y + (i * diff));
                    this.ctx.lineTo(widthWithPosition, heightWithPosition);

                    this.ctx.stroke();
                }
                return;
            }


            if(this.type == 'H'){
                const diff = this.style.dimensions.width / this.style.noOfLines;
                for (let i = 0; i < this.style.noOfLines; i++) {
                    const _width = (this.style.dimensions.height / 2) + (i * diff);

                    const widthWithPosition = _width + this.style.position.x;
                    const heightWithPosition = this.style.position.y + this.style.dimensions.height

                    if (_width > this.style.dimensions.width) {

                    }
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.style.color;
                    this.ctx.moveTo(this.style.position.x + (i * diff), this.style.position.y);
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
