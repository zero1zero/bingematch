// package: queue
// file: queue.proto

import * as jspb from "google-protobuf";
import * as movie_pb from "./movie_pb";

export class AllItems extends jspb.Message {
  clearItemsList(): void;
  getItemsList(): Array<Item>;
  setItemsList(value: Array<Item>): void;
  addItems(value?: Item, index?: number): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AllItems.AsObject;
  static toObject(includeInstance: boolean, msg: AllItems): AllItems.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AllItems, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AllItems;
  static deserializeBinaryFromReader(message: AllItems, reader: jspb.BinaryReader): AllItems;
}

export namespace AllItems {
  export type AsObject = {
    itemsList: Array<Item.AsObject>,
  }
}

export class Item extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTmdbid(): number;
  setTmdbid(value: number): void;

  getState(): Item.StateMap[keyof Item.StateMap];
  setState(value: Item.StateMap[keyof Item.StateMap]): void;

  hasMovie(): boolean;
  clearMovie(): void;
  getMovie(): movie_pb.Detail | undefined;
  setMovie(value?: movie_pb.Detail): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Item.AsObject;
  static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Item;
  static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
}

export namespace Item {
  export type AsObject = {
    id: string,
    tmdbid: number,
    state: Item.StateMap[keyof Item.StateMap],
    movie?: movie_pb.Detail.AsObject,
  }

  export interface StateMap {
    QUEUED: 0;
    LIKE: 1;
    DISLIKE: 2;
    LOVE: 3;
    HATE: 4;
    SKIPPED: 5;
  }

  export const State: StateMap;
}

