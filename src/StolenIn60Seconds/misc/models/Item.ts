export default class Item{
    protected style = {
        position: {
            x: 0,
            y: 0
        },
        dimensions: {
            width: 20,
            height: 100
        },
        color: 'black'
    }
    protected boundaries = [
        [0,0],[0,0],
        [0,0],[0,0],
    ]

    public  getBoundaries(){
        return this.boundaries;
    }
    public isWithinBoundary (grid:number[][]){

        return false;

    }
    public  calculateBoundaries(){
        this.boundaries[0][0] = this.style.position.x;
        this.boundaries[0][1] = this.style.position.y;

        this.boundaries[1][0] = this.style.position.x + this.style.dimensions.width;
        this.boundaries[1][1] = this.style.position.y;

        this.boundaries[2][0] = this.style.position.x;
        this.boundaries[2][1] = this.style.position.y + this.style.dimensions.height;

        this.boundaries[3][0] = this.style.position.x + this.style.dimensions.width;
        this.boundaries[3][1] = this.style.position.y + this.style.dimensions.height;

    }
}