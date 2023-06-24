import {ItemState, Position, WallType} from "../types";
import Item, {getDefaultState, StateActionItem} from "./Item";
import {node} from "../modules/linkedlist";
import {Gate} from "./Gate";
 export abstract  class SafeBox extends StateActionItem<{
    opened: boolean;
}> {
    private type: WallType;

     private img?: HTMLImageElement;
     private imgPromise?:Promise<boolean>;

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, type: WallType = 'V', style?: Partial<ItemState>) {
        super(ctx, gridX, gridY, style);

        this.stateActionHistory.add(node({opened: false, second: 0}))
        this.state.color = 'black';
        this.state.action = {
            opened: false
        }
        this.type = type;

        if(this.state.src){
            this.img = new Image();
            this.img.src = this.state.src;
            this.imgPromise = new Promise((resolve,reject) => {
                if(!this.img) return resolve(true);
                this.img.onload = () => {
                    resolve(true)
                }
            })
        }


    }

    public updateGrid(gridX: number, gridY: number) {
        this.updateGrid(gridX, gridY);


    }

    public draw = {
        ui: () => {
            if(this.imgPromise && this.img){

                this.imgPromise.then(() => {
                    if(!this.img)return;
                    this.ctx.drawImage(this.img, this.state.position.x, this.state.position.y, this.state.dimensions.xAxis, this.state.dimensions.yAxis);

                })
                return;
            }
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.state.color;
            const x = this.state.position.x
            const y = this.state.position.y
            this.ctx.strokeRect(
                x,
                y,
                this.state.dimensions.xAxis - (this.type == 'V' ? 10 : 0),
                this.state.dimensions.yAxis - (this.type == 'H' ? 10 : 0),
            );

            if(this.type =='B'){
                this.ctx.arc(
                    x + (this.state.dimensions.xAxis/2),
                    y + (this.state.dimensions.yAxis/2),
                    (this.state.dimensions.xAxis) / 4,
                    0,
                    Math.PI * 2,
                    false
                );
            }


            this.ctx.stroke();

        },
        cross: () => {
            this.ctx.beginPath();
            this.ctx.lineWidth = 2
            this.ctx.strokeStyle = this.state.color;

            const draw = (second = true) => {
                if (!this.state.action?.opened) return;
                let x;
                if (!second) x = this.getBoundaries()[0][0][0] + (this.type == 'H' ? 5 : 0);
                else x = this.getBoundaries()[0][1][0] - (this.type == 'H' ? 5 : 0);
                const y = this.getBoundaries()[0][0][1] + (this.type == 'V' ? 5 : 0);

                let endX;
                if (!second) endX = this.getBoundaries()[1][1][0] - (this.type == 'H' ? 5 : 0);
                else endX = this.getBoundaries()[1][0][0] + (this.type == 'H' ? 5 : 0);

                const endY = this.getBoundaries()[1][1][1] - (this.type == 'V' ? 5 : 0);

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
            this.draw.ui();
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

export class VSafeBox extends SafeBox {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0) {
        super(ctx, gridX, gridY, 'V', {dimensions: {xAxis: 20, yAxis: 40}})
    }

}

export class HSafeBox extends SafeBox {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0) {
        super(ctx, gridX, gridY, 'H', {dimensions: {xAxis: 40, yAxis: 20}})
    }

}
export class MediumSafeBox extends SafeBox {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0) {
        super(ctx, gridX, gridY, 'B', {dimensions: {xAxis: 60, yAxis: 60},})
    }

}