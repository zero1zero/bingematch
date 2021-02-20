// package: movie
// file: movie.proto

import * as jspb from "google-protobuf";

export class Detail extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getOverview(): string;
  setOverview(value: string): void;

  clearGenresList(): void;
  getGenresList(): Array<Genre>;
  setGenresList(value: Array<Genre>): void;
  addGenres(value?: Genre, index?: number): Genre;

  getOriginallanguage(): string;
  setOriginallanguage(value: string): void;

  getOriginaltitle(): string;
  setOriginaltitle(value: string): void;

  getPosterpath(): string;
  setPosterpath(value: string): void;

  getBackdroppath(): string;
  setBackdroppath(value: string): void;

  hasVotes(): boolean;
  clearVotes(): void;
  getVotes(): Votes | undefined;
  setVotes(value?: Votes): void;

  getReleasedate(): string;
  setReleasedate(value: string): void;

  getPopularity(): number;
  setPopularity(value: number): void;

  getTagline(): string;
  setTagline(value: string): void;

  getImdbid(): string;
  setImdbid(value: string): void;

  getStatus(): Detail.StatusMap[keyof Detail.StatusMap];
  setStatus(value: Detail.StatusMap[keyof Detail.StatusMap]): void;

  clearSpokenlanguageList(): void;
  getSpokenlanguageList(): Array<string>;
  setSpokenlanguageList(value: Array<string>): void;
  addSpokenlanguage(value: string, index?: number): string;

  clearVideosList(): void;
  getVideosList(): Array<Video>;
  setVideosList(value: Array<Video>): void;
  addVideos(value?: Video, index?: number): Video;

  clearPostersList(): void;
  getPostersList(): Array<Image>;
  setPostersList(value: Array<Image>): void;
  addPosters(value?: Image, index?: number): Image;

  clearRecommendationsList(): void;
  getRecommendationsList(): Array<number>;
  setRecommendationsList(value: Array<number>): void;
  addRecommendations(value: number, index?: number): number;

  clearSimilarList(): void;
  getSimilarList(): Array<number>;
  setSimilarList(value: Array<number>): void;
  addSimilar(value: number, index?: number): number;

  clearWatchList(): void;
  getWatchList(): Array<Watch>;
  setWatchList(value: Array<Watch>): void;
  addWatch(value?: Watch, index?: number): Watch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Detail.AsObject;
  static toObject(includeInstance: boolean, msg: Detail): Detail.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Detail, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Detail;
  static deserializeBinaryFromReader(message: Detail, reader: jspb.BinaryReader): Detail;
}

export namespace Detail {
  export type AsObject = {
    id: number,
    title: string,
    overview: string,
    genresList: Array<Genre.AsObject>,
    originallanguage: string,
    originaltitle: string,
    posterpath: string,
    backdroppath: string,
    votes?: Votes.AsObject,
    releasedate: string,
    popularity: number,
    tagline: string,
    imdbid: string,
    status: Detail.StatusMap[keyof Detail.StatusMap],
    spokenlanguageList: Array<string>,
    videosList: Array<Video.AsObject>,
    postersList: Array<Image.AsObject>,
    recommendationsList: Array<number>,
    similarList: Array<number>,
    watchList: Array<Watch.AsObject>,
  }

  export interface StatusMap {
    RUMORED: 0;
    PLANNED: 1;
    INPRODUCTION: 2;
    POSTPRODUCTION: 3;
    RELEASED: 4;
    CANCELED: 5;
  }

  export const Status: StatusMap;
}

export class Genre extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Genre.AsObject;
  static toObject(includeInstance: boolean, msg: Genre): Genre.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Genre, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Genre;
  static deserializeBinaryFromReader(message: Genre, reader: jspb.BinaryReader): Genre;
}

export namespace Genre {
  export type AsObject = {
    id: number,
    name: string,
  }
}

export class Votes extends jspb.Message {
  getAverage(): number;
  setAverage(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Votes.AsObject;
  static toObject(includeInstance: boolean, msg: Votes): Votes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Votes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Votes;
  static deserializeBinaryFromReader(message: Votes, reader: jspb.BinaryReader): Votes;
}

export namespace Votes {
  export type AsObject = {
    average: number,
    count: number,
  }
}

export class Video extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getKey(): string;
  setKey(value: string): void;

  getName(): string;
  setName(value: string): void;

  getSite(): string;
  setSite(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getType(): Video.TypeMap[keyof Video.TypeMap];
  setType(value: Video.TypeMap[keyof Video.TypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Video.AsObject;
  static toObject(includeInstance: boolean, msg: Video): Video.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Video, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Video;
  static deserializeBinaryFromReader(message: Video, reader: jspb.BinaryReader): Video;
}

export namespace Video {
  export type AsObject = {
    id: string,
    language: string,
    country: string,
    key: string,
    name: string,
    site: string,
    size: number,
    type: Video.TypeMap[keyof Video.TypeMap],
  }

  export interface TypeMap {
    TRAILER: 0;
    TEASER: 1;
    CLIP: 2;
    FEATURETTE: 3;
    BEHINDTHESCENES: 4;
    BLOOPERS: 5;
  }

  export const Type: TypeMap;
}

export class Image extends jspb.Message {
  getFilepath(): string;
  setFilepath(value: string): void;

  getAspectratio(): number;
  setAspectratio(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  getWidth(): number;
  setWidth(value: number): void;

  hasVotes(): boolean;
  clearVotes(): void;
  getVotes(): Votes | undefined;
  setVotes(value?: Votes): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Image.AsObject;
  static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Image;
  static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
  export type AsObject = {
    filepath: string,
    aspectratio: number,
    height: number,
    width: number,
    votes?: Votes.AsObject,
    language: string,
  }
}

export class Watch extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): void;

  getLink(): string;
  setLink(value: string): void;

  clearRentList(): void;
  getRentList(): Array<Watch.Provider>;
  setRentList(value: Array<Watch.Provider>): void;
  addRent(value?: Watch.Provider, index?: number): Watch.Provider;

  clearBuyList(): void;
  getBuyList(): Array<Watch.Provider>;
  setBuyList(value: Array<Watch.Provider>): void;
  addBuy(value?: Watch.Provider, index?: number): Watch.Provider;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Watch.AsObject;
  static toObject(includeInstance: boolean, msg: Watch): Watch.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Watch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Watch;
  static deserializeBinaryFromReader(message: Watch, reader: jspb.BinaryReader): Watch;
}

export namespace Watch {
  export type AsObject = {
    language: string,
    link: string,
    rentList: Array<Watch.Provider.AsObject>,
    buyList: Array<Watch.Provider.AsObject>,
  }

  export class Provider extends jspb.Message {
    getId(): number;
    setId(value: number): void;

    getPriority(): number;
    setPriority(value: number): void;

    getLogopath(): string;
    setLogopath(value: string): void;

    getName(): string;
    setName(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Provider.AsObject;
    static toObject(includeInstance: boolean, msg: Provider): Provider.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Provider, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Provider;
    static deserializeBinaryFromReader(message: Provider, reader: jspb.BinaryReader): Provider;
  }

  export namespace Provider {
    export type AsObject = {
      id: number,
      priority: number,
      logopath: string,
      name: string,
    }
  }
}

