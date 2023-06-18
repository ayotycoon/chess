export function gridToPosition(gridX: number, gridY: number) {
    return {x:gridX * 20,y: gridY * 20};
}

export function clear(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}