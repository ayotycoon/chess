import {HWall, VWall} from "../models/Wall";
import Item, {StateActionItem} from "../models/Item";
import {keyboardObs, moveFrame, stageObs} from "../utils";
import Circle from "../models/Circle";
import {Flower, HCar} from "../models/ImageItem";
import {Gate, HGate, VGate} from "../models/Gate";
import {Direction} from "../types";
import {Hammer, SmallBomb} from "../models/Tool";
import {getStageProps} from "../../../misc/StateProvider";

const MOVEMENT_SPEED = 3;


export default class Scene1 {
    pos = {
        x: 7,
        y: 10
    }
    scene: (Item | null)[][] = [];
    private currentSecond = 0;
    private readonly canvasContainer: HTMLDivElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public player: Circle = null as any;
    public generateGrid: any = null as any;
    private stack = {
        horizontal: [] as any [],
        vertical: [] as any [],
    }
    private readonly keyCb = null as any


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, canvasContainer: HTMLDivElement, generateGrid: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void) {
        this.canvasContainer = canvasContainer;
        this.canvas = canvas;
        this.ctx = ctx;
        this.generateGrid = generateGrid;


        this.render();

        this.keyCb = this.getKeyCb()

        keyboardObs.subscribe((val) => {
            this.keyCb(null, val)
        })

        document.addEventListener('keydown', this.keyCb, true)


    }

    public destroy() {
        document.removeEventListener('keydown', this.keyCb, true)

    }

    private generateScenes() {
        if (this.scene.length == 0) {
            this.player = new Circle(this.ctx, this.pos.x + (-0.8 * 5), this.pos.y + (-1.4 * 5));
            const car = new HCar(this.ctx, this.pos.x + (-1.2 * 5), this.pos.y + (-1.6 * 5))
            this.scene = [
                [this.player],
                [car],

                [new HWall(this.ctx, this.pos.x, this.pos.y + (0.0 * 5), undefined, {
                    dimensions: {
                        height: 120,
                        width: 20
                    }
                }), new HGate(this.ctx, this.pos.x + (1.2 * 5), this.pos.y + (0 * 5)),
                    new HWall(this.ctx, this.pos.x + (2.0 * 5), this.pos.y + (0 * 5), undefined, {
                    dimensions: {
                        height: 540,
                        width: 20
                    },

                })],

                [new VWall(this.ctx, this.pos.x, this.pos.y + (0.2 * 5), undefined, {
                    dimensions: {
                        width: 20,
                        height: 340
                    },

                }), new VWall(this.ctx, this.pos.x + (7.2 * 5), this.pos.y + (0.2 * 5), undefined, {
                    dimensions: {
                        width: 20,
                        height: 760
                    }
                })],
                [new VGate(this.ctx, this.pos.x, this.pos.y + (3.6 * 5))],
                [new VWall(this.ctx, this.pos.x, this.pos.y + (4.4 * 5), undefined, {
                    dimensions: {
                        height: 340,
                        width: 20
                    }
                })],

                [new HWall(this.ctx, this.pos.x + (0.0 * 5), this.pos.y + (7.8 * 5), undefined, {
                    dimensions: {
                        height: 740,
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

        this.scene.forEach(row => {
            row.forEach(el => {
                if (!el) return;
                el.draw.all();
            })
        })
    }

    private validateMove = async (direction: Direction, move: {
        prevPosition: { x: number, y: number },
        reject: () => void,
        accept: () => void
    }) => {


        const isVertical = direction == Direction.up || direction == Direction.down;
        const isHorizontal = !isVertical;
        const increments = [1, 2, 3, 4, 5, 6].map((i,) => ((isVertical ? move.prevPosition.y : move.prevPosition.x) + (((direction == Direction.up || direction === Direction.left) ? -i : i) * 10)));

        const playerPosition = this.player.getState().position;

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

                        return await this.itemInteraction(el)
                    }

                }

            }
        }
        return 1


    }

    private itemInteraction(el: Item): Promise<number> {
        return new Promise((resolve) => {
            /**
             * Check if item hit is interactable
             */
            const isStateActionItem = el instanceof StateActionItem;
            el.debug.all()
            if (!isStateActionItem) return resolve(0);
            if (el instanceof Gate) {
                if (el.getState().action?.opened) return resolve(1);

                stageObs.emit({
                    toolsPrompt: {
                        title: "Tools",
                        data: [new Hammer(), new SmallBomb()],
                        cb: (tool) => {
                            stageObs.emit({toolsPrompt: undefined})
                            if (!tool) return resolve(0);
                            // validate
                            el.setActionState({opened: true})
                            el.timeElapsedAction(this.currentSecond + tool.getElapsed())
                            this.render()

                            return resolve(tool.getElapsed())
                        }
                    }
                })


            }

        })
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    private render() {
        this.clearCanvas()
        this.generateGrid()
        this.generateScenes()
        stageObs.emit({time: this.player.getPlayerMoves()})
    }

    private undo() {
        if (this.currentSecond == 0) return;
        this.currentSecond -= this.player.getLastActionSecond();
        this.scene.forEach(row => {
            row.forEach(el => {
                if (!el || !(el instanceof StateActionItem)) return;

                el.resetToTime(this.currentSecond)
            })
        })

        this.render();
        return;
    }

    private getKeyCb = () => {
        const _moveFrame = moveFrame(
            this.player.getState().position.x,
            this.player.getState().position.y,
            this.canvasContainer, this.player, this.stack);


        return async (e: KeyboardEvent, direction?: Direction) => {
        e = e || window.event;
        if ((e && e.keyCode == 90 && e.ctrlKey) || direction === Direction.undo) return this.undo()
        let valid = false;
        let move: { prevPosition: { x: number, y: number }, reject: () => void, accept: () => void } = null as any;

        if (e.keyCode == 38 || direction === Direction.up) {
            direction = Direction.up
            valid = true;
            // up arrow
            if(!getStageProps().screenGrabbed)
            move = this.player.action.up(MOVEMENT_SPEED);

        } else if (e.keyCode == 40 || direction === Direction.down) {
            direction = Direction.down
            valid = true;
            // down arrow
            if(!getStageProps().screenGrabbed)
            move = this.player.action.down(MOVEMENT_SPEED);

        } else if (e.keyCode == 37 || direction === Direction.left) {
            direction = Direction.left
            valid = true;
            // left arrow
            if(!getStageProps().screenGrabbed)
            move = this.player.action.left(MOVEMENT_SPEED);
        } else if (e.keyCode == 39 || direction === Direction.right) {
            direction = Direction.right
            valid = true;
            // right arrow
            if(!getStageProps().screenGrabbed)
            move = this.player.action.right(MOVEMENT_SPEED);

        }

        if (valid && direction != undefined) {
            if(getStageProps().screenGrabbed) return _moveFrame(direction, true);
            const elapsed = await this.validateMove(direction, move);
            if (elapsed === 0) return move.reject();
            if (elapsed != 1) {
                move.reject()
            } else {
                _moveFrame(direction)
            }
            this.currentSecond += elapsed;
            this.player.timeElapsedAction(this.currentSecond)
            this.render()
        }
        }

    };
}