export default class Subscription<T> {
    fns:Set<Function> = new Set<Function>();
    constructor() {
    }

    emit = (value:T) => {
        this.fns.forEach(fn => {
            fn(value)
        })

    }
    subscribe = (fn: Function) => {
        this.fns.add(fn)
        return {
            unsubscribe: () => {
                this.fns.delete(fn);
            }
        }
    }
}