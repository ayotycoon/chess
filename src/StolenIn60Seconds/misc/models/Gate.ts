import {Position, WallType} from "../types";
import Item, {getDefaultState, StateActionItem} from "./Item";
import {node} from "../modules/linkedlist";

export class Gate extends StateActionItem<{
    opened: boolean;
}> {
    private readonly type: WallType;

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined, type: WallType = 'V', style?: any) {
        super(ctx, gridX, gridY, position, style);

        this.stateActionHistory.add(node({opened: false, second: 0}))
        this.state.color = 'black';
        this.state.action = {
            opened: false
        }
        this.type = type;

        if (type == 'H') {
            const temp = this.state.dimensions.width;
            this.state.dimensions.width = this.state.dimensions.height;
            this.state.dimensions.height = temp;
            this.calculateBoundaries();
        }



    }

    public updateGrid(gridX: number, gridY: number) {
        this.updateGrid(gridX, gridY);


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
                this.state.dimensions.height - (this.type == 'H' ? 10 : 0),
            );

            this.ctx.stroke();

        },
        cross: () => {
            this.ctx.beginPath();
            this.ctx.lineWidth = 4
            this.ctx.strokeStyle = this.state.color;

            const draw = (second = true) => {
                if (!this.state.action?.opened) return;
                let x;
                if (!second) x = this.getBoundaries()[0][0][0] + (this.type == 'H' ? 20 : 0);
                else x = this.getBoundaries()[0][1][0] - (this.type == 'H' ? 20 : 0);
                const y = this.getBoundaries()[0][0][1] + (this.type == 'V' ? 20 : 0);

                let endX;
                if (!second) endX = this.getBoundaries()[1][1][0] - (this.type == 'H' ? 20 : 0);
                else endX = this.getBoundaries()[1][0][0] + (this.type == 'H' ? 20 : 0);

                const endY = this.getBoundaries()[1][1][1] - (this.type == 'V' ? 20 : 0);

                this.ctx.moveTo(x, y);
                this.ctx.lineTo(
                    endX,
                    endY
                );

                this.ctx.stroke();

            }
            draw();
            draw(false)

        },
        all: () => {
            this.draw.rect();
            this.draw.cross();
        }
    }

    timeElapsedAction = (second: number) => {
        this.stateActionHistory.add(node({opened: this.state.action?.opened || false, second}))
    }

    resetToTime = (second:number)=> {
        let resetNode: any  = this._resetToTime(second)
        if(!resetNode || !this.state.action) return false;
        this.state.action.opened = resetNode.val.opened

        return true;

    }

}

export class HGate extends Gate {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, 'H', {dimensions: {width: 20, height: 80}})
    }

}

export class VGate extends Gate {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, 'V', {dimensions: {width: 20, height: 80}})
    }

}

