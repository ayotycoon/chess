export class Tool{
    title: string;
    img: string;
    elapsed:number;
    constructor(title: string, img:string,elapsed:number) {
        this.title = title;
        this.img = img;
        this.elapsed = elapsed;

    }

    getElapsed() {
        return this.elapsed;
    }
}

export class Hammer extends Tool{
    constructor() {
        super("hammer",process.env.PUBLIC_URL + '/assets/hammer.avif',6);
    }
}

export class SmallBomb extends Tool{
    constructor() {
        super("small bomb",process.env.PUBLIC_URL + '/assets/small-bomb.jpg',6);
    }
}