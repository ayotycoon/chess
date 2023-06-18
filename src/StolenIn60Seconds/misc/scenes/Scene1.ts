import {VWall,HWall} from "../models/Wall";

export default class Scene1{
    pos = {
        x: 5,
        y: 5,
    }
    scene:(VWall | HWall | null)[][] = [];
    private ctx: CanvasRenderingContext2D;
    
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        
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

        this.scene.forEach((row) => {
            row.forEach(el => {
                if (!el) {
                    return
                }
            })
        })

    }
}