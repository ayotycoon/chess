import {Position} from "../types";
import Item from "./Item";


 class ImageItem extends Item{
    private img = new Image()

    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position, {dimensions: {height: 40, width: 40}, noOfLines: 2});

        this.img.src = process.env.PUBLIC_URL + '/assets/flower.png';
        this.img.onload = () => {
            this.draw.all();
        }
    }

    draw = {
        image:() => {
            this.ctx.drawImage(this.img,this.style.position.x, this.style.position.y, this.style.dimensions.width,this.style.dimensions.height);
        },
        all: () => {
            this.draw.image()
        }

    }
}

export  class Flower extends ImageItem {
    constructor(ctx: CanvasRenderingContext2D, gridX: number = 0, gridY: number = 0, position: Position | undefined = undefined) {
        super(ctx, gridX, gridY, position);
    }
}