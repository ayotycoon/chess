export default class Subscription<T> {
    fns:Function[] = [];
    constructor() {
    }

    emit = (value:T) => {
        this.fns.forEach(fn => {
            fn(value)
        })

    }
    subscribe = (fn: Function) => {
        this.fns.push(fn)
    }
}