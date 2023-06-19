import {gridToPosition} from "../util";
import {Position, WallType} from "../types";
import Item from "./Item";

class Gate extends Item{
    private readonly type:WallType;

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, type:WallType = 'V',style?: any) {
        super(ctx,gridX,gridY,position, style);
        this.style.dimensions.width = 10;
        this.style.dimensions.height = 80;
        this.style.color = 'black';
        this.type = type;

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
            const x = this.style.position.x + (this.type == 'V' ? 5 : 0)
            const y = this.style.position.y + (this.type == 'H' ? 5 : 0)
            this.ctx.strokeRect(
                x,
                y,
                this.style.dimensions.width,
                this.style.dimensions.height,
            );

            this.ctx.fill();

        },
        all: () => {
            this.draw.rect();
        }
    }

}

export class HGate extends Gate {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, 'H')
    }

}
export class VGate extends Gate {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, 'V')
    }

}

