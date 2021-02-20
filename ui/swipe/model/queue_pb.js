// source: queue.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var movie_pb = require('./movie_pb.js');
goog.object.extend(proto, movie_pb);
goog.exportSymbol('proto.queue.AllItems', null, global);
goog.exportSymbol('proto.queue.Item', null, global);
goog.exportSymbol('proto.queue.Item.State', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.queue.AllItems = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.queue.AllItems.repeatedFields_, null);
};
goog.inherits(proto.queue.AllItems, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.queue.AllItems.displayName = 'proto.queue.AllItems';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.queue.Item = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.queue.Item, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.queue.Item.displayName = 'proto.queue.Item';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.queue.AllItems.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.queue.AllItems.prototype.toObject = function(opt_includeInstance) {
  return proto.queue.AllItems.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.queue.AllItems} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.queue.AllItems.toObject = function(includeInstance, msg) {
  var f, obj = {
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.queue.Item.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.queue.AllItems}
 */
proto.queue.AllItems.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.queue.AllItems;
  return proto.queue.AllItems.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.queue.AllItems} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.queue.AllItems}
 */
proto.queue.AllItems.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.queue.Item;
      reader.readMessage(value,proto.queue.Item.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.queue.AllItems.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.queue.AllItems.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.queue.AllItems} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.queue.AllItems.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.queue.Item.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Item items = 1;
 * @return {!Array<!proto.queue.Item>}
 */
proto.queue.AllItems.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.queue.Item>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.queue.Item, 1));
};


/** @param {!Array<!proto.queue.Item>} value */
proto.queue.AllItems.prototype.setItemsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.queue.Item=} opt_value
 * @param {number=} opt_index
 * @return {!proto.queue.Item}
 */
proto.queue.AllItems.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.queue.Item, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.queue.AllItems.prototype.clearItemsList = function() {
  this.setItemsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.queue.Item.prototype.toObject = function(opt_includeInstance) {
  return proto.queue.Item.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.queue.Item} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.queue.Item.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    tmdbid: jspb.Message.getFieldWithDefault(msg, 2, 0),
    state: jspb.Message.getFieldWithDefault(msg, 3, 0),
    movie: (f = msg.getMovie()) && movie_pb.Detail.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.queue.Item}
 */
proto.queue.Item.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.queue.Item;
  return proto.queue.Item.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.queue.Item} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.queue.Item}
 */
proto.queue.Item.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTmdbid(value);
      break;
    case 3:
      var value = /** @type {!proto.queue.Item.State} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 4:
      var value = new movie_pb.Detail;
      reader.readMessage(value,movie_pb.Detail.deserializeBinaryFromReader);
      msg.setMovie(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.queue.Item.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.queue.Item.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.queue.Item} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.queue.Item.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTmdbid();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getMovie();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      movie_pb.Detail.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.queue.Item.State = {
  QUEUED: 0,
  LIKE: 1,
  DISLIKE: 2,
  LOVE: 3,
  HATE: 4,
  SKIPPED: 5
};

/**
 * optional string id = 1;
 * @return {string}
 */
proto.queue.Item.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.queue.Item.prototype.setId = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 tmdbid = 2;
 * @return {number}
 */
proto.queue.Item.prototype.getTmdbid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.queue.Item.prototype.setTmdbid = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional State state = 3;
 * @return {!proto.queue.Item.State}
 */
proto.queue.Item.prototype.getState = function() {
  return /** @type {!proto.queue.Item.State} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {!proto.queue.Item.State} value */
proto.queue.Item.prototype.setState = function(value) {
  jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional movie.Detail movie = 4;
 * @return {?proto.movie.Detail}
 */
proto.queue.Item.prototype.getMovie = function() {
  return /** @type{?proto.movie.Detail} */ (
    jspb.Message.getWrapperField(this, movie_pb.Detail, 4));
};


/** @param {?proto.movie.Detail|undefined} value */
proto.queue.Item.prototype.setMovie = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.queue.Item.prototype.clearMovie = function() {
  this.setMovie(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.queue.Item.prototype.hasMovie = function() {
  return jspb.Message.getField(this, 4) != null;
};


goog.object.extend(exports, proto.queue);
