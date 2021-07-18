import {queue} from "../model/compiled";

export enum InteractionName {
    SwipeLike,
    SwipeDislike,
    Report,
    ButtonLikePress,
    ButtonDislikePress,
    ButtonBackPress,
}

//throwing in bad in case we want to report
export enum Sentiment {
    Unknown, Like, Dislike, Report
}

export interface StateChange {
    interaction?: { name: InteractionName, item: Item }

    addToCache?: queue.QueuedItem[]
    addToCardItems?: Item[]

    regressHead?: string //from
    advanceHead?: string //to

    setOnscreen?: string
    setOffscreen?: string

    setSync?: { sync: SyncStatus, id: string }
}

export enum SyncStatus {
    UnSynced, Syncing, Synced
}

export interface Item {
    data: queue.QueuedItem
    sentiment: Sentiment
    onscreen: boolean
    synced: SyncStatus
}
