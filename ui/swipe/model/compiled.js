/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const movie = $root.movie = (() => {

    /**
     * Namespace movie.
     * @exports movie
     * @namespace
     */
    const movie = {};

    movie.Detail = (function() {

        /**
         * Properties of a Detail.
         * @memberof movie
         * @interface IDetail
         * @property {number|null} [id] Detail id
         * @property {string|null} [title] Detail title
         * @property {string|null} [overview] Detail overview
         * @property {Array.<movie.IGenre>|null} [genres] Detail genres
         * @property {string|null} [originalLanguage] Detail originalLanguage
         * @property {string|null} [originalTitle] Detail originalTitle
         * @property {string|null} [posterPath] Detail posterPath
         * @property {string|null} [backdropPath] Detail backdropPath
         * @property {movie.IVotes|null} [votes] Detail votes
         * @property {string|null} [releaseDate] Detail releaseDate
         * @property {number|null} [popularity] Detail popularity
         * @property {string|null} [tagline] Detail tagline
         * @property {string|null} [imdbId] Detail imdbId
         * @property {movie.Detail.Status|null} [status] Detail status
         * @property {Array.<string>|null} [spokenLanguage] Detail spokenLanguage
         * @property {Array.<movie.IVideo>|null} [videos] Detail videos
         * @property {Array.<movie.IImage>|null} [posters] Detail posters
         * @property {Array.<number>|null} [recommendations] Detail recommendations
         * @property {Array.<number>|null} [similar] Detail similar
         * @property {Array.<movie.IWatch>|null} [watch] Detail watch
         */

        /**
         * Constructs a new Detail.
         * @memberof movie
         * @classdesc Represents a Detail.
         * @implements IDetail
         * @constructor
         * @param {movie.IDetail=} [properties] Properties to set
         */
        function Detail(properties) {
            this.genres = [];
            this.spokenLanguage = [];
            this.videos = [];
            this.posters = [];
            this.recommendations = [];
            this.similar = [];
            this.watch = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Detail id.
         * @member {number} id
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.id = 0;

        /**
         * Detail title.
         * @member {string} title
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.title = "";

        /**
         * Detail overview.
         * @member {string} overview
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.overview = "";

        /**
         * Detail genres.
         * @member {Array.<movie.IGenre>} genres
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.genres = $util.emptyArray;

        /**
         * Detail originalLanguage.
         * @member {string} originalLanguage
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.originalLanguage = "";

        /**
         * Detail originalTitle.
         * @member {string} originalTitle
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.originalTitle = "";

        /**
         * Detail posterPath.
         * @member {string} posterPath
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.posterPath = "";

        /**
         * Detail backdropPath.
         * @member {string} backdropPath
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.backdropPath = "";

        /**
         * Detail votes.
         * @member {movie.IVotes|null|undefined} votes
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.votes = null;

        /**
         * Detail releaseDate.
         * @member {string} releaseDate
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.releaseDate = "";

        /**
         * Detail popularity.
         * @member {number} popularity
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.popularity = 0;

        /**
         * Detail tagline.
         * @member {string} tagline
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.tagline = "";

        /**
         * Detail imdbId.
         * @member {string} imdbId
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.imdbId = "";

        /**
         * Detail status.
         * @member {movie.Detail.Status} status
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.status = 0;

        /**
         * Detail spokenLanguage.
         * @member {Array.<string>} spokenLanguage
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.spokenLanguage = $util.emptyArray;

        /**
         * Detail videos.
         * @member {Array.<movie.IVideo>} videos
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.videos = $util.emptyArray;

        /**
         * Detail posters.
         * @member {Array.<movie.IImage>} posters
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.posters = $util.emptyArray;

        /**
         * Detail recommendations.
         * @member {Array.<number>} recommendations
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.recommendations = $util.emptyArray;

        /**
         * Detail similar.
         * @member {Array.<number>} similar
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.similar = $util.emptyArray;

        /**
         * Detail watch.
         * @member {Array.<movie.IWatch>} watch
         * @memberof movie.Detail
         * @instance
         */
        Detail.prototype.watch = $util.emptyArray;

        /**
         * Creates a new Detail instance using the specified properties.
         * @function create
         * @memberof movie.Detail
         * @static
         * @param {movie.IDetail=} [properties] Properties to set
         * @returns {movie.Detail} Detail instance
         */
        Detail.create = function create(properties) {
            return new Detail(properties);
        };

        /**
         * Encodes the specified Detail message. Does not implicitly {@link movie.Detail.verify|verify} messages.
         * @function encode
         * @memberof movie.Detail
         * @static
         * @param {movie.IDetail} message Detail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Detail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.overview != null && Object.hasOwnProperty.call(message, "overview"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.overview);
            if (message.genres != null && message.genres.length)
                for (let i = 0; i < message.genres.length; ++i)
                    $root.movie.Genre.encode(message.genres[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.originalLanguage != null && Object.hasOwnProperty.call(message, "originalLanguage"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.originalLanguage);
            if (message.originalTitle != null && Object.hasOwnProperty.call(message, "originalTitle"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.originalTitle);
            if (message.posterPath != null && Object.hasOwnProperty.call(message, "posterPath"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.posterPath);
            if (message.backdropPath != null && Object.hasOwnProperty.call(message, "backdropPath"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.backdropPath);
            if (message.votes != null && Object.hasOwnProperty.call(message, "votes"))
                $root.movie.Votes.encode(message.votes, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.releaseDate != null && Object.hasOwnProperty.call(message, "releaseDate"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.releaseDate);
            if (message.popularity != null && Object.hasOwnProperty.call(message, "popularity"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.popularity);
            if (message.tagline != null && Object.hasOwnProperty.call(message, "tagline"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.tagline);
            if (message.imdbId != null && Object.hasOwnProperty.call(message, "imdbId"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.imdbId);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.status);
            if (message.spokenLanguage != null && message.spokenLanguage.length)
                for (let i = 0; i < message.spokenLanguage.length; ++i)
                    writer.uint32(/* id 15, wireType 2 =*/122).string(message.spokenLanguage[i]);
            if (message.videos != null && message.videos.length)
                for (let i = 0; i < message.videos.length; ++i)
                    $root.movie.Video.encode(message.videos[i], writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.posters != null && message.posters.length)
                for (let i = 0; i < message.posters.length; ++i)
                    $root.movie.Image.encode(message.posters[i], writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.recommendations != null && message.recommendations.length) {
                writer.uint32(/* id 18, wireType 2 =*/146).fork();
                for (let i = 0; i < message.recommendations.length; ++i)
                    writer.int32(message.recommendations[i]);
                writer.ldelim();
            }
            if (message.similar != null && message.similar.length) {
                writer.uint32(/* id 19, wireType 2 =*/154).fork();
                for (let i = 0; i < message.similar.length; ++i)
                    writer.int32(message.similar[i]);
                writer.ldelim();
            }
            if (message.watch != null && message.watch.length)
                for (let i = 0; i < message.watch.length; ++i)
                    $root.movie.Watch.encode(message.watch[i], writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Detail message, length delimited. Does not implicitly {@link movie.Detail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof movie.Detail
         * @static
         * @param {movie.IDetail} message Detail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Detail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Detail message from the specified reader or buffer.
         * @function decode
         * @memberof movie.Detail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {movie.Detail} Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Detail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.movie.Detail();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
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
                    message.genres.push($root.movie.Genre.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.originalLanguage = reader.string();
                    break;
                case 6:
                    message.originalTitle = reader.string();
                    break;
                case 7:
                    message.posterPath = reader.string();
                    break;
                case 8:
                    message.backdropPath = reader.string();
                    break;
                case 9:
                    message.votes = $root.movie.Votes.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.releaseDate = reader.string();
                    break;
                case 11:
                    message.popularity = reader.int32();
                    break;
                case 12:
                    message.tagline = reader.string();
                    break;
                case 13:
                    message.imdbId = reader.string();
                    break;
                case 14:
                    message.status = reader.int32();
                    break;
                case 15:
                    if (!(message.spokenLanguage && message.spokenLanguage.length))
                        message.spokenLanguage = [];
                    message.spokenLanguage.push(reader.string());
                    break;
                case 16:
                    if (!(message.videos && message.videos.length))
                        message.videos = [];
                    message.videos.push($root.movie.Video.decode(reader, reader.uint32()));
                    break;
                case 17:
                    if (!(message.posters && message.posters.length))
                        message.posters = [];
                    message.posters.push($root.movie.Image.decode(reader, reader.uint32()));
                    break;
                case 18:
                    if (!(message.recommendations && message.recommendations.length))
                        message.recommendations = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.recommendations.push(reader.int32());
                    } else
                        message.recommendations.push(reader.int32());
                    break;
                case 19:
                    if (!(message.similar && message.similar.length))
                        message.similar = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.similar.push(reader.int32());
                    } else
                        message.similar.push(reader.int32());
                    break;
                case 20:
                    if (!(message.watch && message.watch.length))
                        message.watch = [];
                    message.watch.push($root.movie.Watch.decode(reader, reader.uint32()));
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
         * @memberof movie.Detail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {movie.Detail} Detail
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
         * @memberof movie.Detail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Detail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
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
                    let error = $root.movie.Genre.verify(message.genres[i]);
                    if (error)
                        return "genres." + error;
                }
            }
            if (message.originalLanguage != null && message.hasOwnProperty("originalLanguage"))
                if (!$util.isString(message.originalLanguage))
                    return "originalLanguage: string expected";
            if (message.originalTitle != null && message.hasOwnProperty("originalTitle"))
                if (!$util.isString(message.originalTitle))
                    return "originalTitle: string expected";
            if (message.posterPath != null && message.hasOwnProperty("posterPath"))
                if (!$util.isString(message.posterPath))
                    return "posterPath: string expected";
            if (message.backdropPath != null && message.hasOwnProperty("backdropPath"))
                if (!$util.isString(message.backdropPath))
                    return "backdropPath: string expected";
            if (message.votes != null && message.hasOwnProperty("votes")) {
                let error = $root.movie.Votes.verify(message.votes);
                if (error)
                    return "votes." + error;
            }
            if (message.releaseDate != null && message.hasOwnProperty("releaseDate"))
                if (!$util.isString(message.releaseDate))
                    return "releaseDate: string expected";
            if (message.popularity != null && message.hasOwnProperty("popularity"))
                if (!$util.isInteger(message.popularity))
                    return "popularity: integer expected";
            if (message.tagline != null && message.hasOwnProperty("tagline"))
                if (!$util.isString(message.tagline))
                    return "tagline: string expected";
            if (message.imdbId != null && message.hasOwnProperty("imdbId"))
                if (!$util.isString(message.imdbId))
                    return "imdbId: string expected";
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
                    let error = $root.movie.Video.verify(message.videos[i]);
                    if (error)
                        return "videos." + error;
                }
            }
            if (message.posters != null && message.hasOwnProperty("posters")) {
                if (!Array.isArray(message.posters))
                    return "posters: array expected";
                for (let i = 0; i < message.posters.length; ++i) {
                    let error = $root.movie.Image.verify(message.posters[i]);
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
                    let error = $root.movie.Watch.verify(message.watch[i]);
                    if (error)
                        return "watch." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Detail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof movie.Detail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {movie.Detail} Detail
         */
        Detail.fromObject = function fromObject(object) {
            if (object instanceof $root.movie.Detail)
                return object;
            let message = new $root.movie.Detail();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.title != null)
                message.title = String(object.title);
            if (object.overview != null)
                message.overview = String(object.overview);
            if (object.genres) {
                if (!Array.isArray(object.genres))
                    throw TypeError(".movie.Detail.genres: array expected");
                message.genres = [];
                for (let i = 0; i < object.genres.length; ++i) {
                    if (typeof object.genres[i] !== "object")
                        throw TypeError(".movie.Detail.genres: object expected");
                    message.genres[i] = $root.movie.Genre.fromObject(object.genres[i]);
                }
            }
            if (object.originalLanguage != null)
                message.originalLanguage = String(object.originalLanguage);
            if (object.originalTitle != null)
                message.originalTitle = String(object.originalTitle);
            if (object.posterPath != null)
                message.posterPath = String(object.posterPath);
            if (object.backdropPath != null)
                message.backdropPath = String(object.backdropPath);
            if (object.votes != null) {
                if (typeof object.votes !== "object")
                    throw TypeError(".movie.Detail.votes: object expected");
                message.votes = $root.movie.Votes.fromObject(object.votes);
            }
            if (object.releaseDate != null)
                message.releaseDate = String(object.releaseDate);
            if (object.popularity != null)
                message.popularity = object.popularity | 0;
            if (object.tagline != null)
                message.tagline = String(object.tagline);
            if (object.imdbId != null)
                message.imdbId = String(object.imdbId);
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
            if (object.spokenLanguage) {
                if (!Array.isArray(object.spokenLanguage))
                    throw TypeError(".movie.Detail.spokenLanguage: array expected");
                message.spokenLanguage = [];
                for (let i = 0; i < object.spokenLanguage.length; ++i)
                    message.spokenLanguage[i] = String(object.spokenLanguage[i]);
            }
            if (object.videos) {
                if (!Array.isArray(object.videos))
                    throw TypeError(".movie.Detail.videos: array expected");
                message.videos = [];
                for (let i = 0; i < object.videos.length; ++i) {
                    if (typeof object.videos[i] !== "object")
                        throw TypeError(".movie.Detail.videos: object expected");
                    message.videos[i] = $root.movie.Video.fromObject(object.videos[i]);
                }
            }
            if (object.posters) {
                if (!Array.isArray(object.posters))
                    throw TypeError(".movie.Detail.posters: array expected");
                message.posters = [];
                for (let i = 0; i < object.posters.length; ++i) {
                    if (typeof object.posters[i] !== "object")
                        throw TypeError(".movie.Detail.posters: object expected");
                    message.posters[i] = $root.movie.Image.fromObject(object.posters[i]);
                }
            }
            if (object.recommendations) {
                if (!Array.isArray(object.recommendations))
                    throw TypeError(".movie.Detail.recommendations: array expected");
                message.recommendations = [];
                for (let i = 0; i < object.recommendations.length; ++i)
                    message.recommendations[i] = object.recommendations[i] | 0;
            }
            if (object.similar) {
                if (!Array.isArray(object.similar))
                    throw TypeError(".movie.Detail.similar: array expected");
                message.similar = [];
                for (let i = 0; i < object.similar.length; ++i)
                    message.similar[i] = object.similar[i] | 0;
            }
            if (object.watch) {
                if (!Array.isArray(object.watch))
                    throw TypeError(".movie.Detail.watch: array expected");
                message.watch = [];
                for (let i = 0; i < object.watch.length; ++i) {
                    if (typeof object.watch[i] !== "object")
                        throw TypeError(".movie.Detail.watch: object expected");
                    message.watch[i] = $root.movie.Watch.fromObject(object.watch[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Detail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof movie.Detail
         * @static
         * @param {movie.Detail} message Detail
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
            }
            if (options.defaults) {
                object.id = 0;
                object.title = "";
                object.overview = "";
                object.originalLanguage = "";
                object.originalTitle = "";
                object.posterPath = "";
                object.backdropPath = "";
                object.votes = null;
                object.releaseDate = "";
                object.popularity = 0;
                object.tagline = "";
                object.imdbId = "";
                object.status = options.enums === String ? "Rumored" : 0;
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
                    object.genres[j] = $root.movie.Genre.toObject(message.genres[j], options);
            }
            if (message.originalLanguage != null && message.hasOwnProperty("originalLanguage"))
                object.originalLanguage = message.originalLanguage;
            if (message.originalTitle != null && message.hasOwnProperty("originalTitle"))
                object.originalTitle = message.originalTitle;
            if (message.posterPath != null && message.hasOwnProperty("posterPath"))
                object.posterPath = message.posterPath;
            if (message.backdropPath != null && message.hasOwnProperty("backdropPath"))
                object.backdropPath = message.backdropPath;
            if (message.votes != null && message.hasOwnProperty("votes"))
                object.votes = $root.movie.Votes.toObject(message.votes, options);
            if (message.releaseDate != null && message.hasOwnProperty("releaseDate"))
                object.releaseDate = message.releaseDate;
            if (message.popularity != null && message.hasOwnProperty("popularity"))
                object.popularity = message.popularity;
            if (message.tagline != null && message.hasOwnProperty("tagline"))
                object.tagline = message.tagline;
            if (message.imdbId != null && message.hasOwnProperty("imdbId"))
                object.imdbId = message.imdbId;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.movie.Detail.Status[message.status] : message.status;
            if (message.spokenLanguage && message.spokenLanguage.length) {
                object.spokenLanguage = [];
                for (let j = 0; j < message.spokenLanguage.length; ++j)
                    object.spokenLanguage[j] = message.spokenLanguage[j];
            }
            if (message.videos && message.videos.length) {
                object.videos = [];
                for (let j = 0; j < message.videos.length; ++j)
                    object.videos[j] = $root.movie.Video.toObject(message.videos[j], options);
            }
            if (message.posters && message.posters.length) {
                object.posters = [];
                for (let j = 0; j < message.posters.length; ++j)
                    object.posters[j] = $root.movie.Image.toObject(message.posters[j], options);
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
                    object.watch[j] = $root.movie.Watch.toObject(message.watch[j], options);
            }
            return object;
        };

        /**
         * Converts this Detail to JSON.
         * @function toJSON
         * @memberof movie.Detail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Detail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Status enum.
         * @name movie.Detail.Status
         * @enum {number}
         * @property {number} Rumored=0 Rumored value
         * @property {number} Planned=1 Planned value
         * @property {number} InProduction=2 InProduction value
         * @property {number} PostProduction=3 PostProduction value
         * @property {number} Released=4 Released value
         * @property {number} Canceled=5 Canceled value
         */
        Detail.Status = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Rumored"] = 0;
            values[valuesById[1] = "Planned"] = 1;
            values[valuesById[2] = "InProduction"] = 2;
            values[valuesById[3] = "PostProduction"] = 3;
            values[valuesById[4] = "Released"] = 4;
            values[valuesById[5] = "Canceled"] = 5;
            return values;
        })();

        return Detail;
    })();

    movie.Genre = (function() {

        /**
         * Properties of a Genre.
         * @memberof movie
         * @interface IGenre
         * @property {number|null} [id] Genre id
         * @property {string|null} [name] Genre name
         */

        /**
         * Constructs a new Genre.
         * @memberof movie
         * @classdesc Represents a Genre.
         * @implements IGenre
         * @constructor
         * @param {movie.IGenre=} [properties] Properties to set
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
         * @memberof movie.Genre
         * @instance
         */
        Genre.prototype.id = 0;

        /**
         * Genre name.
         * @member {string} name
         * @memberof movie.Genre
         * @instance
         */
        Genre.prototype.name = "";

        /**
         * Creates a new Genre instance using the specified properties.
         * @function create
         * @memberof movie.Genre
         * @static
         * @param {movie.IGenre=} [properties] Properties to set
         * @returns {movie.Genre} Genre instance
         */
        Genre.create = function create(properties) {
            return new Genre(properties);
        };

        /**
         * Encodes the specified Genre message. Does not implicitly {@link movie.Genre.verify|verify} messages.
         * @function encode
         * @memberof movie.Genre
         * @static
         * @param {movie.IGenre} message Genre message or plain object to encode
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
         * Encodes the specified Genre message, length delimited. Does not implicitly {@link movie.Genre.verify|verify} messages.
         * @function encodeDelimited
         * @memberof movie.Genre
         * @static
         * @param {movie.IGenre} message Genre message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Genre.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Genre message from the specified reader or buffer.
         * @function decode
         * @memberof movie.Genre
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {movie.Genre} Genre
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Genre.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.movie.Genre();
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
         * @memberof movie.Genre
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {movie.Genre} Genre
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
         * @memberof movie.Genre
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
         * @memberof movie.Genre
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {movie.Genre} Genre
         */
        Genre.fromObject = function fromObject(object) {
            if (object instanceof $root.movie.Genre)
                return object;
            let message = new $root.movie.Genre();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a Genre message. Also converts values to other types if specified.
         * @function toObject
         * @memberof movie.Genre
         * @static
         * @param {movie.Genre} message Genre
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
         * @memberof movie.Genre
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Genre.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Genre;
    })();

    movie.Votes = (function() {

        /**
         * Properties of a Votes.
         * @memberof movie
         * @interface IVotes
         * @property {number|null} [average] Votes average
         * @property {number|null} [count] Votes count
         */

        /**
         * Constructs a new Votes.
         * @memberof movie
         * @classdesc Represents a Votes.
         * @implements IVotes
         * @constructor
         * @param {movie.IVotes=} [properties] Properties to set
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
         * @memberof movie.Votes
         * @instance
         */
        Votes.prototype.average = 0;

        /**
         * Votes count.
         * @member {number} count
         * @memberof movie.Votes
         * @instance
         */
        Votes.prototype.count = 0;

        /**
         * Creates a new Votes instance using the specified properties.
         * @function create
         * @memberof movie.Votes
         * @static
         * @param {movie.IVotes=} [properties] Properties to set
         * @returns {movie.Votes} Votes instance
         */
        Votes.create = function create(properties) {
            return new Votes(properties);
        };

        /**
         * Encodes the specified Votes message. Does not implicitly {@link movie.Votes.verify|verify} messages.
         * @function encode
         * @memberof movie.Votes
         * @static
         * @param {movie.IVotes} message Votes message or plain object to encode
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
         * Encodes the specified Votes message, length delimited. Does not implicitly {@link movie.Votes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof movie.Votes
         * @static
         * @param {movie.IVotes} message Votes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Votes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Votes message from the specified reader or buffer.
         * @function decode
         * @memberof movie.Votes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {movie.Votes} Votes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Votes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.movie.Votes();
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
         * @memberof movie.Votes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {movie.Votes} Votes
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
         * @memberof movie.Votes
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
         * @memberof movie.Votes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {movie.Votes} Votes
         */
        Votes.fromObject = function fromObject(object) {
            if (object instanceof $root.movie.Votes)
                return object;
            let message = new $root.movie.Votes();
            if (object.average != null)
                message.average = Number(object.average);
            if (object.count != null)
                message.count = object.count | 0;
            return message;
        };

        /**
         * Creates a plain object from a Votes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof movie.Votes
         * @static
         * @param {movie.Votes} message Votes
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
         * @memberof movie.Votes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Votes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Votes;
    })();

    movie.Video = (function() {

        /**
         * Properties of a Video.
         * @memberof movie
         * @interface IVideo
         * @property {string|null} [id] Video id
         * @property {string|null} [language] Video language
         * @property {string|null} [country] Video country
         * @property {string|null} [key] Video key
         * @property {string|null} [name] Video name
         * @property {string|null} [site] Video site
         * @property {number|null} [size] Video size
         * @property {movie.Video.Type|null} [type] Video type
         */

        /**
         * Constructs a new Video.
         * @memberof movie
         * @classdesc Represents a Video.
         * @implements IVideo
         * @constructor
         * @param {movie.IVideo=} [properties] Properties to set
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
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.id = "";

        /**
         * Video language.
         * @member {string} language
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.language = "";

        /**
         * Video country.
         * @member {string} country
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.country = "";

        /**
         * Video key.
         * @member {string} key
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.key = "";

        /**
         * Video name.
         * @member {string} name
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.name = "";

        /**
         * Video site.
         * @member {string} site
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.site = "";

        /**
         * Video size.
         * @member {number} size
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.size = 0;

        /**
         * Video type.
         * @member {movie.Video.Type} type
         * @memberof movie.Video
         * @instance
         */
        Video.prototype.type = 0;

        /**
         * Creates a new Video instance using the specified properties.
         * @function create
         * @memberof movie.Video
         * @static
         * @param {movie.IVideo=} [properties] Properties to set
         * @returns {movie.Video} Video instance
         */
        Video.create = function create(properties) {
            return new Video(properties);
        };

        /**
         * Encodes the specified Video message. Does not implicitly {@link movie.Video.verify|verify} messages.
         * @function encode
         * @memberof movie.Video
         * @static
         * @param {movie.IVideo} message Video message or plain object to encode
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
         * Encodes the specified Video message, length delimited. Does not implicitly {@link movie.Video.verify|verify} messages.
         * @function encodeDelimited
         * @memberof movie.Video
         * @static
         * @param {movie.IVideo} message Video message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Video.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Video message from the specified reader or buffer.
         * @function decode
         * @memberof movie.Video
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {movie.Video} Video
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Video.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.movie.Video();
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
         * @memberof movie.Video
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {movie.Video} Video
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
         * @memberof movie.Video
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
                    break;
                }
            return null;
        };

        /**
         * Creates a Video message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof movie.Video
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {movie.Video} Video
         */
        Video.fromObject = function fromObject(object) {
            if (object instanceof $root.movie.Video)
                return object;
            let message = new $root.movie.Video();
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
            }
            return message;
        };

        /**
         * Creates a plain object from a Video message. Also converts values to other types if specified.
         * @function toObject
         * @memberof movie.Video
         * @static
         * @param {movie.Video} message Video
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
                object.type = options.enums === String ? $root.movie.Video.Type[message.type] : message.type;
            return object;
        };

        /**
         * Converts this Video to JSON.
         * @function toJSON
         * @memberof movie.Video
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Video.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Type enum.
         * @name movie.Video.Type
         * @enum {number}
         * @property {number} Trailer=0 Trailer value
         * @property {number} Teaser=1 Teaser value
         * @property {number} Clip=2 Clip value
         * @property {number} Featurette=3 Featurette value
         * @property {number} BehindtheScenes=4 BehindtheScenes value
         * @property {number} Bloopers=5 Bloopers value
         */
        Video.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Trailer"] = 0;
            values[valuesById[1] = "Teaser"] = 1;
            values[valuesById[2] = "Clip"] = 2;
            values[valuesById[3] = "Featurette"] = 3;
            values[valuesById[4] = "BehindtheScenes"] = 4;
            values[valuesById[5] = "Bloopers"] = 5;
            return values;
        })();

        return Video;
    })();

    movie.Image = (function() {

        /**
         * Properties of an Image.
         * @memberof movie
         * @interface IImage
         * @property {string|null} [filePath] Image filePath
         * @property {number|null} [aspectRatio] Image aspectRatio
         * @property {number|null} [height] Image height
         * @property {number|null} [width] Image width
         * @property {movie.IVotes|null} [votes] Image votes
         * @property {string|null} [language] Image language
         */

        /**
         * Constructs a new Image.
         * @memberof movie
         * @classdesc Represents an Image.
         * @implements IImage
         * @constructor
         * @param {movie.IImage=} [properties] Properties to set
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
         * @memberof movie.Image
         * @instance
         */
        Image.prototype.filePath = "";

        /**
         * Image aspectRatio.
         * @member {number} aspectRatio
         * @memberof movie.Image
         * @instance
         */
        Image.prototype.aspectRatio = 0;

        /**
         * Image height.
         * @member {number} height
         * @memberof movie.Image
         * @instance
         */
        Image.prototype.height = 0;

        /**
         * Image width.
         * @member {number} width
         * @memberof movie.Image
         * @instance
         */
        Image.prototype.width = 0;

        /**
         * Image votes.
         * @member {movie.IVotes|null|undefined} votes
         * @memberof movie.Image
         * @instance
         */
        Image.prototype.votes = null;

        /**
         * Image language.
         * @member {string} language
         * @memberof movie.Image
         * @instance
         */
        Image.prototype.language = "";

        /**
         * Creates a new Image instance using the specified properties.
         * @function create
         * @memberof movie.Image
         * @static
         * @param {movie.IImage=} [properties] Properties to set
         * @returns {movie.Image} Image instance
         */
        Image.create = function create(properties) {
            return new Image(properties);
        };

        /**
         * Encodes the specified Image message. Does not implicitly {@link movie.Image.verify|verify} messages.
         * @function encode
         * @memberof movie.Image
         * @static
         * @param {movie.IImage} message Image message or plain object to encode
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
                $root.movie.Votes.encode(message.votes, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.language != null && Object.hasOwnProperty.call(message, "language"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.language);
            return writer;
        };

        /**
         * Encodes the specified Image message, length delimited. Does not implicitly {@link movie.Image.verify|verify} messages.
         * @function encodeDelimited
         * @memberof movie.Image
         * @static
         * @param {movie.IImage} message Image message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Image.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Image message from the specified reader or buffer.
         * @function decode
         * @memberof movie.Image
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {movie.Image} Image
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Image.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.movie.Image();
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
                    message.votes = $root.movie.Votes.decode(reader, reader.uint32());
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
         * @memberof movie.Image
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {movie.Image} Image
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
         * @memberof movie.Image
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
                let error = $root.movie.Votes.verify(message.votes);
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
         * @memberof movie.Image
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {movie.Image} Image
         */
        Image.fromObject = function fromObject(object) {
            if (object instanceof $root.movie.Image)
                return object;
            let message = new $root.movie.Image();
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
                    throw TypeError(".movie.Image.votes: object expected");
                message.votes = $root.movie.Votes.fromObject(object.votes);
            }
            if (object.language != null)
                message.language = String(object.language);
            return message;
        };

        /**
         * Creates a plain object from an Image message. Also converts values to other types if specified.
         * @function toObject
         * @memberof movie.Image
         * @static
         * @param {movie.Image} message Image
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
                object.votes = $root.movie.Votes.toObject(message.votes, options);
            if (message.language != null && message.hasOwnProperty("language"))
                object.language = message.language;
            return object;
        };

        /**
         * Converts this Image to JSON.
         * @function toJSON
         * @memberof movie.Image
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Image.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Image;
    })();

    movie.Watch = (function() {

        /**
         * Properties of a Watch.
         * @memberof movie
         * @interface IWatch
         * @property {string|null} [language] Watch language
         * @property {string|null} [link] Watch link
         * @property {Array.<movie.Watch.IProvider>|null} [rent] Watch rent
         * @property {Array.<movie.Watch.IProvider>|null} [buy] Watch buy
         */

        /**
         * Constructs a new Watch.
         * @memberof movie
         * @classdesc Represents a Watch.
         * @implements IWatch
         * @constructor
         * @param {movie.IWatch=} [properties] Properties to set
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
         * @memberof movie.Watch
         * @instance
         */
        Watch.prototype.language = "";

        /**
         * Watch link.
         * @member {string} link
         * @memberof movie.Watch
         * @instance
         */
        Watch.prototype.link = "";

        /**
         * Watch rent.
         * @member {Array.<movie.Watch.IProvider>} rent
         * @memberof movie.Watch
         * @instance
         */
        Watch.prototype.rent = $util.emptyArray;

        /**
         * Watch buy.
         * @member {Array.<movie.Watch.IProvider>} buy
         * @memberof movie.Watch
         * @instance
         */
        Watch.prototype.buy = $util.emptyArray;

        /**
         * Creates a new Watch instance using the specified properties.
         * @function create
         * @memberof movie.Watch
         * @static
         * @param {movie.IWatch=} [properties] Properties to set
         * @returns {movie.Watch} Watch instance
         */
        Watch.create = function create(properties) {
            return new Watch(properties);
        };

        /**
         * Encodes the specified Watch message. Does not implicitly {@link movie.Watch.verify|verify} messages.
         * @function encode
         * @memberof movie.Watch
         * @static
         * @param {movie.IWatch} message Watch message or plain object to encode
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
                    $root.movie.Watch.Provider.encode(message.rent[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.buy != null && message.buy.length)
                for (let i = 0; i < message.buy.length; ++i)
                    $root.movie.Watch.Provider.encode(message.buy[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Watch message, length delimited. Does not implicitly {@link movie.Watch.verify|verify} messages.
         * @function encodeDelimited
         * @memberof movie.Watch
         * @static
         * @param {movie.IWatch} message Watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Watch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Watch message from the specified reader or buffer.
         * @function decode
         * @memberof movie.Watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {movie.Watch} Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Watch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.movie.Watch();
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
                    message.rent.push($root.movie.Watch.Provider.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.buy && message.buy.length))
                        message.buy = [];
                    message.buy.push($root.movie.Watch.Provider.decode(reader, reader.uint32()));
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
         * @memberof movie.Watch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {movie.Watch} Watch
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
         * @memberof movie.Watch
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
                    let error = $root.movie.Watch.Provider.verify(message.rent[i]);
                    if (error)
                        return "rent." + error;
                }
            }
            if (message.buy != null && message.hasOwnProperty("buy")) {
                if (!Array.isArray(message.buy))
                    return "buy: array expected";
                for (let i = 0; i < message.buy.length; ++i) {
                    let error = $root.movie.Watch.Provider.verify(message.buy[i]);
                    if (error)
                        return "buy." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Watch message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof movie.Watch
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {movie.Watch} Watch
         */
        Watch.fromObject = function fromObject(object) {
            if (object instanceof $root.movie.Watch)
                return object;
            let message = new $root.movie.Watch();
            if (object.language != null)
                message.language = String(object.language);
            if (object.link != null)
                message.link = String(object.link);
            if (object.rent) {
                if (!Array.isArray(object.rent))
                    throw TypeError(".movie.Watch.rent: array expected");
                message.rent = [];
                for (let i = 0; i < object.rent.length; ++i) {
                    if (typeof object.rent[i] !== "object")
                        throw TypeError(".movie.Watch.rent: object expected");
                    message.rent[i] = $root.movie.Watch.Provider.fromObject(object.rent[i]);
                }
            }
            if (object.buy) {
                if (!Array.isArray(object.buy))
                    throw TypeError(".movie.Watch.buy: array expected");
                message.buy = [];
                for (let i = 0; i < object.buy.length; ++i) {
                    if (typeof object.buy[i] !== "object")
                        throw TypeError(".movie.Watch.buy: object expected");
                    message.buy[i] = $root.movie.Watch.Provider.fromObject(object.buy[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Watch message. Also converts values to other types if specified.
         * @function toObject
         * @memberof movie.Watch
         * @static
         * @param {movie.Watch} message Watch
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
                    object.rent[j] = $root.movie.Watch.Provider.toObject(message.rent[j], options);
            }
            if (message.buy && message.buy.length) {
                object.buy = [];
                for (let j = 0; j < message.buy.length; ++j)
                    object.buy[j] = $root.movie.Watch.Provider.toObject(message.buy[j], options);
            }
            return object;
        };

        /**
         * Converts this Watch to JSON.
         * @function toJSON
         * @memberof movie.Watch
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Watch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Watch.Provider = (function() {

            /**
             * Properties of a Provider.
             * @memberof movie.Watch
             * @interface IProvider
             * @property {number|null} [id] Provider id
             * @property {number|null} [priority] Provider priority
             * @property {string|null} [logoPath] Provider logoPath
             * @property {string|null} [name] Provider name
             */

            /**
             * Constructs a new Provider.
             * @memberof movie.Watch
             * @classdesc Represents a Provider.
             * @implements IProvider
             * @constructor
             * @param {movie.Watch.IProvider=} [properties] Properties to set
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
             * @memberof movie.Watch.Provider
             * @instance
             */
            Provider.prototype.id = 0;

            /**
             * Provider priority.
             * @member {number} priority
             * @memberof movie.Watch.Provider
             * @instance
             */
            Provider.prototype.priority = 0;

            /**
             * Provider logoPath.
             * @member {string} logoPath
             * @memberof movie.Watch.Provider
             * @instance
             */
            Provider.prototype.logoPath = "";

            /**
             * Provider name.
             * @member {string} name
             * @memberof movie.Watch.Provider
             * @instance
             */
            Provider.prototype.name = "";

            /**
             * Creates a new Provider instance using the specified properties.
             * @function create
             * @memberof movie.Watch.Provider
             * @static
             * @param {movie.Watch.IProvider=} [properties] Properties to set
             * @returns {movie.Watch.Provider} Provider instance
             */
            Provider.create = function create(properties) {
                return new Provider(properties);
            };

            /**
             * Encodes the specified Provider message. Does not implicitly {@link movie.Watch.Provider.verify|verify} messages.
             * @function encode
             * @memberof movie.Watch.Provider
             * @static
             * @param {movie.Watch.IProvider} message Provider message or plain object to encode
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
             * Encodes the specified Provider message, length delimited. Does not implicitly {@link movie.Watch.Provider.verify|verify} messages.
             * @function encodeDelimited
             * @memberof movie.Watch.Provider
             * @static
             * @param {movie.Watch.IProvider} message Provider message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Provider.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Provider message from the specified reader or buffer.
             * @function decode
             * @memberof movie.Watch.Provider
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {movie.Watch.Provider} Provider
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Provider.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.movie.Watch.Provider();
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
             * @memberof movie.Watch.Provider
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {movie.Watch.Provider} Provider
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
             * @memberof movie.Watch.Provider
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
             * @memberof movie.Watch.Provider
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {movie.Watch.Provider} Provider
             */
            Provider.fromObject = function fromObject(object) {
                if (object instanceof $root.movie.Watch.Provider)
                    return object;
                let message = new $root.movie.Watch.Provider();
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
             * @memberof movie.Watch.Provider
             * @static
             * @param {movie.Watch.Provider} message Provider
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
             * @memberof movie.Watch.Provider
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

    return movie;
})();

export const queue = $root.queue = (() => {

    /**
     * Namespace queue.
     * @exports queue
     * @namespace
     */
    const queue = {};

    queue.AllItems = (function() {

        /**
         * Properties of an AllItems.
         * @memberof queue
         * @interface IAllItems
         * @property {Array.<queue.IItem>|null} [items] AllItems items
         */

        /**
         * Constructs a new AllItems.
         * @memberof queue
         * @classdesc Represents an AllItems.
         * @implements IAllItems
         * @constructor
         * @param {queue.IAllItems=} [properties] Properties to set
         */
        function AllItems(properties) {
            this.items = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AllItems items.
         * @member {Array.<queue.IItem>} items
         * @memberof queue.AllItems
         * @instance
         */
        AllItems.prototype.items = $util.emptyArray;

        /**
         * Creates a new AllItems instance using the specified properties.
         * @function create
         * @memberof queue.AllItems
         * @static
         * @param {queue.IAllItems=} [properties] Properties to set
         * @returns {queue.AllItems} AllItems instance
         */
        AllItems.create = function create(properties) {
            return new AllItems(properties);
        };

        /**
         * Encodes the specified AllItems message. Does not implicitly {@link queue.AllItems.verify|verify} messages.
         * @function encode
         * @memberof queue.AllItems
         * @static
         * @param {queue.IAllItems} message AllItems message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllItems.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.queue.Item.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AllItems message, length delimited. Does not implicitly {@link queue.AllItems.verify|verify} messages.
         * @function encodeDelimited
         * @memberof queue.AllItems
         * @static
         * @param {queue.IAllItems} message AllItems message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllItems.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AllItems message from the specified reader or buffer.
         * @function decode
         * @memberof queue.AllItems
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {queue.AllItems} AllItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllItems.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.queue.AllItems();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.items && message.items.length))
                        message.items = [];
                    message.items.push($root.queue.Item.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AllItems message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof queue.AllItems
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {queue.AllItems} AllItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllItems.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AllItems message.
         * @function verify
         * @memberof queue.AllItems
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AllItems.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.queue.Item.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AllItems message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof queue.AllItems
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {queue.AllItems} AllItems
         */
        AllItems.fromObject = function fromObject(object) {
            if (object instanceof $root.queue.AllItems)
                return object;
            let message = new $root.queue.AllItems();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".queue.AllItems.items: array expected");
                message.items = [];
                for (let i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".queue.AllItems.items: object expected");
                    message.items[i] = $root.queue.Item.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AllItems message. Also converts values to other types if specified.
         * @function toObject
         * @memberof queue.AllItems
         * @static
         * @param {queue.AllItems} message AllItems
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AllItems.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = [];
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.queue.Item.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this AllItems to JSON.
         * @function toJSON
         * @memberof queue.AllItems
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AllItems.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AllItems;
    })();

    queue.Item = (function() {

        /**
         * Properties of an Item.
         * @memberof queue
         * @interface IItem
         * @property {string|null} [id] Item id
         * @property {number|null} [tmdbid] Item tmdbid
         * @property {queue.Item.State|null} [state] Item state
         * @property {movie.IDetail|null} [movie] Item movie
         */

        /**
         * Constructs a new Item.
         * @memberof queue
         * @classdesc Represents an Item.
         * @implements IItem
         * @constructor
         * @param {queue.IItem=} [properties] Properties to set
         */
        function Item(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Item id.
         * @member {string} id
         * @memberof queue.Item
         * @instance
         */
        Item.prototype.id = "";

        /**
         * Item tmdbid.
         * @member {number} tmdbid
         * @memberof queue.Item
         * @instance
         */
        Item.prototype.tmdbid = 0;

        /**
         * Item state.
         * @member {queue.Item.State} state
         * @memberof queue.Item
         * @instance
         */
        Item.prototype.state = 0;

        /**
         * Item movie.
         * @member {movie.IDetail|null|undefined} movie
         * @memberof queue.Item
         * @instance
         */
        Item.prototype.movie = null;

        /**
         * Creates a new Item instance using the specified properties.
         * @function create
         * @memberof queue.Item
         * @static
         * @param {queue.IItem=} [properties] Properties to set
         * @returns {queue.Item} Item instance
         */
        Item.create = function create(properties) {
            return new Item(properties);
        };

        /**
         * Encodes the specified Item message. Does not implicitly {@link queue.Item.verify|verify} messages.
         * @function encode
         * @memberof queue.Item
         * @static
         * @param {queue.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.tmdbid != null && Object.hasOwnProperty.call(message, "tmdbid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.tmdbid);
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.state);
            if (message.movie != null && Object.hasOwnProperty.call(message, "movie"))
                $root.movie.Detail.encode(message.movie, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link queue.Item.verify|verify} messages.
         * @function encodeDelimited
         * @memberof queue.Item
         * @static
         * @param {queue.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @function decode
         * @memberof queue.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {queue.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.queue.Item();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.tmdbid = reader.int32();
                    break;
                case 3:
                    message.state = reader.int32();
                    break;
                case 4:
                    message.movie = $root.movie.Detail.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof queue.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {queue.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Item message.
         * @function verify
         * @memberof queue.Item
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Item.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.tmdbid != null && message.hasOwnProperty("tmdbid"))
                if (!$util.isInteger(message.tmdbid))
                    return "tmdbid: integer expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.movie != null && message.hasOwnProperty("movie")) {
                let error = $root.movie.Detail.verify(message.movie);
                if (error)
                    return "movie." + error;
            }
            return null;
        };

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof queue.Item
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {queue.Item} Item
         */
        Item.fromObject = function fromObject(object) {
            if (object instanceof $root.queue.Item)
                return object;
            let message = new $root.queue.Item();
            if (object.id != null)
                message.id = String(object.id);
            if (object.tmdbid != null)
                message.tmdbid = object.tmdbid | 0;
            switch (object.state) {
            case "Queued":
            case 0:
                message.state = 0;
                break;
            case "Like":
            case 1:
                message.state = 1;
                break;
            case "Dislike":
            case 2:
                message.state = 2;
                break;
            case "Love":
            case 3:
                message.state = 3;
                break;
            case "Hate":
            case 4:
                message.state = 4;
                break;
            case "Skipped":
            case 5:
                message.state = 5;
                break;
            }
            if (object.movie != null) {
                if (typeof object.movie !== "object")
                    throw TypeError(".queue.Item.movie: object expected");
                message.movie = $root.movie.Detail.fromObject(object.movie);
            }
            return message;
        };

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @function toObject
         * @memberof queue.Item
         * @static
         * @param {queue.Item} message Item
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Item.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.tmdbid = 0;
                object.state = options.enums === String ? "Queued" : 0;
                object.movie = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.tmdbid != null && message.hasOwnProperty("tmdbid"))
                object.tmdbid = message.tmdbid;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.queue.Item.State[message.state] : message.state;
            if (message.movie != null && message.hasOwnProperty("movie"))
                object.movie = $root.movie.Detail.toObject(message.movie, options);
            return object;
        };

        /**
         * Converts this Item to JSON.
         * @function toJSON
         * @memberof queue.Item
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Item.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * State enum.
         * @name queue.Item.State
         * @enum {number}
         * @property {number} Queued=0 Queued value
         * @property {number} Like=1 Like value
         * @property {number} Dislike=2 Dislike value
         * @property {number} Love=3 Love value
         * @property {number} Hate=4 Hate value
         * @property {number} Skipped=5 Skipped value
         */
        Item.State = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Queued"] = 0;
            values[valuesById[1] = "Like"] = 1;
            values[valuesById[2] = "Dislike"] = 2;
            values[valuesById[3] = "Love"] = 3;
            values[valuesById[4] = "Hate"] = 4;
            values[valuesById[5] = "Skipped"] = 5;
            return values;
        })();

        return Item;
    })();

    return queue;
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
            if (options.defaults) {
                object.id = "";
                object.email = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
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
            }
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
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
            }
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
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