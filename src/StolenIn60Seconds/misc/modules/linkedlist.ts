interface Node<T> {
    val: T,
    next?: Node<T>,
    prev?: Node<T>,
}

export const node = <T, >(val: T, next?: Node<T>, prev?: Node<T>): Node<T> => {

    return {
        val,
        next,
        prev
    }

}

export const LinkedList = <T, >() => {
    const globalRef = node(0 as any)

    let curr = globalRef.next

    return {
        head: () => globalRef.next,
        tail: () => curr,
        setCurr: (c: Node<T>) => curr = c,
        curr,
        values: () => {
            const arr: T[] = [];
            let _x = globalRef.next;
            while (_x != undefined) {
                arr.push(_x.val)
                _x = _x.next;
            }

            return arr;
        },
        add: (n: Node<T>) => {
            if (!curr) {
                globalRef.next = n;
                curr = globalRef.next
                return;
            }

            curr.next = n;
            n.prev = curr;
            curr = curr.next;

        }

    }

}