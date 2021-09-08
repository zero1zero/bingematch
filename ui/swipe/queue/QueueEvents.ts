import {show} from "../model/compiled";

export enum SyncStatus {
    UnSynced, Syncing, Synced, DeSynced
}

//throwing in bad in case we want to report
export enum Sentiment {
    Unknown, Like, Dislike,
}

export interface Item {
    show: show.IDetail
    sentiment: Sentiment
    onscreen: boolean
    synced: SyncStatus
}
