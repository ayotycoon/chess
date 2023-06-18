import Scene1 from "./scenes/Scene1";

function drawLines(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, horizontal = true) {
    const size = 20;
    let totalDrawn = 0;
    let group = 0;
    const boundary = (horizontal ? canvas.height : canvas.width);
    while (totalDrawn < boundary) {
        ctx.beginPath();
        if (horizontal) {
            ctx.moveTo(0, totalDrawn);
            ctx.lineTo(canvas.width, totalDrawn);
        } else {
            ctx.moveTo(totalDrawn, 0);
            ctx.lineTo(totalDrawn, canvas.height);
        }

        if (totalDrawn == 0 || group == 3) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#c2a667";
            //ctx.strokeStyle = "red";
            group = 0;
        } else {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#c1a46a"
        }
        ctx.stroke();
        totalDrawn += size;
        group++;
    }


}


export const draw = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 1000;
    canvas.height = 1000;

    // Add behind elements.
    ctx.globalCompositeOperation = 'destination-under'
    // Now draw!
    ctx.fillStyle = "#e3ca8c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawLines(canvas, ctx, true)
    drawLines(canvas, ctx, false)

    new Scene1(ctx)

};



