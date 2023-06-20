import {HWall, VWall} from "../models/Wall";
import Item from "../models/Item";
import {keyboardObs, moveFrame} from "../utils";
import Circle from "../models/Circle";
import {Flower, HCar} from "../models/ImageItem";
import {HGate, VGate} from "../models/Gate";
import {Direction} from "../types";

const MOVEMENT_SPEED = 3;


export default class Scene1 {
    pos = {
        x: 7,
        y: 10
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
        const _moveFrame = moveFrame(
            this.player.getStyle().position.x,
            this.player.getStyle().position.y,
            this.canvasContainer, this.player, this.stack);

        this.keyCb = (e: KeyboardEvent, direction?: Direction) => {
            e = e || window.event;
            let valid = false;

            if (e.keyCode == 38 || direction === Direction.up) {
                direction = Direction.up
                valid = true;
                // up arrow
                const move = this.player.action.up(MOVEMENT_SPEED);
                if (!this.validate.move(direction, move)) return move.reject();
                move.accept()
                _moveFrame(direction)
                // this.pos.frameY -= 20
                // const prev = this.stack.vertical.length != 0 ? this.stack.vertical[this.stack.vertical.length - 1] : null;
                // if (prev && this.player.getStyle().position.y <= prev.pos) {
                //     this.pos.frameY += prev.dist;
                //     this.canvasContainer.scrollTop = 0;
                //     this.canvasContainer.scrollTop = prev.scrollPos;
                //     this.stack.vertical.pop()
                //
                // }
            } else if (e.keyCode == 40 || direction === Direction.down) {
                direction = Direction.down
                valid = true;
                // down arrow
                const move = this.player.action.down(MOVEMENT_SPEED);
                if (!this.validate.move(direction, move)) return move.reject();
                move.accept()
                _moveFrame(direction)

            } else if (e.keyCode == 37 || direction === Direction.left) {
                direction = Direction.left
                valid = true;
                // left arrow
                const move = this.player.action.left(MOVEMENT_SPEED);
                if (!this.validate.move(direction, move)) return move.reject();
                move.accept()
                _moveFrame(direction)
                // this.pos.frameX -= 20
                // const prev = this.stack.horizontal.length != 0 ? this.stack.horizontal[this.stack.horizontal.length - 1] : null;
                // if (prev && this.player.getStyle().position.x <= prev.pos) {
                //     this.pos.frameX += prev.dist;
                //     this.canvasContainer.scrollLeft = 0;
                //     this.canvasContainer.scrollLeft = prev.scrollPos;
                //     this.stack.horizontal.pop()
                //
                // }
            } else if (e.keyCode == 39 || direction === Direction.right) {
                direction = Direction.right
                valid = true;
                // right arrow
                const move = this.player.action.right(MOVEMENT_SPEED);
                if (!this.validate.move(direction, move)) return move.reject();
                move.accept()
                _moveFrame(direction)
                // this.pos.frameX += 20
                // if ((this.pos.frameX +50) >= windowUtils.x/2) {
                //     let dist = (canvasContainer.clientWidth / 2);
                //     let total = this.canvasContainer.scrollLeft + dist;
                //
                //     const obj = {
                //         pos: this.player.getStyle().position.x,
                //         scrollPos: this.canvasContainer.scrollLeft,
                //         dist,
                //     };
                //
                //
                //     if (canvasContainer.scrollWidth < total) {
                //         total = canvasContainer.scrollWidth
                //     }
                //     dist = total - this.canvasContainer.scrollLeft;
                //
                //     this.pos.frameX -= dist;
                //     this.stack.horizontal.push(obj);
                //     this.canvasContainer.scrollLeft = total;
                // }
            }

            if (valid) {
                this.ctx.clearRect(0, 0, canvas.width, canvas.height)
                this.generateGrid()
                this.generateScenes()
            }

        };

        keyboardObs.subscribe((val) => {
            this.keyCb(null, val)
        })

        document.addEventListener('keydown', this.keyCb, true)

    }

    public destroy() {
        document.removeEventListener('keydown', this.keyCb, true)

    }

    private generateScenes() {
        if (this.scene.length) {
            this.scene.forEach(row => {
                row.forEach(el => {
                    if (!el) return;
                    el.draw.all();
                })
            })
            return;
        }

        this.player = new Circle(this.ctx, this.pos.x + (-0.8 * 5), this.pos.y + (-1.4 * 5));
        const car = new HCar(this.ctx, this.pos.x + (-1.2 * 5), this.pos.y + (-1.6 * 5))
        this.scene = [
            [this.player],
            [car],

            [new HWall(this.ctx, this.pos.x, this.pos.y + (0.0 * 5), undefined, {
                dimensions: {
                    height: 140,
                    width: 20
                }
            }), new HGate(this.ctx, this.pos.x + (1.4 * 5), this.pos.y + (0 * 5)), new HWall(this.ctx, this.pos.x + (2.2 * 5), this.pos.y + (0 * 5), undefined, {
                dimensions: {
                    height: 500,
                    width: 20
                }
            })],

            [new VWall(this.ctx, this.pos.x, this.pos.y + (0.2 * 5), undefined, {
                dimensions: {
                    width: 20,
                    height: 360
                }
            }), new VWall(this.ctx, this.pos.x + (7.0 * 5), this.pos.y + (0.2 * 5), undefined, {
                dimensions: {
                    width: 20,
                    height: 740
                }
            })],
            [new VGate(this.ctx, this.pos.x, this.pos.y + (3.8 * 5))],
            [new VWall(this.ctx, this.pos.x, this.pos.y + (4.6 * 5), undefined, {
                dimensions: {
                    height: 300,
                    width: 20
                }
            })],

            [new HWall(this.ctx, this.pos.x + (0.0 * 5), this.pos.y + (7.6 * 5), undefined, {
                dimensions: {
                    height: 720,
                    width: 20
                }
            }),],

            /**
             * items
             *
             * */

            /**
             * flower
             *
             * */
            [
                new Flower(this.ctx, this.pos.x + (1.2 * 5), this.pos.y + (3.6 * 5)),
                new Flower(this.ctx, this.pos.x + (2.4 * 5), this.pos.y + (3.6 * 5)),

            ]
        ];


    }

    private validate = {
        move: (direction: Direction, move: {
            prevPosition: { x: number, y: number },
            reject: () => void,
            accept: () => void
        }) => {
            const isVertical = direction == Direction.up || direction == Direction.down;
            const isHorizontal = !isVertical;
            const increments = [1, 2, 3, 4, 5, 6].map((i,) => ((isVertical ? move.prevPosition.y : move.prevPosition.x) + (((direction == Direction.up || direction === Direction.left) ? -i : i) * 10)));

            const playerPosition = this.player.getStyle().position;

            for (let row of this.scene) {
                for (let el of row) {
                    if (!el || el instanceof Circle || el instanceof HCar) continue;
                    const boundary = el.getBoundaries();
                    for (let pos of increments) {
                        if (
                            (isHorizontal ? pos : playerPosition.x) >= boundary[0][0][0]
                            && (isHorizontal ? pos : playerPosition.x) <= boundary[0][1][0]
                            && (isVertical ? pos : playerPosition.y) >= boundary[0][0][1]
                            && (isVertical ? pos : playerPosition.y) <= boundary[1][0][1]

                        ) {
                            el.debug.all()
                            console.log(el)
                            return false;
                        }


                    }

                }
            }
            return true
        }


    }
}