/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const queue = $root.queue = (() => {

    /**
     * Namespace queue.
     * @exports queue
     * @namespace
     */
    const queue = {};

    queue.QueuedItems = (function() {

        /**
         * Properties of a QueuedItems.
         * @memberof queue
         * @interface IQueuedItems
         * @property {Array.<queue.IQueuedItem>|null} [items] QueuedItems items
         */

        /**
         * Constructs a new QueuedItems.
         * @memberof queue
         * @classdesc Represents a QueuedItems.
         * @implements IQueuedItems
         * @constructor
         * @param {queue.IQueuedItems=} [properties] Properties to set
         */
        function QueuedItems(properties) {
            this.items = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QueuedItems items.
         * @member {Array.<queue.IQueuedItem>} items
         * @memberof queue.QueuedItems
         * @instance
         */
        QueuedItems.prototype.items = $util.emptyArray;

        /**
         * Creates a new QueuedItems instance using the specified properties.
         * @function create
         * @memberof queue.QueuedItems
         * @static
         * @param {queue.IQueuedItems=} [properties] Properties to set
         * @returns {queue.QueuedItems} QueuedItems instance
         */
        QueuedItems.create = function create(properties) {
            return new QueuedItems(properties);
        };

        /**
         * Encodes the specified QueuedItems message. Does not implicitly {@link queue.QueuedItems.verify|verify} messages.
         * @function encode
         * @memberof queue.QueuedItems
         * @static
         * @param {queue.IQueuedItems} message QueuedItems message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueuedItems.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.queue.QueuedItem.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified QueuedItems message, length delimited. Does not implicitly {@link queue.QueuedItems.verify|verify} messages.
         * @function encodeDelimited
         * @memberof queue.QueuedItems
         * @static
         * @param {queue.IQueuedItems} message QueuedItems message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueuedItems.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QueuedItems message from the specified reader or buffer.
         * @function decode
         * @memberof queue.QueuedItems
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {queue.QueuedItems} QueuedItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueuedItems.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.queue.QueuedItems();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.items && message.items.length))
                        message.items = [];
                    message.items.push($root.queue.QueuedItem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QueuedItems message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof queue.QueuedItems
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {queue.QueuedItems} QueuedItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueuedItems.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QueuedItems message.
         * @function verify
         * @memberof queue.QueuedItems
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QueuedItems.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.queue.QueuedItem.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a QueuedItems message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof queue.QueuedItems
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {queue.QueuedItems} QueuedItems
         */
        QueuedItems.fromObject = function fromObject(object) {
            if (object instanceof $root.queue.QueuedItems)
                return object;
            let message = new $root.queue.QueuedItems();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".queue.QueuedItems.items: array expected");
                message.items = [];
                for (let i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".queue.QueuedItems.items: object expected");
                    message.items[i] = $root.queue.QueuedItem.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a QueuedItems message. Also converts values to other types if specified.
         * @function toObject
         * @memberof queue.QueuedItems
         * @static
         * @param {queue.QueuedItems} message QueuedItems
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QueuedItems.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = [];
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.queue.QueuedItem.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this QueuedItems to JSON.
         * @function toJSON
         * @memberof queue.QueuedItems
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QueuedItems.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QueuedItems;
    })();

    queue.QueuedItem = (function() {

        /**
         * Properties of a QueuedItem.
         * @memberof queue
         * @interface IQueuedItem
         * @property {string|null} [id] QueuedItem id
         * @property {string|null} [user] QueuedItem user
         * @property {show.IThinDetail|null} [show] QueuedItem show
         */

        /**
         * Constructs a new QueuedItem.
         * @memberof queue
         * @classdesc Represents a QueuedItem.
         * @implements IQueuedItem
         * @constructor
         * @param {queue.IQueuedItem=} [properties] Properties to set
         */
        function QueuedItem(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QueuedItem id.
         * @member {string} id
         * @memberof queue.QueuedItem
         * @instance
         */
        QueuedItem.prototype.id = "";

        /**
         * QueuedItem user.
         * @member {string} user
         * @memberof queue.QueuedItem
         * @instance
         */
        QueuedItem.prototype.user = "";

        /**
         * QueuedItem show.
         * @member {show.IThinDetail|null|undefined} show
         * @memberof queue.QueuedItem
         * @instance
         */
        QueuedItem.prototype.show = null;

        /**
         * Creates a new QueuedItem instance using the specified properties.
         * @function create
         * @memberof queue.QueuedItem
         * @static
         * @param {queue.IQueuedItem=} [properties] Properties to set
         * @returns {queue.QueuedItem} QueuedItem instance
         */
        QueuedItem.create = function create(properties) {
            return new QueuedItem(properties);
        };

        /**
         * Encodes the specified QueuedItem message. Does not implicitly {@link queue.QueuedItem.verify|verify} messages.
         * @function encode
         * @memberof queue.QueuedItem
         * @static
         * @param {queue.IQueuedItem} message QueuedItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueuedItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.user);
            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                $root.show.ThinDetail.encode(message.show, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified QueuedItem message, length delimited. Does not implicitly {@link queue.QueuedItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof queue.QueuedItem
         * @static
         * @param {queue.IQueuedItem} message QueuedItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QueuedItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QueuedItem message from the specified reader or buffer.
         * @function decode
         * @memberof queue.QueuedItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {queue.QueuedItem} QueuedItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueuedItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.queue.QueuedItem();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.user = reader.string();
                    break;
                case 3:
                    message.show = $root.show.ThinDetail.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QueuedItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof queue.QueuedItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {queue.QueuedItem} QueuedItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QueuedItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QueuedItem message.
         * @function verify
         * @memberof queue.QueuedItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QueuedItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.user != null && message.hasOwnProperty("user"))
                if (!$util.isString(message.user))
                    return "user: string expected";
            if (message.show != null && message.hasOwnProperty("show")) {
                let error = $root.show.ThinDetail.verify(message.show);
                if (error)
                    return "show." + error;
            }
            return null;
        };

        /**
         * Creates a QueuedItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof queue.QueuedItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {queue.QueuedItem} QueuedItem
         */
        QueuedItem.fromObject = function fromObject(object) {
            if (object instanceof $root.queue.QueuedItem)
                return object;
            let message = new $root.queue.QueuedItem();
            if (object.id != null)
                message.id = String(object.id);
            if (object.user != null)
                message.user = String(object.user);
            if (object.show != null) {
                if (typeof object.show !== "object")
                    throw TypeError(".queue.QueuedItem.show: object expected");
                message.show = $root.show.ThinDetail.fromObject(object.show);
            }
            return message;
        };

        /**
         * Creates a plain object from a QueuedItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof queue.QueuedItem
         * @static
         * @param {queue.QueuedItem} message QueuedItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QueuedItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.user = "";
                object.show = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = message.user;
            if (message.show != null && message.hasOwnProperty("show"))
                object.show = $root.show.ThinDetail.toObject(message.show, options);
            return object;
        };

        /**
         * Converts this QueuedItem to JSON.
         * @function toJSON
         * @memberof queue.QueuedItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QueuedItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QueuedItem;
    })();

    /**
     * QueueItemState enum.
     * @name queue.QueueItemState
     * @enum {number}
     * @property {number} Queued=0 Queued value
     * @property {number} Liked=1 Liked value
     * @property {number} Disliked=2 Disliked value
     */
    queue.QueueItemState = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Queued"] = 0;
        values[valuesById[1] = "Liked"] = 1;
        values[valuesById[2] = "Disliked"] = 2;
        return values;
    })();

    return queue;
})();

export const show = $root.show = (() => {

    /**
     * Namespace show.
     * @exports show
     * @namespace
     */
    const show = {};

    show.ThinDetail = (function() {

        /**
         * Properties of a ThinDetail.
         * @memberof show
         * @interface IThinDetail
         * @property {string|null} [id] ThinDetail id
         * @property {string|null} [title] ThinDetail title
         * @property {string|null} [overview] ThinDetail overview
         * @property {Array.<show.IGenre>|null} [genres] ThinDetail genres
         * @property {string|null} [posterPath] ThinDetail posterPath
         */

        /**
         * Constructs a new ThinDetail.
         * @memberof show
         * @classdesc Represents a ThinDetail.
         * @implements IThinDetail
         * @constructor
         * @param {show.IThinDetail=} [properties] Properties to set
         */
        function ThinDetail(properties) {
            this.genres = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ThinDetail id.
         * @member {string} id
         * @memberof show.ThinDetail
         * @instance
         */
        ThinDetail.prototype.id = "";

        /**
         * ThinDetail title.
         * @member {string} title
         * @memberof show.ThinDetail
         * @instance
         */
        ThinDetail.prototype.title = "";

        /**
         * ThinDetail overview.
         * @member {string} overview
         * @memberof show.ThinDetail
         * @instance
         */
        ThinDetail.prototype.overview = "";

        /**
         * ThinDetail genres.
         * @member {Array.<show.IGenre>} genres
         * @memberof show.ThinDetail
         * @instance
         */
        ThinDetail.prototype.genres = $util.emptyArray;

        /**
         * ThinDetail posterPath.
         * @member {string} posterPath
         * @memberof show.ThinDetail
         * @instance
         */
        ThinDetail.prototype.posterPath = "";

        /**
         * Creates a new ThinDetail instance using the specified properties.
         * @function create
         * @memberof show.ThinDetail
         * @static
         * @param {show.IThinDetail=} [properties] Properties to set
         * @returns {show.ThinDetail} ThinDetail instance
         */
        ThinDetail.create = function create(properties) {
            return new ThinDetail(properties);
        };

        /**
         * Encodes the specified ThinDetail message. Does not implicitly {@link show.ThinDetail.verify|verify} messages.
         * @function encode
         * @memberof show.ThinDetail
         * @static
         * @param {show.IThinDetail} message ThinDetail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ThinDetail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.overview != null && Object.hasOwnProperty.call(message, "overview"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.overview);
            if (message.genres != null && message.genres.length)
                for (let i = 0; i < message.genres.length; ++i)
                    $root.show.Genre.encode(message.genres[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.posterPath != null && Object.hasOwnProperty.call(message, "posterPath"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.posterPath);
            return writer;
        };

        /**
         * Encodes the specified ThinDetail message, length delimited. Does not implicitly {@link show.ThinDetail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.ThinDetail
         * @static
         * @param {show.IThinDetail} message ThinDetail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ThinDetail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ThinDetail message from the specified reader or buffer.
         * @function decode
         * @memberof show.ThinDetail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.ThinDetail} ThinDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ThinDetail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.ThinDetail();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.overview = reader.string();
                    break;
                case 4:
                    if (!(message.genres && message.genres.length))
                        message.genres = [];
                    message.genres.push($root.show.Genre.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.posterPath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ThinDetail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.ThinDetail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.ThinDetail} ThinDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ThinDetail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ThinDetail message.
         * @function verify
         * @memberof show.ThinDetail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ThinDetail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.overview != null && message.hasOwnProperty("overview"))
                if (!$util.isString(message.overview))
                    return "overview: string expected";
            if (message.genres != null && message.hasOwnProperty("genres")) {
                if (!Array.isArray(message.genres))
                    return "genres: array expected";
                for (let i = 0; i < message.genres.length; ++i) {
                    let error = $root.show.Genre.verify(message.genres[i]);
                    if (error)
                        return "genres." + error;
                }
            }
            if (message.posterPath != null && message.hasOwnProperty("posterPath"))
                if (!$util.isString(message.posterPath))
                    return "posterPath: string expected";
            return null;
        };

        /**
         * Creates a ThinDetail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.ThinDetail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.ThinDetail} ThinDetail
         */
        ThinDetail.fromObject = function fromObject(object) {
            if (object instanceof $root.show.ThinDetail)
                return object;
            let message = new $root.show.ThinDetail();
            if (object.id != null)
                message.id = String(object.id);
            if (object.title != null)
                message.title = String(object.title);
            if (object.overview != null)
                message.overview = String(object.overview);
            if (object.genres) {
                if (!Array.isArray(object.genres))
                    throw TypeError(".show.ThinDetail.genres: array expected");
                message.genres = [];
                for (let i = 0; i < object.genres.length; ++i) {
                    if (typeof object.genres[i] !== "object")
                        throw TypeError(".show.ThinDetail.genres: object expected");
                    message.genres[i] = $root.show.Genre.fromObject(object.genres[i]);
                }
            }
            if (object.posterPath != null)
                message.posterPath = String(object.posterPath);
            return message;
        };

        /**
         * Creates a plain object from a ThinDetail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.ThinDetail
         * @static
         * @param {show.ThinDetail} message ThinDetail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ThinDetail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.genres = [];
            if (options.defaults) {
                object.id = "";
                object.title = "";
                object.overview = "";
                object.posterPath = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.overview != null && message.hasOwnProperty("overview"))
                object.overview = message.overview;
            if (message.genres && message.genres.length) {
                object.genres = [];
                for (let j = 0; j < message.genres.length; ++j)
                    object.genres[j] = $root.show.Genre.toObject(message.genres[j], options);
            }
            if (message.posterPath != null && message.hasOwnProperty("posterPath"))
                object.posterPath = message.posterPath;
            return object;
        };

        /**
         * Converts this ThinDetail to JSON.
         * @function toJSON
         * @memberof show.ThinDetail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ThinDetail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ThinDetail;
    })();

    show.Detail = (function() {

        /**
         * Properties of a Detail.
         * @memberof show
         * @interface IDetail
         * @property {string|null} [id] Detail id
         * @property {string|null} [title] Detail title
         * @property {string|null} [overview] Detail overview
         * @property {Array.<show.IGenre>|null} [genres] Detail genres
         * @property {string|null} [posterPath] Detail posterPath
         * @property {string|null} [backdropPath] Detail backdropPath
         * @property {show.IVotes|null} [votes] Detail votes
         * @property {number|null} [popularity] Detail popularity
         * @property {string|null} [tagline] Detail tagline
         * @property {Array.<string>|null} [spokenLanguage] Detail spokenLanguage
         * @property {Array.<show.IVideo>|null} [videos] Detail videos
         * @property {Array.<show.IImage>|null} [posters] Detail posters
         * @property {Array.<number>|null} [recommendations] Detail recommendations
         * @property {Array.<number>|null} [similar] Detail similar
         * @property {Array.<show.IWatch>|null} [watch] Detail watch
         * @property {show.ITV|null} [tv] Detail tv
         * @property {show.IMovie|null} [movie] Detail movie
         * @property {show.Detail.Type|null} [type] Detail type
         * @property {string|null} [date] Detail date
         * @property {Array.<show.ICast>|null} [cast] Detail cast
         * @property {Array.<show.ICrew>|null} [crew] Detail crew
         */

        /**
         * Constructs a new Detail.
         * @memberof show
         * @classdesc Represents a Detail.
         * @implements IDetail
         * @constructor
         * @param {show.IDetail=} [properties] Properties to set
         */
        function Detail(properties) {
            this.genres = [];
            this.spokenLanguage = [];
            this.videos = [];
            this.posters = [];
            this.recommendations = [];
            this.similar = [];
            this.watch = [];
            this.cast = [];
            this.crew = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Detail id.
         * @member {string} id
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.id = "";

        /**
         * Detail title.
         * @member {string} title
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.title = "";

        /**
         * Detail overview.
         * @member {string} overview
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.overview = "";

        /**
         * Detail genres.
         * @member {Array.<show.IGenre>} genres
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.genres = $util.emptyArray;

        /**
         * Detail posterPath.
         * @member {string} posterPath
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.posterPath = "";

        /**
         * Detail backdropPath.
         * @member {string} backdropPath
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.backdropPath = "";

        /**
         * Detail votes.
         * @member {show.IVotes|null|undefined} votes
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.votes = null;

        /**
         * Detail popularity.
         * @member {number} popularity
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.popularity = 0;

        /**
         * Detail tagline.
         * @member {string} tagline
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.tagline = "";

        /**
         * Detail spokenLanguage.
         * @member {Array.<string>} spokenLanguage
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.spokenLanguage = $util.emptyArray;

        /**
         * Detail videos.
         * @member {Array.<show.IVideo>} videos
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.videos = $util.emptyArray;

        /**
         * Detail posters.
         * @member {Array.<show.IImage>} posters
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.posters = $util.emptyArray;

        /**
         * Detail recommendations.
         * @member {Array.<number>} recommendations
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.recommendations = $util.emptyArray;

        /**
         * Detail similar.
         * @member {Array.<number>} similar
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.similar = $util.emptyArray;

        /**
         * Detail watch.
         * @member {Array.<show.IWatch>} watch
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.watch = $util.emptyArray;

        /**
         * Detail tv.
         * @member {show.ITV|null|undefined} tv
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.tv = null;

        /**
         * Detail movie.
         * @member {show.IMovie|null|undefined} movie
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.movie = null;

        /**
         * Detail type.
         * @member {show.Detail.Type} type
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.type = 0;

        /**
         * Detail date.
         * @member {string} date
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.date = "";

        /**
         * Detail cast.
         * @member {Array.<show.ICast>} cast
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.cast = $util.emptyArray;

        /**
         * Detail crew.
         * @member {Array.<show.ICrew>} crew
         * @memberof show.Detail
         * @instance
         */
        Detail.prototype.crew = $util.emptyArray;

        /**
         * Creates a new Detail instance using the specified properties.
         * @function create
         * @memberof show.Detail
         * @static
         * @param {show.IDetail=} [properties] Properties to set
         * @returns {show.Detail} Detail instance
         */
        Detail.create = function create(properties) {
            return new Detail(properties);
        };

        /**
         * Encodes the specified Detail message. Does not implicitly {@link show.Detail.verify|verify} messages.
         * @function encode
         * @memberof show.Detail
         * @static
         * @param {show.IDetail} message Detail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Detail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.overview != null && Object.hasOwnProperty.call(message, "overview"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.overview);
            if (message.genres != null && message.genres.length)
                for (let i = 0; i < message.genres.length; ++i)
                    $root.show.Genre.encode(message.genres[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.posterPath != null && Object.hasOwnProperty.call(message, "posterPath"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.posterPath);
            if (message.backdropPath != null && Object.hasOwnProperty.call(message, "backdropPath"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.backdropPath);
            if (message.votes != null && Object.hasOwnProperty.call(message, "votes"))
                $root.show.Votes.encode(message.votes, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.popularity != null && Object.hasOwnProperty.call(message, "popularity"))
                writer.uint32(/* id 10, wireType 1 =*/81).double(message.popularity);
            if (message.tagline != null && Object.hasOwnProperty.call(message, "tagline"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.tagline);
            if (message.spokenLanguage != null && message.spokenLanguage.length)
                for (let i = 0; i < message.spokenLanguage.length; ++i)
                    writer.uint32(/* id 12, wireType 2 =*/98).string(message.spokenLanguage[i]);
            if (message.videos != null && message.videos.length)
                for (let i = 0; i < message.videos.length; ++i)
                    $root.show.Video.encode(message.videos[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.posters != null && message.posters.length)
                for (let i = 0; i < message.posters.length; ++i)
                    $root.show.Image.encode(message.posters[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            if (message.recommendations != null && message.recommendations.length) {
                writer.uint32(/* id 15, wireType 2 =*/122).fork();
                for (let i = 0; i < message.recommendations.length; ++i)
                    writer.int32(message.recommendations[i]);
                writer.ldelim();
            }
            if (message.similar != null && message.similar.length) {
                writer.uint32(/* id 16, wireType 2 =*/130).fork();
                for (let i = 0; i < message.similar.length; ++i)
                    writer.int32(message.similar[i]);
                writer.ldelim();
            }
            if (message.watch != null && message.watch.length)
                for (let i = 0; i < message.watch.length; ++i)
                    $root.show.Watch.encode(message.watch[i], writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.tv != null && Object.hasOwnProperty.call(message, "tv"))
                $root.show.TV.encode(message.tv, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            if (message.movie != null && Object.hasOwnProperty.call(message, "movie"))
                $root.show.Movie.encode(message.movie, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.type);
            if (message.date != null && Object.hasOwnProperty.call(message, "date"))
                writer.uint32(/* id 21, wireType 2 =*/170).string(message.date);
            if (message.cast != null && message.cast.length)
                for (let i = 0; i < message.cast.length; ++i)
                    $root.show.Cast.encode(message.cast[i], writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            if (message.crew != null && message.crew.length)
                for (let i = 0; i < message.crew.length; ++i)
                    $root.show.Crew.encode(message.crew[i], writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Detail message, length delimited. Does not implicitly {@link show.Detail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Detail
         * @static
         * @param {show.IDetail} message Detail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Detail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Detail message from the specified reader or buffer.
         * @function decode
         * @memberof show.Detail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Detail} Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Detail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Detail();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.overview = reader.string();
                    break;
                case 4:
                    if (!(message.genres && message.genres.length))
                        message.genres = [];
                    message.genres.push($root.show.Genre.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.posterPath = reader.string();
                    break;
                case 8:
                    message.backdropPath = reader.string();
                    break;
                case 9:
                    message.votes = $root.show.Votes.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.popularity = reader.double();
                    break;
                case 11:
                    message.tagline = reader.string();
                    break;
                case 12:
                    if (!(message.spokenLanguage && message.spokenLanguage.length))
                        message.spokenLanguage = [];
                    message.spokenLanguage.push(reader.string());
                    break;
                case 13:
                    if (!(message.videos && message.videos.length))
                        message.videos = [];
                    message.videos.push($root.show.Video.decode(reader, reader.uint32()));
                    break;
                case 14:
                    if (!(message.posters && message.posters.length))
                        message.posters = [];
                    message.posters.push($root.show.Image.decode(reader, reader.uint32()));
                    break;
                case 15:
                    if (!(message.recommendations && message.recommendations.length))
                        message.recommendations = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.recommendations.push(reader.int32());
                    } else
                        message.recommendations.push(reader.int32());
                    break;
                case 16:
                    if (!(message.similar && message.similar.length))
                        message.similar = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.similar.push(reader.int32());
                    } else
                        message.similar.push(reader.int32());
                    break;
                case 17:
                    if (!(message.watch && message.watch.length))
                        message.watch = [];
                    message.watch.push($root.show.Watch.decode(reader, reader.uint32()));
                    break;
                case 18:
                    message.tv = $root.show.TV.decode(reader, reader.uint32());
                    break;
                case 19:
                    message.movie = $root.show.Movie.decode(reader, reader.uint32());
                    break;
                case 20:
                    message.type = reader.int32();
                    break;
                case 21:
                    message.date = reader.string();
                    break;
                case 22:
                    if (!(message.cast && message.cast.length))
                        message.cast = [];
                    message.cast.push($root.show.Cast.decode(reader, reader.uint32()));
                    break;
                case 23:
                    if (!(message.crew && message.crew.length))
                        message.crew = [];
                    message.crew.push($root.show.Crew.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Detail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Detail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Detail} Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Detail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Detail message.
         * @function verify
         * @memberof show.Detail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Detail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.overview != null && message.hasOwnProperty("overview"))
                if (!$util.isString(message.overview))
                    return "overview: string expected";
            if (message.genres != null && message.hasOwnProperty("genres")) {
                if (!Array.isArray(message.genres))
                    return "genres: array expected";
                for (let i = 0; i < message.genres.length; ++i) {
                    let error = $root.show.Genre.verify(message.genres[i]);
                    if (error)
                        return "genres." + error;
                }
            }
            if (message.posterPath != null && message.hasOwnProperty("posterPath"))
                if (!$util.isString(message.posterPath))
                    return "posterPath: string expected";
            if (message.backdropPath != null && message.hasOwnProperty("backdropPath"))
                if (!$util.isString(message.backdropPath))
                    return "backdropPath: string expected";
            if (message.votes != null && message.hasOwnProperty("votes")) {
                let error = $root.show.Votes.verify(message.votes);
                if (error)
                    return "votes." + error;
            }
            if (message.popularity != null && message.hasOwnProperty("popularity"))
                if (typeof message.popularity !== "number")
                    return "popularity: number expected";
            if (message.tagline != null && message.hasOwnProperty("tagline"))
                if (!$util.isString(message.tagline))
                    return "tagline: string expected";
            if (message.spokenLanguage != null && message.hasOwnProperty("spokenLanguage")) {
                if (!Array.isArray(message.spokenLanguage))
                    return "spokenLanguage: array expected";
                for (let i = 0; i < message.spokenLanguage.length; ++i)
                    if (!$util.isString(message.spokenLanguage[i]))
                        return "spokenLanguage: string[] expected";
            }
            if (message.videos != null && message.hasOwnProperty("videos")) {
                if (!Array.isArray(message.videos))
                    return "videos: array expected";
                for (let i = 0; i < message.videos.length; ++i) {
                    let error = $root.show.Video.verify(message.videos[i]);
                    if (error)
                        return "videos." + error;
                }
            }
            if (message.posters != null && message.hasOwnProperty("posters")) {
                if (!Array.isArray(message.posters))
                    return "posters: array expected";
                for (let i = 0; i < message.posters.length; ++i) {
                    let error = $root.show.Image.verify(message.posters[i]);
                    if (error)
                        return "posters." + error;
                }
            }
            if (message.recommendations != null && message.hasOwnProperty("recommendations")) {
                if (!Array.isArray(message.recommendations))
                    return "recommendations: array expected";
                for (let i = 0; i < message.recommendations.length; ++i)
                    if (!$util.isInteger(message.recommendations[i]))
                        return "recommendations: integer[] expected";
            }
            if (message.similar != null && message.hasOwnProperty("similar")) {
                if (!Array.isArray(message.similar))
                    return "similar: array expected";
                for (let i = 0; i < message.similar.length; ++i)
                    if (!$util.isInteger(message.similar[i]))
                        return "similar: integer[] expected";
            }
            if (message.watch != null && message.hasOwnProperty("watch")) {
                if (!Array.isArray(message.watch))
                    return "watch: array expected";
                for (let i = 0; i < message.watch.length; ++i) {
                    let error = $root.show.Watch.verify(message.watch[i]);
                    if (error)
                        return "watch." + error;
                }
            }
            if (message.tv != null && message.hasOwnProperty("tv")) {
                let error = $root.show.TV.verify(message.tv);
                if (error)
                    return "tv." + error;
            }
            if (message.movie != null && message.hasOwnProperty("movie")) {
                let error = $root.show.Movie.verify(message.movie);
                if (error)
                    return "movie." + error;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.date != null && message.hasOwnProperty("date"))
                if (!$util.isString(message.date))
                    return "date: string expected";
            if (message.cast != null && message.hasOwnProperty("cast")) {
                if (!Array.isArray(message.cast))
                    return "cast: array expected";
                for (let i = 0; i < message.cast.length; ++i) {
                    let error = $root.show.Cast.verify(message.cast[i]);
                    if (error)
                        return "cast." + error;
                }
            }
            if (message.crew != null && message.hasOwnProperty("crew")) {
                if (!Array.isArray(message.crew))
                    return "crew: array expected";
                for (let i = 0; i < message.crew.length; ++i) {
                    let error = $root.show.Crew.verify(message.crew[i]);
                    if (error)
                        return "crew." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Detail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Detail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Detail} Detail
         */
        Detail.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Detail)
                return object;
            let message = new $root.show.Detail();
            if (object.id != null)
                message.id = String(object.id);
            if (object.title != null)
                message.title = String(object.title);
            if (object.overview != null)
                message.overview = String(object.overview);
            if (object.genres) {
                if (!Array.isArray(object.genres))
                    throw TypeError(".show.Detail.genres: array expected");
                message.genres = [];
                for (let i = 0; i < object.genres.length; ++i) {
                    if (typeof object.genres[i] !== "object")
                        throw TypeError(".show.Detail.genres: object expected");
                    message.genres[i] = $root.show.Genre.fromObject(object.genres[i]);
                }
            }
            if (object.posterPath != null)
                message.posterPath = String(object.posterPath);
            if (object.backdropPath != null)
                message.backdropPath = String(object.backdropPath);
            if (object.votes != null) {
                if (typeof object.votes !== "object")
                    throw TypeError(".show.Detail.votes: object expected");
                message.votes = $root.show.Votes.fromObject(object.votes);
            }
            if (object.popularity != null)
                message.popularity = Number(object.popularity);
            if (object.tagline != null)
                message.tagline = String(object.tagline);
            if (object.spokenLanguage) {
                if (!Array.isArray(object.spokenLanguage))
                    throw TypeError(".show.Detail.spokenLanguage: array expected");
                message.spokenLanguage = [];
                for (let i = 0; i < object.spokenLanguage.length; ++i)
                    message.spokenLanguage[i] = String(object.spokenLanguage[i]);
            }
            if (object.videos) {
                if (!Array.isArray(object.videos))
                    throw TypeError(".show.Detail.videos: array expected");
                message.videos = [];
                for (let i = 0; i < object.videos.length; ++i) {
                    if (typeof object.videos[i] !== "object")
                        throw TypeError(".show.Detail.videos: object expected");
                    message.videos[i] = $root.show.Video.fromObject(object.videos[i]);
                }
            }
            if (object.posters) {
                if (!Array.isArray(object.posters))
                    throw TypeError(".show.Detail.posters: array expected");
                message.posters = [];
                for (let i = 0; i < object.posters.length; ++i) {
                    if (typeof object.posters[i] !== "object")
                        throw TypeError(".show.Detail.posters: object expected");
                    message.posters[i] = $root.show.Image.fromObject(object.posters[i]);
                }
            }
            if (object.recommendations) {
                if (!Array.isArray(object.recommendations))
                    throw TypeError(".show.Detail.recommendations: array expected");
                message.recommendations = [];
                for (let i = 0; i < object.recommendations.length; ++i)
                    message.recommendations[i] = object.recommendations[i] | 0;
            }
            if (object.similar) {
                if (!Array.isArray(object.similar))
                    throw TypeError(".show.Detail.similar: array expected");
                message.similar = [];
                for (let i = 0; i < object.similar.length; ++i)
                    message.similar[i] = object.similar[i] | 0;
            }
            if (object.watch) {
                if (!Array.isArray(object.watch))
                    throw TypeError(".show.Detail.watch: array expected");
                message.watch = [];
                for (let i = 0; i < object.watch.length; ++i) {
                    if (typeof object.watch[i] !== "object")
                        throw TypeError(".show.Detail.watch: object expected");
                    message.watch[i] = $root.show.Watch.fromObject(object.watch[i]);
                }
            }
            if (object.tv != null) {
                if (typeof object.tv !== "object")
                    throw TypeError(".show.Detail.tv: object expected");
                message.tv = $root.show.TV.fromObject(object.tv);
            }
            if (object.movie != null) {
                if (typeof object.movie !== "object")
                    throw TypeError(".show.Detail.movie: object expected");
                message.movie = $root.show.Movie.fromObject(object.movie);
            }
            switch (object.type) {
            case "TV":
            case 0:
                message.type = 0;
                break;
            case "Movie":
            case 1:
                message.type = 1;
                break;
            }
            if (object.date != null)
                message.date = String(object.date);
            if (object.cast) {
                if (!Array.isArray(object.cast))
                    throw TypeError(".show.Detail.cast: array expected");
                message.cast = [];
                for (let i = 0; i < object.cast.length; ++i) {
                    if (typeof object.cast[i] !== "object")
                        throw TypeError(".show.Detail.cast: object expected");
                    message.cast[i] = $root.show.Cast.fromObject(object.cast[i]);
                }
            }
            if (object.crew) {
                if (!Array.isArray(object.crew))
                    throw TypeError(".show.Detail.crew: array expected");
                message.crew = [];
                for (let i = 0; i < object.crew.length; ++i) {
                    if (typeof object.crew[i] !== "object")
                        throw TypeError(".show.Detail.crew: object expected");
                    message.crew[i] = $root.show.Crew.fromObject(object.crew[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Detail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Detail
         * @static
         * @param {show.Detail} message Detail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Detail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.genres = [];
                object.spokenLanguage = [];
                object.videos = [];
                object.posters = [];
                object.recommendations = [];
                object.similar = [];
                object.watch = [];
                object.cast = [];
                object.crew = [];
            }
            if (options.defaults) {
                object.id = "";
                object.title = "";
                object.overview = "";
                object.posterPath = "";
                object.backdropPath = "";
                object.votes = null;
                object.popularity = 0;
                object.tagline = "";
                object.tv = null;
                object.movie = null;
                object.type = options.enums === String ? "TV" : 0;
                object.date = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.overview != null && message.hasOwnProperty("overview"))
                object.overview = message.overview;
            if (message.genres && message.genres.length) {
                object.genres = [];
                for (let j = 0; j < message.genres.length; ++j)
                    object.genres[j] = $root.show.Genre.toObject(message.genres[j], options);
            }
            if (message.posterPath != null && message.hasOwnProperty("posterPath"))
                object.posterPath = message.posterPath;
            if (message.backdropPath != null && message.hasOwnProperty("backdropPath"))
                object.backdropPath = message.backdropPath;
            if (message.votes != null && message.hasOwnProperty("votes"))
                object.votes = $root.show.Votes.toObject(message.votes, options);
            if (message.popularity != null && message.hasOwnProperty("popularity"))
                object.popularity = options.json && !isFinite(message.popularity) ? String(message.popularity) : message.popularity;
            if (message.tagline != null && message.hasOwnProperty("tagline"))
                object.tagline = message.tagline;
            if (message.spokenLanguage && message.spokenLanguage.length) {
                object.spokenLanguage = [];
                for (let j = 0; j < message.spokenLanguage.length; ++j)
                    object.spokenLanguage[j] = message.spokenLanguage[j];
            }
            if (message.videos && message.videos.length) {
                object.videos = [];
                for (let j = 0; j < message.videos.length; ++j)
                    object.videos[j] = $root.show.Video.toObject(message.videos[j], options);
            }
            if (message.posters && message.posters.length) {
                object.posters = [];
                for (let j = 0; j < message.posters.length; ++j)
                    object.posters[j] = $root.show.Image.toObject(message.posters[j], options);
            }
            if (message.recommendations && message.recommendations.length) {
                object.recommendations = [];
                for (let j = 0; j < message.recommendations.length; ++j)
                    object.recommendations[j] = message.recommendations[j];
            }
            if (message.similar && message.similar.length) {
                object.similar = [];
                for (let j = 0; j < message.similar.length; ++j)
                    object.similar[j] = message.similar[j];
            }
            if (message.watch && message.watch.length) {
                object.watch = [];
                for (let j = 0; j < message.watch.length; ++j)
                    object.watch[j] = $root.show.Watch.toObject(message.watch[j], options);
            }
            if (message.tv != null && message.hasOwnProperty("tv"))
                object.tv = $root.show.TV.toObject(message.tv, options);
            if (message.movie != null && message.hasOwnProperty("movie"))
                object.movie = $root.show.Movie.toObject(message.movie, options);
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.show.Detail.Type[message.type] : message.type;
            if (message.date != null && message.hasOwnProperty("date"))
                object.date = message.date;
            if (message.cast && message.cast.length) {
                object.cast = [];
                for (let j = 0; j < message.cast.length; ++j)
                    object.cast[j] = $root.show.Cast.toObject(message.cast[j], options);
            }
            if (message.crew && message.crew.length) {
                object.crew = [];
                for (let j = 0; j < message.crew.length; ++j)
                    object.crew[j] = $root.show.Crew.toObject(message.crew[j], options);
            }
            return object;
        };

        /**
         * Converts this Detail to JSON.
         * @function toJSON
         * @memberof show.Detail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Detail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Type enum.
         * @name show.Detail.Type
         * @enum {number}
         * @property {number} TV=0 TV value
         * @property {number} Movie=1 Movie value
         */
        Detail.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TV"] = 0;
            values[valuesById[1] = "Movie"] = 1;
            return values;
        })();

        return Detail;
    })();

    show.TV = (function() {

        /**
         * Properties of a TV.
         * @memberof show
         * @interface ITV
         * @property {show.TV.Status|null} [status] TV status
         * @property {number|null} [seasons] TV seasons
         */

        /**
         * Constructs a new TV.
         * @memberof show
         * @classdesc Represents a TV.
         * @implements ITV
         * @constructor
         * @param {show.ITV=} [properties] Properties to set
         */
        function TV(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TV status.
         * @member {show.TV.Status} status
         * @memberof show.TV
         * @instance
         */
        TV.prototype.status = 0;

        /**
         * TV seasons.
         * @member {number} seasons
         * @memberof show.TV
         * @instance
         */
        TV.prototype.seasons = 0;

        /**
         * Creates a new TV instance using the specified properties.
         * @function create
         * @memberof show.TV
         * @static
         * @param {show.ITV=} [properties] Properties to set
         * @returns {show.TV} TV instance
         */
        TV.create = function create(properties) {
            return new TV(properties);
        };

        /**
         * Encodes the specified TV message. Does not implicitly {@link show.TV.verify|verify} messages.
         * @function encode
         * @memberof show.TV
         * @static
         * @param {show.ITV} message TV message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TV.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            if (message.seasons != null && Object.hasOwnProperty.call(message, "seasons"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seasons);
            return writer;
        };

        /**
         * Encodes the specified TV message, length delimited. Does not implicitly {@link show.TV.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.TV
         * @static
         * @param {show.ITV} message TV message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TV.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TV message from the specified reader or buffer.
         * @function decode
         * @memberof show.TV
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.TV} TV
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TV.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.TV();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
                    break;
                case 2:
                    message.seasons = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TV message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.TV
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.TV} TV
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TV.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TV message.
         * @function verify
         * @memberof show.TV
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TV.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.seasons != null && message.hasOwnProperty("seasons"))
                if (!$util.isInteger(message.seasons))
                    return "seasons: integer expected";
            return null;
        };

        /**
         * Creates a TV message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.TV
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.TV} TV
         */
        TV.fromObject = function fromObject(object) {
            if (object instanceof $root.show.TV)
                return object;
            let message = new $root.show.TV();
            switch (object.status) {
            case "Rumored":
            case 0:
                message.status = 0;
                break;
            case "Planned":
            case 1:
                message.status = 1;
                break;
            case "InProduction":
            case 2:
                message.status = 2;
                break;
            case "PostProduction":
            case 3:
                message.status = 3;
                break;
            case "ReturningSeries":
            case 4:
                message.status = 4;
                break;
            case "Canceled":
            case 5:
                message.status = 5;
                break;
            case "Ended":
            case 6:
                message.status = 6;
                break;
            }
            if (object.seasons != null)
                message.seasons = object.seasons | 0;
            return message;
        };

        /**
         * Creates a plain object from a TV message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.TV
         * @static
         * @param {show.TV} message TV
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TV.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.status = options.enums === String ? "Rumored" : 0;
                object.seasons = 0;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.show.TV.Status[message.status] : message.status;
            if (message.seasons != null && message.hasOwnProperty("seasons"))
                object.seasons = message.seasons;
            return object;
        };

        /**
         * Converts this TV to JSON.
         * @function toJSON
         * @memberof show.TV
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TV.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Status enum.
         * @name show.TV.Status
         * @enum {number}
         * @property {number} Rumored=0 Rumored value
         * @property {number} Planned=1 Planned value
         * @property {number} InProduction=2 InProduction value
         * @property {number} PostProduction=3 PostProduction value
         * @property {number} ReturningSeries=4 ReturningSeries value
         * @property {number} Canceled=5 Canceled value
         * @property {number} Ended=6 Ended value
         */
        TV.Status = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Rumored"] = 0;
            values[valuesById[1] = "Planned"] = 1;
            values[valuesById[2] = "InProduction"] = 2;
            values[valuesById[3] = "PostProduction"] = 3;
            values[valuesById[4] = "ReturningSeries"] = 4;
            values[valuesById[5] = "Canceled"] = 5;
            values[valuesById[6] = "Ended"] = 6;
            return values;
        })();

        return TV;
    })();

    show.Movie = (function() {

        /**
         * Properties of a Movie.
         * @memberof show
         * @interface IMovie
         * @property {string|null} [imdbId] Movie imdbId
         * @property {string|null} [originalLanguage] Movie originalLanguage
         * @property {string|null} [originalTitle] Movie originalTitle
         * @property {show.Movie.Status|null} [status] Movie status
         * @property {number|null} [budget] Movie budget
         * @property {number|null} [runtime] Movie runtime
         */

        /**
         * Constructs a new Movie.
         * @memberof show
         * @classdesc Represents a Movie.
         * @implements IMovie
         * @constructor
         * @param {show.IMovie=} [properties] Properties to set
         */
        function Movie(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Movie imdbId.
         * @member {string} imdbId
         * @memberof show.Movie
         * @instance
         */
        Movie.prototype.imdbId = "";

        /**
         * Movie originalLanguage.
         * @member {string} originalLanguage
         * @memberof show.Movie
         * @instance
         */
        Movie.prototype.originalLanguage = "";

        /**
         * Movie originalTitle.
         * @member {string} originalTitle
         * @memberof show.Movie
         * @instance
         */
        Movie.prototype.originalTitle = "";

        /**
         * Movie status.
         * @member {show.Movie.Status} status
         * @memberof show.Movie
         * @instance
         */
        Movie.prototype.status = 0;

        /**
         * Movie budget.
         * @member {number} budget
         * @memberof show.Movie
         * @instance
         */
        Movie.prototype.budget = 0;

        /**
         * Movie runtime.
         * @member {number} runtime
         * @memberof show.Movie
         * @instance
         */
        Movie.prototype.runtime = 0;

        /**
         * Creates a new Movie instance using the specified properties.
         * @function create
         * @memberof show.Movie
         * @static
         * @param {show.IMovie=} [properties] Properties to set
         * @returns {show.Movie} Movie instance
         */
        Movie.create = function create(properties) {
            return new Movie(properties);
        };

        /**
         * Encodes the specified Movie message. Does not implicitly {@link show.Movie.verify|verify} messages.
         * @function encode
         * @memberof show.Movie
         * @static
         * @param {show.IMovie} message Movie message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Movie.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.imdbId != null && Object.hasOwnProperty.call(message, "imdbId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.imdbId);
            if (message.originalLanguage != null && Object.hasOwnProperty.call(message, "originalLanguage"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.originalLanguage);
            if (message.originalTitle != null && Object.hasOwnProperty.call(message, "originalTitle"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.originalTitle);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
            if (message.budget != null && Object.hasOwnProperty.call(message, "budget"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.budget);
            if (message.runtime != null && Object.hasOwnProperty.call(message, "runtime"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.runtime);
            return writer;
        };

        /**
         * Encodes the specified Movie message, length delimited. Does not implicitly {@link show.Movie.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Movie
         * @static
         * @param {show.IMovie} message Movie message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Movie.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Movie message from the specified reader or buffer.
         * @function decode
         * @memberof show.Movie
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Movie} Movie
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Movie.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Movie();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.imdbId = reader.string();
                    break;
                case 2:
                    message.originalLanguage = reader.string();
                    break;
                case 3:
                    message.originalTitle = reader.string();
                    break;
                case 4:
                    message.status = reader.int32();
                    break;
                case 5:
                    message.budget = reader.int32();
                    break;
                case 6:
                    message.runtime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Movie message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Movie
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Movie} Movie
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Movie.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Movie message.
         * @function verify
         * @memberof show.Movie
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Movie.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.imdbId != null && message.hasOwnProperty("imdbId"))
                if (!$util.isString(message.imdbId))
                    return "imdbId: string expected";
            if (message.originalLanguage != null && message.hasOwnProperty("originalLanguage"))
                if (!$util.isString(message.originalLanguage))
                    return "originalLanguage: string expected";
            if (message.originalTitle != null && message.hasOwnProperty("originalTitle"))
                if (!$util.isString(message.originalTitle))
                    return "originalTitle: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.budget != null && message.hasOwnProperty("budget"))
                if (!$util.isInteger(message.budget))
                    return "budget: integer expected";
            if (message.runtime != null && message.hasOwnProperty("runtime"))
                if (!$util.isInteger(message.runtime))
                    return "runtime: integer expected";
            return null;
        };

        /**
         * Creates a Movie message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Movie
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Movie} Movie
         */
        Movie.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Movie)
                return object;
            let message = new $root.show.Movie();
            if (object.imdbId != null)
                message.imdbId = String(object.imdbId);
            if (object.originalLanguage != null)
                message.originalLanguage = String(object.originalLanguage);
            if (object.originalTitle != null)
                message.originalTitle = String(object.originalTitle);
            switch (object.status) {
            case "Rumored":
            case 0:
                message.status = 0;
                break;
            case "Planned":
            case 1:
                message.status = 1;
                break;
            case "InProduction":
            case 2:
                message.status = 2;
                break;
            case "PostProduction":
            case 3:
                message.status = 3;
                break;
            case "Released":
            case 4:
                message.status = 4;
                break;
            case "Canceled":
            case 5:
                message.status = 5;
                break;
            }
            if (object.budget != null)
                message.budget = object.budget | 0;
            if (object.runtime != null)
                message.runtime = object.runtime | 0;
            return message;
        };

        /**
         * Creates a plain object from a Movie message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Movie
         * @static
         * @param {show.Movie} message Movie
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Movie.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.imdbId = "";
                object.originalLanguage = "";
                object.originalTitle = "";
                object.status = options.enums === String ? "Rumored" : 0;
                object.budget = 0;
                object.runtime = 0;
            }
            if (message.imdbId != null && message.hasOwnProperty("imdbId"))
                object.imdbId = message.imdbId;
            if (message.originalLanguage != null && message.hasOwnProperty("originalLanguage"))
                object.originalLanguage = message.originalLanguage;
            if (message.originalTitle != null && message.hasOwnProperty("originalTitle"))
                object.originalTitle = message.originalTitle;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.show.Movie.Status[message.status] : message.status;
            if (message.budget != null && message.hasOwnProperty("budget"))
                object.budget = message.budget;
            if (message.runtime != null && message.hasOwnProperty("runtime"))
                object.runtime = message.runtime;
            return object;
        };

        /**
         * Converts this Movie to JSON.
         * @function toJSON
         * @memberof show.Movie
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Movie.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Status enum.
         * @name show.Movie.Status
         * @enum {number}
         * @property {number} Rumored=0 Rumored value
         * @property {number} Planned=1 Planned value
         * @property {number} InProduction=2 InProduction value
         * @property {number} PostProduction=3 PostProduction value
         * @property {number} Released=4 Released value
         * @property {number} Canceled=5 Canceled value
         */
        Movie.Status = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Rumored"] = 0;
            values[valuesById[1] = "Planned"] = 1;
            values[valuesById[2] = "InProduction"] = 2;
            values[valuesById[3] = "PostProduction"] = 3;
            values[valuesById[4] = "Released"] = 4;
            values[valuesById[5] = "Canceled"] = 5;
            return values;
        })();

        return Movie;
    })();

    show.Genre = (function() {

        /**
         * Properties of a Genre.
         * @memberof show
         * @interface IGenre
         * @property {number|null} [id] Genre id
         * @property {string|null} [name] Genre name
         */

        /**
         * Constructs a new Genre.
         * @memberof show
         * @classdesc Represents a Genre.
         * @implements IGenre
         * @constructor
         * @param {show.IGenre=} [properties] Properties to set
         */
        function Genre(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Genre id.
         * @member {number} id
         * @memberof show.Genre
         * @instance
         */
        Genre.prototype.id = 0;

        /**
         * Genre name.
         * @member {string} name
         * @memberof show.Genre
         * @instance
         */
        Genre.prototype.name = "";

        /**
         * Creates a new Genre instance using the specified properties.
         * @function create
         * @memberof show.Genre
         * @static
         * @param {show.IGenre=} [properties] Properties to set
         * @returns {show.Genre} Genre instance
         */
        Genre.create = function create(properties) {
            return new Genre(properties);
        };

        /**
         * Encodes the specified Genre message. Does not implicitly {@link show.Genre.verify|verify} messages.
         * @function encode
         * @memberof show.Genre
         * @static
         * @param {show.IGenre} message Genre message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Genre.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified Genre message, length delimited. Does not implicitly {@link show.Genre.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Genre
         * @static
         * @param {show.IGenre} message Genre message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Genre.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Genre message from the specified reader or buffer.
         * @function decode
         * @memberof show.Genre
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Genre} Genre
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Genre.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Genre();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Genre message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Genre
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Genre} Genre
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Genre.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Genre message.
         * @function verify
         * @memberof show.Genre
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Genre.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a Genre message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Genre
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Genre} Genre
         */
        Genre.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Genre)
                return object;
            let message = new $root.show.Genre();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a Genre message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Genre
         * @static
         * @param {show.Genre} message Genre
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Genre.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this Genre to JSON.
         * @function toJSON
         * @memberof show.Genre
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Genre.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Genre;
    })();

    show.Votes = (function() {

        /**
         * Properties of a Votes.
         * @memberof show
         * @interface IVotes
         * @property {number|null} [average] Votes average
         * @property {number|null} [count] Votes count
         */

        /**
         * Constructs a new Votes.
         * @memberof show
         * @classdesc Represents a Votes.
         * @implements IVotes
         * @constructor
         * @param {show.IVotes=} [properties] Properties to set
         */
        function Votes(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Votes average.
         * @member {number} average
         * @memberof show.Votes
         * @instance
         */
        Votes.prototype.average = 0;

        /**
         * Votes count.
         * @member {number} count
         * @memberof show.Votes
         * @instance
         */
        Votes.prototype.count = 0;

        /**
         * Creates a new Votes instance using the specified properties.
         * @function create
         * @memberof show.Votes
         * @static
         * @param {show.IVotes=} [properties] Properties to set
         * @returns {show.Votes} Votes instance
         */
        Votes.create = function create(properties) {
            return new Votes(properties);
        };

        /**
         * Encodes the specified Votes message. Does not implicitly {@link show.Votes.verify|verify} messages.
         * @function encode
         * @memberof show.Votes
         * @static
         * @param {show.IVotes} message Votes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Votes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.average != null && Object.hasOwnProperty.call(message, "average"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.average);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.count);
            return writer;
        };

        /**
         * Encodes the specified Votes message, length delimited. Does not implicitly {@link show.Votes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Votes
         * @static
         * @param {show.IVotes} message Votes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Votes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Votes message from the specified reader or buffer.
         * @function decode
         * @memberof show.Votes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Votes} Votes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Votes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Votes();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.average = reader.double();
                    break;
                case 2:
                    message.count = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Votes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Votes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Votes} Votes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Votes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Votes message.
         * @function verify
         * @memberof show.Votes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Votes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.average != null && message.hasOwnProperty("average"))
                if (typeof message.average !== "number")
                    return "average: number expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            return null;
        };

        /**
         * Creates a Votes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Votes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Votes} Votes
         */
        Votes.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Votes)
                return object;
            let message = new $root.show.Votes();
            if (object.average != null)
                message.average = Number(object.average);
            if (object.count != null)
                message.count = object.count | 0;
            return message;
        };

        /**
         * Creates a plain object from a Votes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Votes
         * @static
         * @param {show.Votes} message Votes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Votes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.average = 0;
                object.count = 0;
            }
            if (message.average != null && message.hasOwnProperty("average"))
                object.average = options.json && !isFinite(message.average) ? String(message.average) : message.average;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            return object;
        };

        /**
         * Converts this Votes to JSON.
         * @function toJSON
         * @memberof show.Votes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Votes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Votes;
    })();

    show.Video = (function() {

        /**
         * Properties of a Video.
         * @memberof show
         * @interface IVideo
         * @property {string|null} [id] Video id
         * @property {string|null} [language] Video language
         * @property {string|null} [country] Video country
         * @property {string|null} [key] Video key
         * @property {string|null} [name] Video name
         * @property {string|null} [site] Video site
         * @property {number|null} [size] Video size
         * @property {show.Video.Type|null} [type] Video type
         */

        /**
         * Constructs a new Video.
         * @memberof show
         * @classdesc Represents a Video.
         * @implements IVideo
         * @constructor
         * @param {show.IVideo=} [properties] Properties to set
         */
        function Video(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Video id.
         * @member {string} id
         * @memberof show.Video
         * @instance
         */
        Video.prototype.id = "";

        /**
         * Video language.
         * @member {string} language
         * @memberof show.Video
         * @instance
         */
        Video.prototype.language = "";

        /**
         * Video country.
         * @member {string} country
         * @memberof show.Video
         * @instance
         */
        Video.prototype.country = "";

        /**
         * Video key.
         * @member {string} key
         * @memberof show.Video
         * @instance
         */
        Video.prototype.key = "";

        /**
         * Video name.
         * @member {string} name
         * @memberof show.Video
         * @instance
         */
        Video.prototype.name = "";

        /**
         * Video site.
         * @member {string} site
         * @memberof show.Video
         * @instance
         */
        Video.prototype.site = "";

        /**
         * Video size.
         * @member {number} size
         * @memberof show.Video
         * @instance
         */
        Video.prototype.size = 0;

        /**
         * Video type.
         * @member {show.Video.Type} type
         * @memberof show.Video
         * @instance
         */
        Video.prototype.type = 0;

        /**
         * Creates a new Video instance using the specified properties.
         * @function create
         * @memberof show.Video
         * @static
         * @param {show.IVideo=} [properties] Properties to set
         * @returns {show.Video} Video instance
         */
        Video.create = function create(properties) {
            return new Video(properties);
        };

        /**
         * Encodes the specified Video message. Does not implicitly {@link show.Video.verify|verify} messages.
         * @function encode
         * @memberof show.Video
         * @static
         * @param {show.IVideo} message Video message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Video.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.language != null && Object.hasOwnProperty.call(message, "language"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.language);
            if (message.country != null && Object.hasOwnProperty.call(message, "country"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.country);
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.key);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.name);
            if (message.site != null && Object.hasOwnProperty.call(message, "site"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.site);
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.size);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified Video message, length delimited. Does not implicitly {@link show.Video.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Video
         * @static
         * @param {show.IVideo} message Video message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Video.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Video message from the specified reader or buffer.
         * @function decode
         * @memberof show.Video
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Video} Video
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Video.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Video();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.language = reader.string();
                    break;
                case 3:
                    message.country = reader.string();
                    break;
                case 4:
                    message.key = reader.string();
                    break;
                case 5:
                    message.name = reader.string();
                    break;
                case 6:
                    message.site = reader.string();
                    break;
                case 7:
                    message.size = reader.int32();
                    break;
                case 8:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Video message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Video
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Video} Video
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Video.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Video message.
         * @function verify
         * @memberof show.Video
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Video.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.language != null && message.hasOwnProperty("language"))
                if (!$util.isString(message.language))
                    return "language: string expected";
            if (message.country != null && message.hasOwnProperty("country"))
                if (!$util.isString(message.country))
                    return "country: string expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.site != null && message.hasOwnProperty("site"))
                if (!$util.isString(message.site))
                    return "site: string expected";
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            return null;
        };

        /**
         * Creates a Video message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Video
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Video} Video
         */
        Video.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Video)
                return object;
            let message = new $root.show.Video();
            if (object.id != null)
                message.id = String(object.id);
            if (object.language != null)
                message.language = String(object.language);
            if (object.country != null)
                message.country = String(object.country);
            if (object.key != null)
                message.key = String(object.key);
            if (object.name != null)
                message.name = String(object.name);
            if (object.site != null)
                message.site = String(object.site);
            if (object.size != null)
                message.size = object.size | 0;
            switch (object.type) {
            case "Trailer":
            case 0:
                message.type = 0;
                break;
            case "Teaser":
            case 1:
                message.type = 1;
                break;
            case "Clip":
            case 2:
                message.type = 2;
                break;
            case "Featurette":
            case 3:
                message.type = 3;
                break;
            case "BehindtheScenes":
            case 4:
                message.type = 4;
                break;
            case "Bloopers":
            case 5:
                message.type = 5;
                break;
            case "OpeningCredits":
            case 6:
                message.type = 6;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Video message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Video
         * @static
         * @param {show.Video} message Video
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Video.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.language = "";
                object.country = "";
                object.key = "";
                object.name = "";
                object.site = "";
                object.size = 0;
                object.type = options.enums === String ? "Trailer" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.language != null && message.hasOwnProperty("language"))
                object.language = message.language;
            if (message.country != null && message.hasOwnProperty("country"))
                object.country = message.country;
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = message.key;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.site != null && message.hasOwnProperty("site"))
                object.site = message.site;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.show.Video.Type[message.type] : message.type;
            return object;
        };

        /**
         * Converts this Video to JSON.
         * @function toJSON
         * @memberof show.Video
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Video.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Type enum.
         * @name show.Video.Type
         * @enum {number}
         * @property {number} Trailer=0 Trailer value
         * @property {number} Teaser=1 Teaser value
         * @property {number} Clip=2 Clip value
         * @property {number} Featurette=3 Featurette value
         * @property {number} BehindtheScenes=4 BehindtheScenes value
         * @property {number} Bloopers=5 Bloopers value
         * @property {number} OpeningCredits=6 OpeningCredits value
         */
        Video.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Trailer"] = 0;
            values[valuesById[1] = "Teaser"] = 1;
            values[valuesById[2] = "Clip"] = 2;
            values[valuesById[3] = "Featurette"] = 3;
            values[valuesById[4] = "BehindtheScenes"] = 4;
            values[valuesById[5] = "Bloopers"] = 5;
            values[valuesById[6] = "OpeningCredits"] = 6;
            return values;
        })();

        return Video;
    })();

    show.Image = (function() {

        /**
         * Properties of an Image.
         * @memberof show
         * @interface IImage
         * @property {string|null} [filePath] Image filePath
         * @property {number|null} [aspectRatio] Image aspectRatio
         * @property {number|null} [height] Image height
         * @property {number|null} [width] Image width
         * @property {show.IVotes|null} [votes] Image votes
         * @property {string|null} [language] Image language
         */

        /**
         * Constructs a new Image.
         * @memberof show
         * @classdesc Represents an Image.
         * @implements IImage
         * @constructor
         * @param {show.IImage=} [properties] Properties to set
         */
        function Image(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Image filePath.
         * @member {string} filePath
         * @memberof show.Image
         * @instance
         */
        Image.prototype.filePath = "";

        /**
         * Image aspectRatio.
         * @member {number} aspectRatio
         * @memberof show.Image
         * @instance
         */
        Image.prototype.aspectRatio = 0;

        /**
         * Image height.
         * @member {number} height
         * @memberof show.Image
         * @instance
         */
        Image.prototype.height = 0;

        /**
         * Image width.
         * @member {number} width
         * @memberof show.Image
         * @instance
         */
        Image.prototype.width = 0;

        /**
         * Image votes.
         * @member {show.IVotes|null|undefined} votes
         * @memberof show.Image
         * @instance
         */
        Image.prototype.votes = null;

        /**
         * Image language.
         * @member {string} language
         * @memberof show.Image
         * @instance
         */
        Image.prototype.language = "";

        /**
         * Creates a new Image instance using the specified properties.
         * @function create
         * @memberof show.Image
         * @static
         * @param {show.IImage=} [properties] Properties to set
         * @returns {show.Image} Image instance
         */
        Image.create = function create(properties) {
            return new Image(properties);
        };

        /**
         * Encodes the specified Image message. Does not implicitly {@link show.Image.verify|verify} messages.
         * @function encode
         * @memberof show.Image
         * @static
         * @param {show.IImage} message Image message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Image.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.filePath != null && Object.hasOwnProperty.call(message, "filePath"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.filePath);
            if (message.aspectRatio != null && Object.hasOwnProperty.call(message, "aspectRatio"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.aspectRatio);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.height);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.width);
            if (message.votes != null && Object.hasOwnProperty.call(message, "votes"))
                $root.show.Votes.encode(message.votes, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.language != null && Object.hasOwnProperty.call(message, "language"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.language);
            return writer;
        };

        /**
         * Encodes the specified Image message, length delimited. Does not implicitly {@link show.Image.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Image
         * @static
         * @param {show.IImage} message Image message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Image.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Image message from the specified reader or buffer.
         * @function decode
         * @memberof show.Image
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Image} Image
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Image.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Image();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.filePath = reader.string();
                    break;
                case 2:
                    message.aspectRatio = reader.double();
                    break;
                case 3:
                    message.height = reader.int32();
                    break;
                case 4:
                    message.width = reader.int32();
                    break;
                case 5:
                    message.votes = $root.show.Votes.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.language = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Image message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Image
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Image} Image
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Image.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Image message.
         * @function verify
         * @memberof show.Image
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Image.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.filePath != null && message.hasOwnProperty("filePath"))
                if (!$util.isString(message.filePath))
                    return "filePath: string expected";
            if (message.aspectRatio != null && message.hasOwnProperty("aspectRatio"))
                if (typeof message.aspectRatio !== "number")
                    return "aspectRatio: number expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height))
                    return "height: integer expected";
            if (message.width != null && message.hasOwnProperty("width"))
                if (!$util.isInteger(message.width))
                    return "width: integer expected";
            if (message.votes != null && message.hasOwnProperty("votes")) {
                let error = $root.show.Votes.verify(message.votes);
                if (error)
                    return "votes." + error;
            }
            if (message.language != null && message.hasOwnProperty("language"))
                if (!$util.isString(message.language))
                    return "language: string expected";
            return null;
        };

        /**
         * Creates an Image message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Image
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Image} Image
         */
        Image.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Image)
                return object;
            let message = new $root.show.Image();
            if (object.filePath != null)
                message.filePath = String(object.filePath);
            if (object.aspectRatio != null)
                message.aspectRatio = Number(object.aspectRatio);
            if (object.height != null)
                message.height = object.height | 0;
            if (object.width != null)
                message.width = object.width | 0;
            if (object.votes != null) {
                if (typeof object.votes !== "object")
                    throw TypeError(".show.Image.votes: object expected");
                message.votes = $root.show.Votes.fromObject(object.votes);
            }
            if (object.language != null)
                message.language = String(object.language);
            return message;
        };

        /**
         * Creates a plain object from an Image message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Image
         * @static
         * @param {show.Image} message Image
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Image.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.filePath = "";
                object.aspectRatio = 0;
                object.height = 0;
                object.width = 0;
                object.votes = null;
                object.language = "";
            }
            if (message.filePath != null && message.hasOwnProperty("filePath"))
                object.filePath = message.filePath;
            if (message.aspectRatio != null && message.hasOwnProperty("aspectRatio"))
                object.aspectRatio = options.json && !isFinite(message.aspectRatio) ? String(message.aspectRatio) : message.aspectRatio;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = message.height;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = message.width;
            if (message.votes != null && message.hasOwnProperty("votes"))
                object.votes = $root.show.Votes.toObject(message.votes, options);
            if (message.language != null && message.hasOwnProperty("language"))
                object.language = message.language;
            return object;
        };

        /**
         * Converts this Image to JSON.
         * @function toJSON
         * @memberof show.Image
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Image.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Image;
    })();

    show.Watch = (function() {

        /**
         * Properties of a Watch.
         * @memberof show
         * @interface IWatch
         * @property {string|null} [language] Watch language
         * @property {string|null} [link] Watch link
         * @property {Array.<show.Watch.IProvider>|null} [rent] Watch rent
         * @property {Array.<show.Watch.IProvider>|null} [buy] Watch buy
         */

        /**
         * Constructs a new Watch.
         * @memberof show
         * @classdesc Represents a Watch.
         * @implements IWatch
         * @constructor
         * @param {show.IWatch=} [properties] Properties to set
         */
        function Watch(properties) {
            this.rent = [];
            this.buy = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Watch language.
         * @member {string} language
         * @memberof show.Watch
         * @instance
         */
        Watch.prototype.language = "";

        /**
         * Watch link.
         * @member {string} link
         * @memberof show.Watch
         * @instance
         */
        Watch.prototype.link = "";

        /**
         * Watch rent.
         * @member {Array.<show.Watch.IProvider>} rent
         * @memberof show.Watch
         * @instance
         */
        Watch.prototype.rent = $util.emptyArray;

        /**
         * Watch buy.
         * @member {Array.<show.Watch.IProvider>} buy
         * @memberof show.Watch
         * @instance
         */
        Watch.prototype.buy = $util.emptyArray;

        /**
         * Creates a new Watch instance using the specified properties.
         * @function create
         * @memberof show.Watch
         * @static
         * @param {show.IWatch=} [properties] Properties to set
         * @returns {show.Watch} Watch instance
         */
        Watch.create = function create(properties) {
            return new Watch(properties);
        };

        /**
         * Encodes the specified Watch message. Does not implicitly {@link show.Watch.verify|verify} messages.
         * @function encode
         * @memberof show.Watch
         * @static
         * @param {show.IWatch} message Watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Watch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.language != null && Object.hasOwnProperty.call(message, "language"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.language);
            if (message.link != null && Object.hasOwnProperty.call(message, "link"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.link);
            if (message.rent != null && message.rent.length)
                for (let i = 0; i < message.rent.length; ++i)
                    $root.show.Watch.Provider.encode(message.rent[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.buy != null && message.buy.length)
                for (let i = 0; i < message.buy.length; ++i)
                    $root.show.Watch.Provider.encode(message.buy[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Watch message, length delimited. Does not implicitly {@link show.Watch.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Watch
         * @static
         * @param {show.IWatch} message Watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Watch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Watch message from the specified reader or buffer.
         * @function decode
         * @memberof show.Watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Watch} Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Watch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Watch();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.language = reader.string();
                    break;
                case 2:
                    message.link = reader.string();
                    break;
                case 3:
                    if (!(message.rent && message.rent.length))
                        message.rent = [];
                    message.rent.push($root.show.Watch.Provider.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.buy && message.buy.length))
                        message.buy = [];
                    message.buy.push($root.show.Watch.Provider.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Watch message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Watch} Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Watch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Watch message.
         * @function verify
         * @memberof show.Watch
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Watch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.language != null && message.hasOwnProperty("language"))
                if (!$util.isString(message.language))
                    return "language: string expected";
            if (message.link != null && message.hasOwnProperty("link"))
                if (!$util.isString(message.link))
                    return "link: string expected";
            if (message.rent != null && message.hasOwnProperty("rent")) {
                if (!Array.isArray(message.rent))
                    return "rent: array expected";
                for (let i = 0; i < message.rent.length; ++i) {
                    let error = $root.show.Watch.Provider.verify(message.rent[i]);
                    if (error)
                        return "rent." + error;
                }
            }
            if (message.buy != null && message.hasOwnProperty("buy")) {
                if (!Array.isArray(message.buy))
                    return "buy: array expected";
                for (let i = 0; i < message.buy.length; ++i) {
                    let error = $root.show.Watch.Provider.verify(message.buy[i]);
                    if (error)
                        return "buy." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Watch message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Watch
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Watch} Watch
         */
        Watch.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Watch)
                return object;
            let message = new $root.show.Watch();
            if (object.language != null)
                message.language = String(object.language);
            if (object.link != null)
                message.link = String(object.link);
            if (object.rent) {
                if (!Array.isArray(object.rent))
                    throw TypeError(".show.Watch.rent: array expected");
                message.rent = [];
                for (let i = 0; i < object.rent.length; ++i) {
                    if (typeof object.rent[i] !== "object")
                        throw TypeError(".show.Watch.rent: object expected");
                    message.rent[i] = $root.show.Watch.Provider.fromObject(object.rent[i]);
                }
            }
            if (object.buy) {
                if (!Array.isArray(object.buy))
                    throw TypeError(".show.Watch.buy: array expected");
                message.buy = [];
                for (let i = 0; i < object.buy.length; ++i) {
                    if (typeof object.buy[i] !== "object")
                        throw TypeError(".show.Watch.buy: object expected");
                    message.buy[i] = $root.show.Watch.Provider.fromObject(object.buy[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Watch message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Watch
         * @static
         * @param {show.Watch} message Watch
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Watch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.rent = [];
                object.buy = [];
            }
            if (options.defaults) {
                object.language = "";
                object.link = "";
            }
            if (message.language != null && message.hasOwnProperty("language"))
                object.language = message.language;
            if (message.link != null && message.hasOwnProperty("link"))
                object.link = message.link;
            if (message.rent && message.rent.length) {
                object.rent = [];
                for (let j = 0; j < message.rent.length; ++j)
                    object.rent[j] = $root.show.Watch.Provider.toObject(message.rent[j], options);
            }
            if (message.buy && message.buy.length) {
                object.buy = [];
                for (let j = 0; j < message.buy.length; ++j)
                    object.buy[j] = $root.show.Watch.Provider.toObject(message.buy[j], options);
            }
            return object;
        };

        /**
         * Converts this Watch to JSON.
         * @function toJSON
         * @memberof show.Watch
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Watch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Watch.Provider = (function() {

            /**
             * Properties of a Provider.
             * @memberof show.Watch
             * @interface IProvider
             * @property {number|null} [id] Provider id
             * @property {number|null} [priority] Provider priority
             * @property {string|null} [logoPath] Provider logoPath
             * @property {string|null} [name] Provider name
             */

            /**
             * Constructs a new Provider.
             * @memberof show.Watch
             * @classdesc Represents a Provider.
             * @implements IProvider
             * @constructor
             * @param {show.Watch.IProvider=} [properties] Properties to set
             */
            function Provider(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Provider id.
             * @member {number} id
             * @memberof show.Watch.Provider
             * @instance
             */
            Provider.prototype.id = 0;

            /**
             * Provider priority.
             * @member {number} priority
             * @memberof show.Watch.Provider
             * @instance
             */
            Provider.prototype.priority = 0;

            /**
             * Provider logoPath.
             * @member {string} logoPath
             * @memberof show.Watch.Provider
             * @instance
             */
            Provider.prototype.logoPath = "";

            /**
             * Provider name.
             * @member {string} name
             * @memberof show.Watch.Provider
             * @instance
             */
            Provider.prototype.name = "";

            /**
             * Creates a new Provider instance using the specified properties.
             * @function create
             * @memberof show.Watch.Provider
             * @static
             * @param {show.Watch.IProvider=} [properties] Properties to set
             * @returns {show.Watch.Provider} Provider instance
             */
            Provider.create = function create(properties) {
                return new Provider(properties);
            };

            /**
             * Encodes the specified Provider message. Does not implicitly {@link show.Watch.Provider.verify|verify} messages.
             * @function encode
             * @memberof show.Watch.Provider
             * @static
             * @param {show.Watch.IProvider} message Provider message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Provider.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.priority != null && Object.hasOwnProperty.call(message, "priority"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.priority);
                if (message.logoPath != null && Object.hasOwnProperty.call(message, "logoPath"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.logoPath);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified Provider message, length delimited. Does not implicitly {@link show.Watch.Provider.verify|verify} messages.
             * @function encodeDelimited
             * @memberof show.Watch.Provider
             * @static
             * @param {show.Watch.IProvider} message Provider message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Provider.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Provider message from the specified reader or buffer.
             * @function decode
             * @memberof show.Watch.Provider
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {show.Watch.Provider} Provider
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Provider.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Watch.Provider();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.priority = reader.int32();
                        break;
                    case 3:
                        message.logoPath = reader.string();
                        break;
                    case 4:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Provider message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof show.Watch.Provider
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {show.Watch.Provider} Provider
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Provider.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Provider message.
             * @function verify
             * @memberof show.Watch.Provider
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Provider.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.priority != null && message.hasOwnProperty("priority"))
                    if (!$util.isInteger(message.priority))
                        return "priority: integer expected";
                if (message.logoPath != null && message.hasOwnProperty("logoPath"))
                    if (!$util.isString(message.logoPath))
                        return "logoPath: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a Provider message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof show.Watch.Provider
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {show.Watch.Provider} Provider
             */
            Provider.fromObject = function fromObject(object) {
                if (object instanceof $root.show.Watch.Provider)
                    return object;
                let message = new $root.show.Watch.Provider();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.priority != null)
                    message.priority = object.priority | 0;
                if (object.logoPath != null)
                    message.logoPath = String(object.logoPath);
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a Provider message. Also converts values to other types if specified.
             * @function toObject
             * @memberof show.Watch.Provider
             * @static
             * @param {show.Watch.Provider} message Provider
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Provider.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.priority = 0;
                    object.logoPath = "";
                    object.name = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.priority != null && message.hasOwnProperty("priority"))
                    object.priority = message.priority;
                if (message.logoPath != null && message.hasOwnProperty("logoPath"))
                    object.logoPath = message.logoPath;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this Provider to JSON.
             * @function toJSON
             * @memberof show.Watch.Provider
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Provider.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Provider;
        })();

        return Watch;
    })();

    show.Cast = (function() {

        /**
         * Properties of a Cast.
         * @memberof show
         * @interface ICast
         * @property {number|null} [id] Cast id
         * @property {string|null} [name] Cast name
         * @property {string|null} [character] Cast character
         * @property {string|null} [profilePath] Cast profilePath
         */

        /**
         * Constructs a new Cast.
         * @memberof show
         * @classdesc Represents a Cast.
         * @implements ICast
         * @constructor
         * @param {show.ICast=} [properties] Properties to set
         */
        function Cast(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Cast id.
         * @member {number} id
         * @memberof show.Cast
         * @instance
         */
        Cast.prototype.id = 0;

        /**
         * Cast name.
         * @member {string} name
         * @memberof show.Cast
         * @instance
         */
        Cast.prototype.name = "";

        /**
         * Cast character.
         * @member {string} character
         * @memberof show.Cast
         * @instance
         */
        Cast.prototype.character = "";

        /**
         * Cast profilePath.
         * @member {string} profilePath
         * @memberof show.Cast
         * @instance
         */
        Cast.prototype.profilePath = "";

        /**
         * Creates a new Cast instance using the specified properties.
         * @function create
         * @memberof show.Cast
         * @static
         * @param {show.ICast=} [properties] Properties to set
         * @returns {show.Cast} Cast instance
         */
        Cast.create = function create(properties) {
            return new Cast(properties);
        };

        /**
         * Encodes the specified Cast message. Does not implicitly {@link show.Cast.verify|verify} messages.
         * @function encode
         * @memberof show.Cast
         * @static
         * @param {show.ICast} message Cast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Cast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.character != null && Object.hasOwnProperty.call(message, "character"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.character);
            if (message.profilePath != null && Object.hasOwnProperty.call(message, "profilePath"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.profilePath);
            return writer;
        };

        /**
         * Encodes the specified Cast message, length delimited. Does not implicitly {@link show.Cast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Cast
         * @static
         * @param {show.ICast} message Cast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Cast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Cast message from the specified reader or buffer.
         * @function decode
         * @memberof show.Cast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Cast} Cast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Cast();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.character = reader.string();
                    break;
                case 4:
                    message.profilePath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Cast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Cast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Cast} Cast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Cast message.
         * @function verify
         * @memberof show.Cast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Cast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.character != null && message.hasOwnProperty("character"))
                if (!$util.isString(message.character))
                    return "character: string expected";
            if (message.profilePath != null && message.hasOwnProperty("profilePath"))
                if (!$util.isString(message.profilePath))
                    return "profilePath: string expected";
            return null;
        };

        /**
         * Creates a Cast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Cast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Cast} Cast
         */
        Cast.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Cast)
                return object;
            let message = new $root.show.Cast();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.character != null)
                message.character = String(object.character);
            if (object.profilePath != null)
                message.profilePath = String(object.profilePath);
            return message;
        };

        /**
         * Creates a plain object from a Cast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Cast
         * @static
         * @param {show.Cast} message Cast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Cast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
                object.character = "";
                object.profilePath = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.character != null && message.hasOwnProperty("character"))
                object.character = message.character;
            if (message.profilePath != null && message.hasOwnProperty("profilePath"))
                object.profilePath = message.profilePath;
            return object;
        };

        /**
         * Converts this Cast to JSON.
         * @function toJSON
         * @memberof show.Cast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Cast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Cast;
    })();

    show.Crew = (function() {

        /**
         * Properties of a Crew.
         * @memberof show
         * @interface ICrew
         * @property {number|null} [id] Crew id
         * @property {string|null} [name] Crew name
         * @property {string|null} [job] Crew job
         * @property {string|null} [profilePath] Crew profilePath
         */

        /**
         * Constructs a new Crew.
         * @memberof show
         * @classdesc Represents a Crew.
         * @implements ICrew
         * @constructor
         * @param {show.ICrew=} [properties] Properties to set
         */
        function Crew(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Crew id.
         * @member {number} id
         * @memberof show.Crew
         * @instance
         */
        Crew.prototype.id = 0;

        /**
         * Crew name.
         * @member {string} name
         * @memberof show.Crew
         * @instance
         */
        Crew.prototype.name = "";

        /**
         * Crew job.
         * @member {string} job
         * @memberof show.Crew
         * @instance
         */
        Crew.prototype.job = "";

        /**
         * Crew profilePath.
         * @member {string} profilePath
         * @memberof show.Crew
         * @instance
         */
        Crew.prototype.profilePath = "";

        /**
         * Creates a new Crew instance using the specified properties.
         * @function create
         * @memberof show.Crew
         * @static
         * @param {show.ICrew=} [properties] Properties to set
         * @returns {show.Crew} Crew instance
         */
        Crew.create = function create(properties) {
            return new Crew(properties);
        };

        /**
         * Encodes the specified Crew message. Does not implicitly {@link show.Crew.verify|verify} messages.
         * @function encode
         * @memberof show.Crew
         * @static
         * @param {show.ICrew} message Crew message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Crew.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.job != null && Object.hasOwnProperty.call(message, "job"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.job);
            if (message.profilePath != null && Object.hasOwnProperty.call(message, "profilePath"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.profilePath);
            return writer;
        };

        /**
         * Encodes the specified Crew message, length delimited. Does not implicitly {@link show.Crew.verify|verify} messages.
         * @function encodeDelimited
         * @memberof show.Crew
         * @static
         * @param {show.ICrew} message Crew message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Crew.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Crew message from the specified reader or buffer.
         * @function decode
         * @memberof show.Crew
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {show.Crew} Crew
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Crew.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.show.Crew();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.job = reader.string();
                    break;
                case 4:
                    message.profilePath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Crew message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof show.Crew
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {show.Crew} Crew
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Crew.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Crew message.
         * @function verify
         * @memberof show.Crew
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Crew.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.job != null && message.hasOwnProperty("job"))
                if (!$util.isString(message.job))
                    return "job: string expected";
            if (message.profilePath != null && message.hasOwnProperty("profilePath"))
                if (!$util.isString(message.profilePath))
                    return "profilePath: string expected";
            return null;
        };

        /**
         * Creates a Crew message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof show.Crew
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {show.Crew} Crew
         */
        Crew.fromObject = function fromObject(object) {
            if (object instanceof $root.show.Crew)
                return object;
            let message = new $root.show.Crew();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.job != null)
                message.job = String(object.job);
            if (object.profilePath != null)
                message.profilePath = String(object.profilePath);
            return message;
        };

        /**
         * Creates a plain object from a Crew message. Also converts values to other types if specified.
         * @function toObject
         * @memberof show.Crew
         * @static
         * @param {show.Crew} message Crew
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Crew.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
                object.job = "";
                object.profilePath = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.job != null && message.hasOwnProperty("job"))
                object.job = message.job;
            if (message.profilePath != null && message.hasOwnProperty("profilePath"))
                object.profilePath = message.profilePath;
            return object;
        };

        /**
         * Converts this Crew to JSON.
         * @function toJSON
         * @memberof show.Crew
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Crew.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Crew;
    })();

    return show;
})();

export const user = $root.user = (() => {

    /**
     * Namespace user.
     * @exports user
     * @namespace
     */
    const user = {};

    user.Detail = (function() {

        /**
         * Properties of a Detail.
         * @memberof user
         * @interface IDetail
         * @property {string|null} [id] Detail id
         * @property {string|null} [email] Detail email
         * @property {string|null} [first] Detail first
         * @property {string|null} [last] Detail last
         * @property {Array.<show.IGenre>|null} [genres] Detail genres
         */

        /**
         * Constructs a new Detail.
         * @memberof user
         * @classdesc Represents a Detail.
         * @implements IDetail
         * @constructor
         * @param {user.IDetail=} [properties] Properties to set
         */
        function Detail(properties) {
            this.genres = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Detail id.
         * @member {string} id
         * @memberof user.Detail
         * @instance
         */
        Detail.prototype.id = "";

        /**
         * Detail email.
         * @member {string} email
         * @memberof user.Detail
         * @instance
         */
        Detail.prototype.email = "";

        /**
         * Detail first.
         * @member {string} first
         * @memberof user.Detail
         * @instance
         */
        Detail.prototype.first = "";

        /**
         * Detail last.
         * @member {string} last
         * @memberof user.Detail
         * @instance
         */
        Detail.prototype.last = "";

        /**
         * Detail genres.
         * @member {Array.<show.IGenre>} genres
         * @memberof user.Detail
         * @instance
         */
        Detail.prototype.genres = $util.emptyArray;

        /**
         * Creates a new Detail instance using the specified properties.
         * @function create
         * @memberof user.Detail
         * @static
         * @param {user.IDetail=} [properties] Properties to set
         * @returns {user.Detail} Detail instance
         */
        Detail.create = function create(properties) {
            return new Detail(properties);
        };

        /**
         * Encodes the specified Detail message. Does not implicitly {@link user.Detail.verify|verify} messages.
         * @function encode
         * @memberof user.Detail
         * @static
         * @param {user.IDetail} message Detail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Detail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.email);
            if (message.first != null && Object.hasOwnProperty.call(message, "first"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.first);
            if (message.last != null && Object.hasOwnProperty.call(message, "last"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.last);
            if (message.genres != null && message.genres.length)
                for (let i = 0; i < message.genres.length; ++i)
                    $root.show.Genre.encode(message.genres[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Detail message, length delimited. Does not implicitly {@link user.Detail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof user.Detail
         * @static
         * @param {user.IDetail} message Detail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Detail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Detail message from the specified reader or buffer.
         * @function decode
         * @memberof user.Detail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {user.Detail} Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Detail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.user.Detail();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.email = reader.string();
                    break;
                case 3:
                    message.first = reader.string();
                    break;
                case 4:
                    message.last = reader.string();
                    break;
                case 5:
                    if (!(message.genres && message.genres.length))
                        message.genres = [];
                    message.genres.push($root.show.Genre.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Detail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof user.Detail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {user.Detail} Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Detail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Detail message.
         * @function verify
         * @memberof user.Detail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Detail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.first != null && message.hasOwnProperty("first"))
                if (!$util.isString(message.first))
                    return "first: string expected";
            if (message.last != null && message.hasOwnProperty("last"))
                if (!$util.isString(message.last))
                    return "last: string expected";
            if (message.genres != null && message.hasOwnProperty("genres")) {
                if (!Array.isArray(message.genres))
                    return "genres: array expected";
                for (let i = 0; i < message.genres.length; ++i) {
                    let error = $root.show.Genre.verify(message.genres[i]);
                    if (error)
                        return "genres." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Detail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof user.Detail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {user.Detail} Detail
         */
        Detail.fromObject = function fromObject(object) {
            if (object instanceof $root.user.Detail)
                return object;
            let message = new $root.user.Detail();
            if (object.id != null)
                message.id = String(object.id);
            if (object.email != null)
                message.email = String(object.email);
            if (object.first != null)
                message.first = String(object.first);
            if (object.last != null)
                message.last = String(object.last);
            if (object.genres) {
                if (!Array.isArray(object.genres))
                    throw TypeError(".user.Detail.genres: array expected");
                message.genres = [];
                for (let i = 0; i < object.genres.length; ++i) {
                    if (typeof object.genres[i] !== "object")
                        throw TypeError(".user.Detail.genres: object expected");
                    message.genres[i] = $root.show.Genre.fromObject(object.genres[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Detail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof user.Detail
         * @static
         * @param {user.Detail} message Detail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Detail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.genres = [];
            if (options.defaults) {
                object.id = "";
                object.email = "";
                object.first = "";
                object.last = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.first != null && message.hasOwnProperty("first"))
                object.first = message.first;
            if (message.last != null && message.hasOwnProperty("last"))
                object.last = message.last;
            if (message.genres && message.genres.length) {
                object.genres = [];
                for (let j = 0; j < message.genres.length; ++j)
                    object.genres[j] = $root.show.Genre.toObject(message.genres[j], options);
            }
            return object;
        };

        /**
         * Converts this Detail to JSON.
         * @function toJSON
         * @memberof user.Detail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Detail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Detail;
    })();

    user.Register = (function() {

        /**
         * Properties of a Register.
         * @memberof user
         * @interface IRegister
         * @property {string|null} [email] Register email
         * @property {string|null} [password] Register password
         * @property {string|null} [first] Register first
         * @property {string|null} [last] Register last
         */

        /**
         * Constructs a new Register.
         * @memberof user
         * @classdesc Represents a Register.
         * @implements IRegister
         * @constructor
         * @param {user.IRegister=} [properties] Properties to set
         */
        function Register(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Register email.
         * @member {string} email
         * @memberof user.Register
         * @instance
         */
        Register.prototype.email = "";

        /**
         * Register password.
         * @member {string} password
         * @memberof user.Register
         * @instance
         */
        Register.prototype.password = "";

        /**
         * Register first.
         * @member {string} first
         * @memberof user.Register
         * @instance
         */
        Register.prototype.first = "";

        /**
         * Register last.
         * @member {string} last
         * @memberof user.Register
         * @instance
         */
        Register.prototype.last = "";

        /**
         * Creates a new Register instance using the specified properties.
         * @function create
         * @memberof user.Register
         * @static
         * @param {user.IRegister=} [properties] Properties to set
         * @returns {user.Register} Register instance
         */
        Register.create = function create(properties) {
            return new Register(properties);
        };

        /**
         * Encodes the specified Register message. Does not implicitly {@link user.Register.verify|verify} messages.
         * @function encode
         * @memberof user.Register
         * @static
         * @param {user.IRegister} message Register message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Register.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            if (message.first != null && Object.hasOwnProperty.call(message, "first"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.first);
            if (message.last != null && Object.hasOwnProperty.call(message, "last"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.last);
            return writer;
        };

        /**
         * Encodes the specified Register message, length delimited. Does not implicitly {@link user.Register.verify|verify} messages.
         * @function encodeDelimited
         * @memberof user.Register
         * @static
         * @param {user.IRegister} message Register message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Register.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Register message from the specified reader or buffer.
         * @function decode
         * @memberof user.Register
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {user.Register} Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Register.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.user.Register();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.email = reader.string();
                    break;
                case 2:
                    message.password = reader.string();
                    break;
                case 3:
                    message.first = reader.string();
                    break;
                case 4:
                    message.last = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Register message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof user.Register
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {user.Register} Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Register.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Register message.
         * @function verify
         * @memberof user.Register
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Register.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            if (message.first != null && message.hasOwnProperty("first"))
                if (!$util.isString(message.first))
                    return "first: string expected";
            if (message.last != null && message.hasOwnProperty("last"))
                if (!$util.isString(message.last))
                    return "last: string expected";
            return null;
        };

        /**
         * Creates a Register message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof user.Register
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {user.Register} Register
         */
        Register.fromObject = function fromObject(object) {
            if (object instanceof $root.user.Register)
                return object;
            let message = new $root.user.Register();
            if (object.email != null)
                message.email = String(object.email);
            if (object.password != null)
                message.password = String(object.password);
            if (object.first != null)
                message.first = String(object.first);
            if (object.last != null)
                message.last = String(object.last);
            return message;
        };

        /**
         * Creates a plain object from a Register message. Also converts values to other types if specified.
         * @function toObject
         * @memberof user.Register
         * @static
         * @param {user.Register} message Register
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Register.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.email = "";
                object.password = "";
                object.first = "";
                object.last = "";
            }
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            if (message.first != null && message.hasOwnProperty("first"))
                object.first = message.first;
            if (message.last != null && message.hasOwnProperty("last"))
                object.last = message.last;
            return object;
        };

        /**
         * Converts this Register to JSON.
         * @function toJSON
         * @memberof user.Register
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Register.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Register;
    })();

    user.Update = (function() {

        /**
         * Properties of an Update.
         * @memberof user
         * @interface IUpdate
         * @property {string|null} [email] Update email
         * @property {string|null} [password] Update password
         * @property {string|null} [first] Update first
         * @property {string|null} [last] Update last
         */

        /**
         * Constructs a new Update.
         * @memberof user
         * @classdesc Represents an Update.
         * @implements IUpdate
         * @constructor
         * @param {user.IUpdate=} [properties] Properties to set
         */
        function Update(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Update email.
         * @member {string} email
         * @memberof user.Update
         * @instance
         */
        Update.prototype.email = "";

        /**
         * Update password.
         * @member {string} password
         * @memberof user.Update
         * @instance
         */
        Update.prototype.password = "";

        /**
         * Update first.
         * @member {string} first
         * @memberof user.Update
         * @instance
         */
        Update.prototype.first = "";

        /**
         * Update last.
         * @member {string} last
         * @memberof user.Update
         * @instance
         */
        Update.prototype.last = "";

        /**
         * Creates a new Update instance using the specified properties.
         * @function create
         * @memberof user.Update
         * @static
         * @param {user.IUpdate=} [properties] Properties to set
         * @returns {user.Update} Update instance
         */
        Update.create = function create(properties) {
            return new Update(properties);
        };

        /**
         * Encodes the specified Update message. Does not implicitly {@link user.Update.verify|verify} messages.
         * @function encode
         * @memberof user.Update
         * @static
         * @param {user.IUpdate} message Update message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Update.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            if (message.first != null && Object.hasOwnProperty.call(message, "first"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.first);
            if (message.last != null && Object.hasOwnProperty.call(message, "last"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.last);
            return writer;
        };

        /**
         * Encodes the specified Update message, length delimited. Does not implicitly {@link user.Update.verify|verify} messages.
         * @function encodeDelimited
         * @memberof user.Update
         * @static
         * @param {user.IUpdate} message Update message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Update.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Update message from the specified reader or buffer.
         * @function decode
         * @memberof user.Update
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {user.Update} Update
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Update.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.user.Update();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.email = reader.string();
                    break;
                case 2:
                    message.password = reader.string();
                    break;
                case 3:
                    message.first = reader.string();
                    break;
                case 4:
                    message.last = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Update message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof user.Update
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {user.Update} Update
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Update.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Update message.
         * @function verify
         * @memberof user.Update
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Update.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            if (message.first != null && message.hasOwnProperty("first"))
                if (!$util.isString(message.first))
                    return "first: string expected";
            if (message.last != null && message.hasOwnProperty("last"))
                if (!$util.isString(message.last))
                    return "last: string expected";
            return null;
        };

        /**
         * Creates an Update message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof user.Update
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {user.Update} Update
         */
        Update.fromObject = function fromObject(object) {
            if (object instanceof $root.user.Update)
                return object;
            let message = new $root.user.Update();
            if (object.email != null)
                message.email = String(object.email);
            if (object.password != null)
                message.password = String(object.password);
            if (object.first != null)
                message.first = String(object.first);
            if (object.last != null)
                message.last = String(object.last);
            return message;
        };

        /**
         * Creates a plain object from an Update message. Also converts values to other types if specified.
         * @function toObject
         * @memberof user.Update
         * @static
         * @param {user.Update} message Update
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Update.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.email = "";
                object.password = "";
                object.first = "";
                object.last = "";
            }
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            if (message.first != null && message.hasOwnProperty("first"))
                object.first = message.first;
            if (message.last != null && message.hasOwnProperty("last"))
                object.last = message.last;
            return object;
        };

        /**
         * Converts this Update to JSON.
         * @function toJSON
         * @memberof user.Update
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Update.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Update;
    })();

    user.Login = (function() {

        /**
         * Properties of a Login.
         * @memberof user
         * @interface ILogin
         * @property {string|null} [email] Login email
         * @property {string|null} [password] Login password
         */

        /**
         * Constructs a new Login.
         * @memberof user
         * @classdesc Represents a Login.
         * @implements ILogin
         * @constructor
         * @param {user.ILogin=} [properties] Properties to set
         */
        function Login(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login email.
         * @member {string} email
         * @memberof user.Login
         * @instance
         */
        Login.prototype.email = "";

        /**
         * Login password.
         * @member {string} password
         * @memberof user.Login
         * @instance
         */
        Login.prototype.password = "";

        /**
         * Creates a new Login instance using the specified properties.
         * @function create
         * @memberof user.Login
         * @static
         * @param {user.ILogin=} [properties] Properties to set
         * @returns {user.Login} Login instance
         */
        Login.create = function create(properties) {
            return new Login(properties);
        };

        /**
         * Encodes the specified Login message. Does not implicitly {@link user.Login.verify|verify} messages.
         * @function encode
         * @memberof user.Login
         * @static
         * @param {user.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            return writer;
        };

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link user.Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof user.Login
         * @static
         * @param {user.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @function decode
         * @memberof user.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {user.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.user.Login();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.email = reader.string();
                    break;
                case 2:
                    message.password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof user.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {user.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login message.
         * @function verify
         * @memberof user.Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            return null;
        };

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof user.Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {user.Login} Login
         */
        Login.fromObject = function fromObject(object) {
            if (object instanceof $root.user.Login)
                return object;
            let message = new $root.user.Login();
            if (object.email != null)
                message.email = String(object.email);
            if (object.password != null)
                message.password = String(object.password);
            return message;
        };

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof user.Login
         * @static
         * @param {user.Login} message Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.email = "";
                object.password = "";
            }
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            return object;
        };

        /**
         * Converts this Login to JSON.
         * @function toJSON
         * @memberof user.Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login;
    })();

    user.DetailAndToken = (function() {

        /**
         * Properties of a DetailAndToken.
         * @memberof user
         * @interface IDetailAndToken
         * @property {string|null} [token] DetailAndToken token
         * @property {user.IDetail|null} [detail] DetailAndToken detail
         */

        /**
         * Constructs a new DetailAndToken.
         * @memberof user
         * @classdesc Represents a DetailAndToken.
         * @implements IDetailAndToken
         * @constructor
         * @param {user.IDetailAndToken=} [properties] Properties to set
         */
        function DetailAndToken(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DetailAndToken token.
         * @member {string} token
         * @memberof user.DetailAndToken
         * @instance
         */
        DetailAndToken.prototype.token = "";

        /**
         * DetailAndToken detail.
         * @member {user.IDetail|null|undefined} detail
         * @memberof user.DetailAndToken
         * @instance
         */
        DetailAndToken.prototype.detail = null;

        /**
         * Creates a new DetailAndToken instance using the specified properties.
         * @function create
         * @memberof user.DetailAndToken
         * @static
         * @param {user.IDetailAndToken=} [properties] Properties to set
         * @returns {user.DetailAndToken} DetailAndToken instance
         */
        DetailAndToken.create = function create(properties) {
            return new DetailAndToken(properties);
        };

        /**
         * Encodes the specified DetailAndToken message. Does not implicitly {@link user.DetailAndToken.verify|verify} messages.
         * @function encode
         * @memberof user.DetailAndToken
         * @static
         * @param {user.IDetailAndToken} message DetailAndToken message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DetailAndToken.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            if (message.detail != null && Object.hasOwnProperty.call(message, "detail"))
                $root.user.Detail.encode(message.detail, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DetailAndToken message, length delimited. Does not implicitly {@link user.DetailAndToken.verify|verify} messages.
         * @function encodeDelimited
         * @memberof user.DetailAndToken
         * @static
         * @param {user.IDetailAndToken} message DetailAndToken message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DetailAndToken.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DetailAndToken message from the specified reader or buffer.
         * @function decode
         * @memberof user.DetailAndToken
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {user.DetailAndToken} DetailAndToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DetailAndToken.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.user.DetailAndToken();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.detail = $root.user.Detail.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DetailAndToken message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof user.DetailAndToken
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {user.DetailAndToken} DetailAndToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DetailAndToken.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DetailAndToken message.
         * @function verify
         * @memberof user.DetailAndToken
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DetailAndToken.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.detail != null && message.hasOwnProperty("detail")) {
                let error = $root.user.Detail.verify(message.detail);
                if (error)
                    return "detail." + error;
            }
            return null;
        };

        /**
         * Creates a DetailAndToken message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof user.DetailAndToken
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {user.DetailAndToken} DetailAndToken
         */
        DetailAndToken.fromObject = function fromObject(object) {
            if (object instanceof $root.user.DetailAndToken)
                return object;
            let message = new $root.user.DetailAndToken();
            if (object.token != null)
                message.token = String(object.token);
            if (object.detail != null) {
                if (typeof object.detail !== "object")
                    throw TypeError(".user.DetailAndToken.detail: object expected");
                message.detail = $root.user.Detail.fromObject(object.detail);
            }
            return message;
        };

        /**
         * Creates a plain object from a DetailAndToken message. Also converts values to other types if specified.
         * @function toObject
         * @memberof user.DetailAndToken
         * @static
         * @param {user.DetailAndToken} message DetailAndToken
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DetailAndToken.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.token = "";
                object.detail = null;
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.detail != null && message.hasOwnProperty("detail"))
                object.detail = $root.user.Detail.toObject(message.detail, options);
            return object;
        };

        /**
         * Converts this DetailAndToken to JSON.
         * @function toJSON
         * @memberof user.DetailAndToken
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DetailAndToken.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DetailAndToken;
    })();

    return user;
})();

export { $root as default };
