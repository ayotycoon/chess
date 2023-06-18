import {VWall, HWall, BWall} from "../models/Wall";
import Item from "../models/Item";
import {gridToPosition, windowUtils} from "../util";
import Circle from "../models/Circle";


export default class Scene1 {
    pos = {
        x: 5,
        y: 5,
    }
    scene: (Item | null)[][] = [];
    private readonly canvasContainer: HTMLDivElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public player: Circle = null as any;
    public generateGrid: any = null as any;
    private stack ={
        horizontal: [] as any [],
        vertical: []as any [],
    }
    private keyCb = null as any

    constructor(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D,canvasContainer:HTMLDivElement, generateGrid: any) {
        this.canvasContainer = canvasContainer;
        this.canvas = canvas;
        this.ctx = ctx;
        this.generateGrid = generateGrid;


        this.generateScenes();

        this.keyCb = (e:KeyboardEvent)=> {
            e = e || window.event;
            let valid = false;

            if (e.keyCode == 38) {
                valid = true;
                // up arrow
                this.player.action.up()
            }
            else if (e.keyCode == 40) {
                valid = true;
                // down arrow
                this.player.action.down()
            }
            else if (e.keyCode == 37) {
                valid = true;
                // left arrow
                this.player.action.left()
                const prev = this.stack.horizontal.length != 0 ? this.stack.horizontal[this.stack.horizontal.length-1]: null;
                if(prev && this.player.getStyle().position.x <= prev.pos){
                    this.canvasContainer.scrollLeft = 0;
                    this.canvasContainer.scrollLeft = prev.scrollPos;
                    this.stack.horizontal.pop()

                }
            }
            else if (e.keyCode == 39) {
                valid = true;
                // right arrow
                this.player.action.right()
                if((this.player.getStyle().position.x + 100) >= windowUtils.x){
                const obj = {
                    pos: this.player.getStyle().position.x,
                    scrollPos: this.canvasContainer.scrollLeft,
                };
                    this.stack.horizontal.push(obj)
                    this.canvasContainer.scrollLeft =window.innerWidth/3
                }
            }

            if(valid){
                this.ctx.clearRect(0,0,1000,1000)
                this.generateGrid()
                this.generateScenes()
            }

        };

        document.addEventListener('keydown',this.keyCb,true)

    }
    public destroy(){
        document.removeEventListener('keydown',this.keyCb,true)

    }

    private generateScenes() {
        this.ctx.save();
        if (this.scene.length) {
            this.scene.forEach(row => {
                row.forEach(el => {
                    el?.draw.all();
                })
            })

            this.ctx.restore();
            return;
        }
        this.player = new Circle(this.ctx, this.pos.x + (1.1 * 5), this.pos.y + (1.1 * 5));
        this.scene = [
            [new BWall(this.ctx, this.pos.x, this.pos.y + (0.0 * 5)), new HWall(this.ctx, this.pos.x + (0.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (1.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (2.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (3.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (4.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (5.2 * 5), this.pos.y + (0 * 5)), new BWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (0 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (0.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (0.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (1.2 * 5)), this.player, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (1.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (2.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (2.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (3.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (3.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (4.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (4.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (5.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (5.2 * 5))],
            [new BWall(this.ctx, this.pos.x, this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (0.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (1.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (2.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (3.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (4.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (5.2 * 5), this.pos.y + (6.2 * 5)), new BWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (6.2 * 5))],

        ];
        this.ctx.restore();
    }
}