import {EventName, Item} from "./Event";

export const getItem = (items : Item[], id : string) : Item => {
    return items
        .filter(item => item.data.id == id)[0]
}

export const updateInPlace = (items : Item[], item : Item) : Item[] => {
    items[headIndex(items, item.data.id)] = Object.assign({}, item)

    return items
}

export const getPrevious = (items : Item[], head : string) : Item => {
    if (!head) {
        return items[0]
    }
    const idx = Math.max(headIndex(items, head) - 1, 0)

    return items[idx]
}

export const headIndex = (items : Item[], head : string | undefined) : number => {
    if (!head) {
        return 0
    }
    return items
        .findIndex(item => item.data.id == head)
}

export const previousHead = (items : Item[], head : string = undefined) : string => {
    return getPrevious(items, head).data.id
}

export const getHead = (items : Item[], head : string) : Item => {
    return items[headIndex(items, head)]
}

export const next = (items : Item[], head : string = undefined) : Item => {
    if (!head) {
        return items[0]
    }
    return items[headIndex(items, head) + 1]
}

export const nextHead = (items : Item[], head : string = undefined) : string => {
    return next(items, head).data.id
}

export const afterHeadInclusive = (items : Item[], head : string) : Item[] => {
    return items.slice(headIndex(items, head))
}

export const countAfterHeadInclusive = (items : Item[], head : string) : number => {
    return items.length - headIndex(items, head)
}

export const beforeHeadExclusive = (items : Item[], head : string) : Item[] => {
    if (!head) {
        return []
    }
    return items.slice(0, headIndex(items, head))
}
