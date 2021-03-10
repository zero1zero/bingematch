import {queue} from "../model/compiled";

export enum InteractionName {
    SwipeLike,
    SwipeDislike,
    SwipeLove,
    SwipeHate,
    ButtonLikePress,
    ButtonDislikePress,
    ButtonBackPress,
}

//throwing in bad in case we want to report
export enum Sentiment {
    Unknown, Like, Dislike, Love, Hate, Report
}

export interface StateChange {
    interaction?: { name: InteractionName, item: Item }

    addToCache?: queue.IItem[]
    addToCardItems?: Item[]

    regressHead?: string //from
    advanceHead?: string //to

    setOnscreen?: string
    setOffscreen?: string

    setSync?: { sync: SyncStatus, id: string}
}

export enum SyncStatus {
    UnSynced, Syncing, Synced
}
export interface Item {
    data: queue.IItem
    sentiment: Sentiment
    onscreen: boolean
    synced: SyncStatus
}
