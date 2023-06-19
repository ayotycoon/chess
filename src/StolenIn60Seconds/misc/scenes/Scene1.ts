import {VWall, HWall, BWall} from "../models/Wall";
import Item from "../models/Item";
import {globalKeyboardEvent, gridToPosition, windowUtils} from "../util";
import Circle from "../models/Circle";
import {Flower} from "../models/ImageItem";


export default class Scene1 {
    pos = {
        x: 10,
        y: 10,
        frameX: 0,
        frameY: 0,
    }
    scene: (Item | null)[][] = [];
    private readonly canvasContainer: HTMLDivElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public player: Circle = null as any;
    public generateGrid: any = null as any;
    private stack = {
        horizontal: [] as any [],
        vertical: [] as any [],
    }
    private keyCb = null as any

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, canvasContainer: HTMLDivElement, generateGrid: any) {
        this.canvasContainer = canvasContainer;
        this.canvas = canvas;
        this.ctx = ctx;
        this.generateGrid = generateGrid;


        this.generateScenes();

        this.keyCb = (e: KeyboardEvent, type?:'right'|'left'|'up'|'down') => {
            e = e || window.event;
            let valid = false;

            if (e.keyCode == 38 || type === 'up') {
                valid = true;
                // up arrow
                const move = this.player.action.up();
                if (!this.validate.move()) return move.reject();
                move.accept()
                this.pos.frameY -= 20
                const prev = this.stack.vertical.length != 0 ? this.stack.vertical[this.stack.vertical.length - 1] : null;
                if (prev && this.player.getStyle().position.y <= prev.pos) {
                    this.pos.frameY += prev.dist;
                    this.canvasContainer.scrollTop = 0;
                    this.canvasContainer.scrollTop = prev.scrollPos;
                    this.stack.vertical.pop()

                }
            } else if (e.keyCode == 40 || type === 'down') {
                valid = true;
                // down arrow
                const move = this.player.action.down();
                if (!this.validate.move()) return move.reject();
                move.accept()
                this.pos.frameY += 20
                if ((this.pos.frameY + 100) >= windowUtils.y) {
                    let dist = (canvasContainer.clientHeight / 2);
                    let total = this.canvasContainer.scrollTop + dist;

                    const obj = {
                        pos: this.player.getStyle().position.y,
                        scrollPos: this.canvasContainer.scrollTop,
                        dist,
                    };


                    if (canvasContainer.scrollHeight < total) {
                        total = canvasContainer.scrollHeight
                    }
                    dist = total - this.canvasContainer.scrollHeight;

                    this.pos.frameY -= dist;
                    this.stack.vertical.push(obj);
                    this.canvasContainer.scrollTop = total;
                }
            } else if (e.keyCode == 37 || type === 'left') {
                valid = true;
                // left arrow
                const move = this.player.action.left();
                if (!this.validate.move()) return move.reject();
                move.accept()
                this.pos.frameX -= 20
                const prev = this.stack.horizontal.length != 0 ? this.stack.horizontal[this.stack.horizontal.length - 1] : null;
                if (prev && this.player.getStyle().position.x <= prev.pos) {
                    this.pos.frameX += prev.dist;
                    this.canvasContainer.scrollLeft = 0;
                    this.canvasContainer.scrollLeft = prev.scrollPos;
                    this.stack.horizontal.pop()

                }
            } else if (e.keyCode == 39 || type === 'right') {
                valid = true;
                // right arrow
                const move = this.player.action.right();
                if (!this.validate.move()) return move.reject();
                move.accept()
                this.pos.frameX += 20
                if ((this.pos.frameX + 100) >= windowUtils.x) {
                    let dist = (canvasContainer.clientWidth / 2);
                    let total = this.canvasContainer.scrollLeft + dist;

                    const obj = {
                        pos: this.player.getStyle().position.x,
                        scrollPos: this.canvasContainer.scrollLeft,
                        dist,
                    };


                    if (canvasContainer.scrollWidth < total) {
                        total = canvasContainer.scrollWidth
                    }
                    dist = total - this.canvasContainer.scrollLeft;

                    this.pos.frameX -= dist;
                    this.stack.horizontal.push(obj);
                    this.canvasContainer.scrollLeft = total;
                }
            }

            if (valid) {
                this.ctx.clearRect(0, 0, canvas.width, canvas.height)
                this.generateGrid()
                this.generateScenes()
            }

        };

        globalKeyboardEvent.cb = this.keyCb;

        document.addEventListener('keydown', this.keyCb, true)

    }

    public destroy() {
        document.removeEventListener('keydown', this.keyCb, true)

    }

    private generateScenes() {
        if (this.scene.length) {
            this.scene.forEach(row => {
                row.forEach(el => {
                    el?.draw.all();
                })
            })
            return;
        }

        this.player = new Circle(this.ctx, this.pos.x + (-1.1 * 5), this.pos.y + (-1.1 * 5));
        this.pos.frameX = this.player.getStyle().position.x;
        this.pos.frameY = this.player.getStyle().position.y;
        this.scene = [
            [this.player],
            [new BWall(this.ctx, this.pos.x, this.pos.y + (0.0 * 5)), new HWall(this.ctx, this.pos.x + (0.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (1.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (2.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (3.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (4.2 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (5.2 * 5), this.pos.y + (0 * 5)), new BWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (0 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (0.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (0.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (1.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (1.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (2.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (2.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (3.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (3.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (4.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (4.2 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (5.2 * 5)), null, null, null, null, new VWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (5.2 * 5))],
            [new BWall(this.ctx, this.pos.x, this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (0.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (1.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (2.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (3.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (4.2 * 5), this.pos.y + (6.2 * 5)), new HWall(this.ctx, this.pos.x + (5.2 * 5), this.pos.y + (6.2 * 5)), new BWall(this.ctx, this.pos.x + (6.2 * 5), this.pos.y + (6.2 * 5))],

            /**
             * items
             *
             * */

            /**
             * flower
             *
             * */
            [
                new Flower(this.ctx, this.pos.x + (1.0 * 5), this.pos.y + (3.2 * 5)),
                new Flower(this.ctx, this.pos.x + (2.0 * 5), this.pos.y + (3.2 * 5)),

            ]
        ];
    }

    private validate = {
        direction: {
            left: (pointX: number, pointY: number, boundary: number[][][]) => {
                if (pointX > boundary[0][0][0] && pointX < boundary[0][1][0] && pointY > boundary[0][1][1] && pointY > boundary[1][1][1]) return false

                return true;

            }


        },

        move: () => {

            const playerBoundary = this.player.getBoundaries();

            for (let row of this.scene) {
                for (let el of row) {
                    if (!el) continue;
                    const boundary = el.getBoundaries();

                    //  if(!leftCheck(playerBoundary[0][0][0],playerBoundary[0][0][1],boundary)) return false

                }
            }
            return true
        }


    }
}