// package: user
// file: user.proto

import * as jspb from "google-protobuf";

export class Detail extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

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
    id: string,
    email: string,
  }
}

export class Register extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Register.AsObject;
  static toObject(includeInstance: boolean, msg: Register): Register.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Register, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Register;
  static deserializeBinaryFromReader(message: Register, reader: jspb.BinaryReader): Register;
}

export namespace Register {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class Update extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Update.AsObject;
  static toObject(includeInstance: boolean, msg: Update): Update.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Update, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Update;
  static deserializeBinaryFromReader(message: Update, reader: jspb.BinaryReader): Update;
}

export namespace Update {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class Login extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Login.AsObject;
  static toObject(includeInstance: boolean, msg: Login): Login.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Login, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Login;
  static deserializeBinaryFromReader(message: Login, reader: jspb.BinaryReader): Login;
}

export namespace Login {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class DetailAndToken extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  hasDetail(): boolean;
  clearDetail(): void;
  getDetail(): Detail | undefined;
  setDetail(value?: Detail): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DetailAndToken.AsObject;
  static toObject(includeInstance: boolean, msg: DetailAndToken): DetailAndToken.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DetailAndToken, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DetailAndToken;
  static deserializeBinaryFromReader(message: DetailAndToken, reader: jspb.BinaryReader): DetailAndToken;
}

export namespace DetailAndToken {
  export type AsObject = {
    token: string,
    detail?: Detail.AsObject,
  }
}

