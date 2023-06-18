import {VWall, HWall, BWall} from "../models/Wall";
import Item from "../models/Item";
import {gridToPosition} from "../util";



export default class Scene1 {
    pos = {
        x: 5,
        y: 5,
    }
    scene: (Item  | null)[][] = [];
    private readonly ctx: CanvasRenderingContext2D;
    private readonly blueprint: string[][] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.blueprint = [
            ['.', '-','-','.'],
            ['|', '-','-','-'],
            // ['.', '-','-','.'],
            // ['|', '-', '-', '-', '-', '-', '-', '-', '-', '-','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','|'],
            // ['|', '-', '-', '-', '-', '-', '-', '-', '-', '-','|'],

        ]


        this.generateScenes();

    }

    private generateScenes() {
        this.blueprint.forEach((row,i) => {
            const h:(Item|null)[] = [];
            row.forEach((el, j) => {
                if (el == ' ') {
                    h.push(null)
                    return
                }
                const prevLeft = j == 0 ? null :h[j-1]
                const prevUp = i == 0 ? null :this.scene[i-1][j];
                const _pos = gridToPosition(this.pos.x, this.pos.y)

                const gridX = (!prevLeft ? _pos.x: prevLeft.getBoundaries()[0][1][0]) ;
                const gridY = !prevLeft ? _pos.y: prevLeft.getBoundaries()[0][1][1] + (!prevUp ? 0: 400);



                // if box
                if(el === '.'){
                    h.push(new BWall(this.ctx, 0,0, {x:gridX, y:gridY}))
                    return;
                }

                // if vertical
                if(el === '|'){
                    h.push(new VWall(this.ctx, 0,0, {x:gridX, y:gridY}))
                    return;
                }
                // if horizontal
                if(el === '-'){

                    h.push(new HWall(this.ctx, 0,0, {x:gridX, y:gridY}))
                    return;
                }
            })
            this.scene.push(h);

        })

        /*

        this.scene = [
            [new VWall(this.ctx, this.pos.x, this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (0 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (1 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (2 * 5), this.pos.y + (0 * 5)), new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (0 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (1 * 5)), null, null, new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (1 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (2 * 5)), null, null, new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (3 * 5)), null, null, new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (3 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (4 * 5)), null, null, new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (4 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (5 * 5)), null, null, new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (5 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (6 * 5)), null, null, new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (6 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (7 * 5)), new HWall(this.ctx, this.pos.x + (0 * 5), this.pos.y + (8 * 5)), new HWall(this.ctx, this.pos.x + (1 * 5), this.pos.y + (8 * 5)), new HWall(this.ctx, this.pos.x + (2 * 5), this.pos.y + (8 * 5)), new VWall(this.ctx, this.pos.x + (2.8 * 5), this.pos.y + (7 * 5))],

        ]

*/
    }
}