import {queue} from "../model/compiled";

export enum SyncStatus {
    UnSynced, Syncing, Synced
}

//throwing in bad in case we want to report
export enum Sentiment {
    Unknown, Like, Dislike,
}

export interface Item {
    data: queue.IQueuedItem
    sentiment: Sentiment
    onscreen: boolean
    synced: SyncStatus
}
