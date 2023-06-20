import {Direction} from "../types";
import Subscription from "./Subscription";
import Circle from "../models/Circle";

export function gridToPosition(gridX: number, gridY: number) {
    return {x: gridX * 20, y: gridY * 20};
}

export function positionToGrid(x: number, y: number) {
    return {x: x / 20, y: y / 20};
}

export function clear(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


export function moveFrame(frameX: number, frameY: number, canvasContainer: HTMLDivElement, player: Circle, stack: {
    horizontal: any[],
    vertical: any[]
}) {
    const pos = {
        frameX,
        frameY,
    }

    return (direction: Direction) => {
        const movemtntPixel = 60;
        if (direction == Direction.up) pos.frameY -= movemtntPixel
        else if (direction == Direction.down) pos.frameY += movemtntPixel
        else if (direction == Direction.right) pos.frameX += movemtntPixel
        else if (direction == Direction.left) pos.frameX -= movemtntPixel

        let distWidth = canvasContainer.clientWidth / 2;
        let distHeight = canvasContainer.clientHeight / 2;

        let previousInStack: any = null;
        if(direction === Direction.up && stack.vertical.length) previousInStack = stack.vertical[stack.vertical.length-1];
        if(direction === Direction.left && stack.horizontal.length) previousInStack = stack.horizontal[stack.horizontal.length-1];

        if (direction == Direction.down && pos.frameY >= distHeight) {
            stack.vertical.push({
                frame: pos.frameY,
                scroll: canvasContainer.scrollTop
            })
            let total = canvasContainer.scrollTop + distHeight;
            if (total > canvasContainer.scrollHeight) {
                total = canvasContainer.scrollHeight
                distHeight = canvasContainer.scrollHeight - canvasContainer.scrollTop
            }
            canvasContainer.scrollTop = total;
            pos.frameY -= distHeight

        }

        if(direction == Direction.up){
            if(!previousInStack)return;
            console.log(previousInStack)
            if(pos.frameY <= previousInStack.frame ){
                stack.vertical.pop();
                canvasContainer.scrollTop = previousInStack.scroll;
                pos.frameY = previousInStack.frame;

            }
        }

        if (direction == Direction.right && pos.frameX >= distWidth) {
            stack.horizontal.push({
                frame: pos.frameX,
                scroll: canvasContainer.scrollLeft
            })
            let total = canvasContainer.scrollLeft + distWidth;
            if (total > canvasContainer.scrollWidth) {
                total = canvasContainer.scrollWidth
                distWidth = canvasContainer.scrollWidth - canvasContainer.scrollLeft
            }
            canvasContainer.scrollLeft = total;
            pos.frameX -= distWidth

        }


        if(direction == Direction.left){
            if(!previousInStack)return;
            console.log(previousInStack)
            if(pos.frameX <= previousInStack.frame ){
                stack.horizontal.pop();
                canvasContainer.scrollLeft = previousInStack.scroll;
                pos.frameX = previousInStack.frame;

            }
        }

    }
}


export const keyboardObs = new Subscription()
export const stageObs = new Subscription<{ time?: number }>();
