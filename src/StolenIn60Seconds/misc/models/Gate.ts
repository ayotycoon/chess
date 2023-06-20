import {gridToPosition} from "../util";
import {Position, WallType} from "../types";
import Item from "./Item";

class Gate extends Item{
    private readonly type:WallType;

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, type:WallType = 'V',style?: any) {
        super(ctx,gridX,gridY,position, style);

        this.state.color = 'black';
        this.type = type;

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
            const x = this.state.position.x + (this.type == 'V' ? 5 : 0)
            const y = this.state.position.y + (this.type == 'H' ? 5 : 0)
            this.ctx.strokeRect(
                x,
                y,
                this.state.dimensions.width - (this.type == 'V' ? 10 : 0),
                this.state.dimensions.height  - (this.type == 'H' ? 10 : 0),
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
        super(ctx, gridX, gridY, position, 'H',{dimensions:{width:20,height:80}})
    }

}
export class VGate extends Gate {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, 'V',{dimensions:{width:20,height:80}})
    }

}

