import * as $protobuf from "protobufjs";
/** Namespace queue. */
export namespace queue {

    /** Properties of a QueuedItems. */
    interface IQueuedItems {

        /** QueuedItems items */
        items?: (queue.IQueuedItem[]|null);
    }

    /** Represents a QueuedItems. */
    class QueuedItems implements IQueuedItems {

        /**
         * Constructs a new QueuedItems.
         * @param [properties] Properties to set
         */
        constructor(properties?: queue.IQueuedItems);

        /** QueuedItems items. */
        public items: queue.IQueuedItem[];

        /**
         * Creates a new QueuedItems instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueuedItems instance
         */
        public static create(properties?: queue.IQueuedItems): queue.QueuedItems;

        /**
         * Encodes the specified QueuedItems message. Does not implicitly {@link queue.QueuedItems.verify|verify} messages.
         * @param message QueuedItems message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: queue.IQueuedItems, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QueuedItems message, length delimited. Does not implicitly {@link queue.QueuedItems.verify|verify} messages.
         * @param message QueuedItems message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: queue.IQueuedItems, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QueuedItems message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QueuedItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): queue.QueuedItems;

        /**
         * Decodes a QueuedItems message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QueuedItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): queue.QueuedItems;

        /**
         * Verifies a QueuedItems message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QueuedItems message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QueuedItems
         */
        public static fromObject(object: { [k: string]: any }): queue.QueuedItems;

        /**
         * Creates a plain object from a QueuedItems message. Also converts values to other types if specified.
         * @param message QueuedItems
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: queue.QueuedItems, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QueuedItems to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a QueuedItem. */
    interface IQueuedItem {

        /** QueuedItem id */
        id?: (string|null);

        /** QueuedItem user */
        user?: (string|null);

        /** QueuedItem show */
        show?: (show.IThinDetail|null);
    }

    /** Represents a QueuedItem. */
    class QueuedItem implements IQueuedItem {

        /**
         * Constructs a new QueuedItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: queue.IQueuedItem);

        /** QueuedItem id. */
        public id: string;

        /** QueuedItem user. */
        public user: string;

        /** QueuedItem show. */
        public show?: (show.IThinDetail|null);

        /**
         * Creates a new QueuedItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueuedItem instance
         */
        public static create(properties?: queue.IQueuedItem): queue.QueuedItem;

        /**
         * Encodes the specified QueuedItem message. Does not implicitly {@link queue.QueuedItem.verify|verify} messages.
         * @param message QueuedItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: queue.IQueuedItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QueuedItem message, length delimited. Does not implicitly {@link queue.QueuedItem.verify|verify} messages.
         * @param message QueuedItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: queue.IQueuedItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QueuedItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QueuedItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): queue.QueuedItem;

        /**
         * Decodes a QueuedItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QueuedItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): queue.QueuedItem;

        /**
         * Verifies a QueuedItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QueuedItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QueuedItem
         */
        public static fromObject(object: { [k: string]: any }): queue.QueuedItem;

        /**
         * Creates a plain object from a QueuedItem message. Also converts values to other types if specified.
         * @param message QueuedItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: queue.QueuedItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QueuedItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** QueueItemState enum. */
    enum QueueItemState {
        Queued = 0,
        Liked = 1,
        Disliked = 2
    }
}

/** Namespace show. */
export namespace show {

    /** Properties of a ThinDetail. */
    interface IThinDetail {

        /** ThinDetail id */
        id?: (string|null);

        /** ThinDetail title */
        title?: (string|null);

        /** ThinDetail overview */
        overview?: (string|null);

        /** ThinDetail genres */
        genres?: (show.IGenre[]|null);

        /** ThinDetail posterPath */
        posterPath?: (string|null);
    }

    /** Represents a ThinDetail. */
    class ThinDetail implements IThinDetail {

        /**
         * Constructs a new ThinDetail.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IThinDetail);

        /** ThinDetail id. */
        public id: string;

        /** ThinDetail title. */
        public title: string;

        /** ThinDetail overview. */
        public overview: string;

        /** ThinDetail genres. */
        public genres: show.IGenre[];

        /** ThinDetail posterPath. */
        public posterPath: string;

        /**
         * Creates a new ThinDetail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ThinDetail instance
         */
        public static create(properties?: show.IThinDetail): show.ThinDetail;

        /**
         * Encodes the specified ThinDetail message. Does not implicitly {@link show.ThinDetail.verify|verify} messages.
         * @param message ThinDetail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IThinDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ThinDetail message, length delimited. Does not implicitly {@link show.ThinDetail.verify|verify} messages.
         * @param message ThinDetail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IThinDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ThinDetail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ThinDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.ThinDetail;

        /**
         * Decodes a ThinDetail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ThinDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.ThinDetail;

        /**
         * Verifies a ThinDetail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ThinDetail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ThinDetail
         */
        public static fromObject(object: { [k: string]: any }): show.ThinDetail;

        /**
         * Creates a plain object from a ThinDetail message. Also converts values to other types if specified.
         * @param message ThinDetail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.ThinDetail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ThinDetail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Detail. */
    interface IDetail {

        /** Detail id */
        id?: (string|null);

        /** Detail title */
        title?: (string|null);

        /** Detail overview */
        overview?: (string|null);

        /** Detail genres */
        genres?: (show.IGenre[]|null);

        /** Detail posterPath */
        posterPath?: (string|null);

        /** Detail backdropPath */
        backdropPath?: (string|null);

        /** Detail votes */
        votes?: (show.IVotes|null);

        /** Detail popularity */
        popularity?: (number|null);

        /** Detail tagline */
        tagline?: (string|null);

        /** Detail spokenLanguage */
        spokenLanguage?: (string[]|null);

        /** Detail videos */
        videos?: (show.IVideo[]|null);

        /** Detail posters */
        posters?: (show.IImage[]|null);

        /** Detail recommendations */
        recommendations?: (number[]|null);

        /** Detail similar */
        similar?: (number[]|null);

        /** Detail watch */
        watch?: (show.IWatch[]|null);

        /** Detail tv */
        tv?: (show.ITV|null);

        /** Detail movie */
        movie?: (show.IMovie|null);

        /** Detail type */
        type?: (show.Detail.Type|null);

        /** Detail date */
        date?: (string|null);

        /** Detail cast */
        cast?: (show.ICast[]|null);

        /** Detail crew */
        crew?: (show.ICrew[]|null);
    }

    /** Represents a Detail. */
    class Detail implements IDetail {

        /**
         * Constructs a new Detail.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IDetail);

        /** Detail id. */
        public id: string;

        /** Detail title. */
        public title: string;

        /** Detail overview. */
        public overview: string;

        /** Detail genres. */
        public genres: show.IGenre[];

        /** Detail posterPath. */
        public posterPath: string;

        /** Detail backdropPath. */
        public backdropPath: string;

        /** Detail votes. */
        public votes?: (show.IVotes|null);

        /** Detail popularity. */
        public popularity: number;

        /** Detail tagline. */
        public tagline: string;

        /** Detail spokenLanguage. */
        public spokenLanguage: string[];

        /** Detail videos. */
        public videos: show.IVideo[];

        /** Detail posters. */
        public posters: show.IImage[];

        /** Detail recommendations. */
        public recommendations: number[];

        /** Detail similar. */
        public similar: number[];

        /** Detail watch. */
        public watch: show.IWatch[];

        /** Detail tv. */
        public tv?: (show.ITV|null);

        /** Detail movie. */
        public movie?: (show.IMovie|null);

        /** Detail type. */
        public type: show.Detail.Type;

        /** Detail date. */
        public date: string;

        /** Detail cast. */
        public cast: show.ICast[];

        /** Detail crew. */
        public crew: show.ICrew[];

        /**
         * Creates a new Detail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Detail instance
         */
        public static create(properties?: show.IDetail): show.Detail;

        /**
         * Encodes the specified Detail message. Does not implicitly {@link show.Detail.verify|verify} messages.
         * @param message Detail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Detail message, length delimited. Does not implicitly {@link show.Detail.verify|verify} messages.
         * @param message Detail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Detail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Detail;

        /**
         * Decodes a Detail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Detail;

        /**
         * Verifies a Detail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Detail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Detail
         */
        public static fromObject(object: { [k: string]: any }): show.Detail;

        /**
         * Creates a plain object from a Detail message. Also converts values to other types if specified.
         * @param message Detail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Detail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Detail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Detail {

        /** Type enum. */
        enum Type {
            TV = 0,
            Movie = 1
        }
    }

    /** Properties of a TV. */
    interface ITV {

        /** TV status */
        status?: (show.TV.Status|null);

        /** TV seasons */
        seasons?: (number|null);
    }

    /** Represents a TV. */
    class TV implements ITV {

        /**
         * Constructs a new TV.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.ITV);

        /** TV status. */
        public status: show.TV.Status;

        /** TV seasons. */
        public seasons: number;

        /**
         * Creates a new TV instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TV instance
         */
        public static create(properties?: show.ITV): show.TV;

        /**
         * Encodes the specified TV message. Does not implicitly {@link show.TV.verify|verify} messages.
         * @param message TV message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.ITV, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TV message, length delimited. Does not implicitly {@link show.TV.verify|verify} messages.
         * @param message TV message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.ITV, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TV message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TV
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.TV;

        /**
         * Decodes a TV message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TV
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.TV;

        /**
         * Verifies a TV message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TV message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TV
         */
        public static fromObject(object: { [k: string]: any }): show.TV;

        /**
         * Creates a plain object from a TV message. Also converts values to other types if specified.
         * @param message TV
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.TV, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TV to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace TV {

        /** Status enum. */
        enum Status {
            Rumored = 0,
            Planned = 1,
            InProduction = 2,
            PostProduction = 3,
            ReturningSeries = 4,
            Canceled = 5,
            Ended = 6
        }
    }

    /** Properties of a Movie. */
    interface IMovie {

        /** Movie imdbId */
        imdbId?: (string|null);

        /** Movie originalLanguage */
        originalLanguage?: (string|null);

        /** Movie originalTitle */
        originalTitle?: (string|null);

        /** Movie status */
        status?: (show.Movie.Status|null);

        /** Movie budget */
        budget?: (number|null);

        /** Movie runtime */
        runtime?: (number|null);
    }

    /** Represents a Movie. */
    class Movie implements IMovie {

        /**
         * Constructs a new Movie.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IMovie);

        /** Movie imdbId. */
        public imdbId: string;

        /** Movie originalLanguage. */
        public originalLanguage: string;

        /** Movie originalTitle. */
        public originalTitle: string;

        /** Movie status. */
        public status: show.Movie.Status;

        /** Movie budget. */
        public budget: number;

        /** Movie runtime. */
        public runtime: number;

        /**
         * Creates a new Movie instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Movie instance
         */
        public static create(properties?: show.IMovie): show.Movie;

        /**
         * Encodes the specified Movie message. Does not implicitly {@link show.Movie.verify|verify} messages.
         * @param message Movie message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IMovie, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Movie message, length delimited. Does not implicitly {@link show.Movie.verify|verify} messages.
         * @param message Movie message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IMovie, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Movie message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Movie
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Movie;

        /**
         * Decodes a Movie message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Movie
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Movie;

        /**
         * Verifies a Movie message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Movie message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Movie
         */
        public static fromObject(object: { [k: string]: any }): show.Movie;

        /**
         * Creates a plain object from a Movie message. Also converts values to other types if specified.
         * @param message Movie
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Movie, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Movie to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Movie {

        /** Status enum. */
        enum Status {
            Rumored = 0,
            Planned = 1,
            InProduction = 2,
            PostProduction = 3,
            Released = 4,
            Canceled = 5
        }
    }

    /** Properties of a Genre. */
    interface IGenre {

        /** Genre id */
        id?: (number|null);

        /** Genre name */
        name?: (string|null);
    }

    /** Represents a Genre. */
    class Genre implements IGenre {

        /**
         * Constructs a new Genre.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IGenre);

        /** Genre id. */
        public id: number;

        /** Genre name. */
        public name: string;

        /**
         * Creates a new Genre instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Genre instance
         */
        public static create(properties?: show.IGenre): show.Genre;

        /**
         * Encodes the specified Genre message. Does not implicitly {@link show.Genre.verify|verify} messages.
         * @param message Genre message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IGenre, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Genre message, length delimited. Does not implicitly {@link show.Genre.verify|verify} messages.
         * @param message Genre message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IGenre, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Genre message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Genre
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Genre;

        /**
         * Decodes a Genre message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Genre
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Genre;

        /**
         * Verifies a Genre message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Genre message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Genre
         */
        public static fromObject(object: { [k: string]: any }): show.Genre;

        /**
         * Creates a plain object from a Genre message. Also converts values to other types if specified.
         * @param message Genre
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Genre, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Genre to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Votes. */
    interface IVotes {

        /** Votes average */
        average?: (number|null);

        /** Votes count */
        count?: (number|null);
    }

    /** Represents a Votes. */
    class Votes implements IVotes {

        /**
         * Constructs a new Votes.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IVotes);

        /** Votes average. */
        public average: number;

        /** Votes count. */
        public count: number;

        /**
         * Creates a new Votes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Votes instance
         */
        public static create(properties?: show.IVotes): show.Votes;

        /**
         * Encodes the specified Votes message. Does not implicitly {@link show.Votes.verify|verify} messages.
         * @param message Votes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IVotes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Votes message, length delimited. Does not implicitly {@link show.Votes.verify|verify} messages.
         * @param message Votes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IVotes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Votes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Votes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Votes;

        /**
         * Decodes a Votes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Votes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Votes;

        /**
         * Verifies a Votes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Votes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Votes
         */
        public static fromObject(object: { [k: string]: any }): show.Votes;

        /**
         * Creates a plain object from a Votes message. Also converts values to other types if specified.
         * @param message Votes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Votes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Votes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Video. */
    interface IVideo {

        /** Video id */
        id?: (string|null);

        /** Video language */
        language?: (string|null);

        /** Video country */
        country?: (string|null);

        /** Video key */
        key?: (string|null);

        /** Video name */
        name?: (string|null);

        /** Video site */
        site?: (string|null);

        /** Video size */
        size?: (number|null);

        /** Video type */
        type?: (show.Video.Type|null);
    }

    /** Represents a Video. */
    class Video implements IVideo {

        /**
         * Constructs a new Video.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IVideo);

        /** Video id. */
        public id: string;

        /** Video language. */
        public language: string;

        /** Video country. */
        public country: string;

        /** Video key. */
        public key: string;

        /** Video name. */
        public name: string;

        /** Video site. */
        public site: string;

        /** Video size. */
        public size: number;

        /** Video type. */
        public type: show.Video.Type;

        /**
         * Creates a new Video instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Video instance
         */
        public static create(properties?: show.IVideo): show.Video;

        /**
         * Encodes the specified Video message. Does not implicitly {@link show.Video.verify|verify} messages.
         * @param message Video message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IVideo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Video message, length delimited. Does not implicitly {@link show.Video.verify|verify} messages.
         * @param message Video message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IVideo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Video message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Video
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Video;

        /**
         * Decodes a Video message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Video
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Video;

        /**
         * Verifies a Video message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Video message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Video
         */
        public static fromObject(object: { [k: string]: any }): show.Video;

        /**
         * Creates a plain object from a Video message. Also converts values to other types if specified.
         * @param message Video
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Video, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Video to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Video {

        /** Type enum. */
        enum Type {
            Trailer = 0,
            Teaser = 1,
            Clip = 2,
            Featurette = 3,
            BehindtheScenes = 4,
            Bloopers = 5,
            OpeningCredits = 6
        }
    }

    /** Properties of an Image. */
    interface IImage {

        /** Image filePath */
        filePath?: (string|null);

        /** Image aspectRatio */
        aspectRatio?: (number|null);

        /** Image height */
        height?: (number|null);

        /** Image width */
        width?: (number|null);

        /** Image votes */
        votes?: (show.IVotes|null);

        /** Image language */
        language?: (string|null);
    }

    /** Represents an Image. */
    class Image implements IImage {

        /**
         * Constructs a new Image.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IImage);

        /** Image filePath. */
        public filePath: string;

        /** Image aspectRatio. */
        public aspectRatio: number;

        /** Image height. */
        public height: number;

        /** Image width. */
        public width: number;

        /** Image votes. */
        public votes?: (show.IVotes|null);

        /** Image language. */
        public language: string;

        /**
         * Creates a new Image instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Image instance
         */
        public static create(properties?: show.IImage): show.Image;

        /**
         * Encodes the specified Image message. Does not implicitly {@link show.Image.verify|verify} messages.
         * @param message Image message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IImage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Image message, length delimited. Does not implicitly {@link show.Image.verify|verify} messages.
         * @param message Image message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IImage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Image message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Image
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Image;

        /**
         * Decodes an Image message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Image
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Image;

        /**
         * Verifies an Image message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Image message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Image
         */
        public static fromObject(object: { [k: string]: any }): show.Image;

        /**
         * Creates a plain object from an Image message. Also converts values to other types if specified.
         * @param message Image
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Image, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Image to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Watch. */
    interface IWatch {

        /** Watch language */
        language?: (string|null);

        /** Watch link */
        link?: (string|null);

        /** Watch rent */
        rent?: (show.Watch.IProvider[]|null);

        /** Watch buy */
        buy?: (show.Watch.IProvider[]|null);
    }

    /** Represents a Watch. */
    class Watch implements IWatch {

        /**
         * Constructs a new Watch.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.IWatch);

        /** Watch language. */
        public language: string;

        /** Watch link. */
        public link: string;

        /** Watch rent. */
        public rent: show.Watch.IProvider[];

        /** Watch buy. */
        public buy: show.Watch.IProvider[];

        /**
         * Creates a new Watch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Watch instance
         */
        public static create(properties?: show.IWatch): show.Watch;

        /**
         * Encodes the specified Watch message. Does not implicitly {@link show.Watch.verify|verify} messages.
         * @param message Watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.IWatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Watch message, length delimited. Does not implicitly {@link show.Watch.verify|verify} messages.
         * @param message Watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.IWatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Watch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Watch;

        /**
         * Decodes a Watch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Watch;

        /**
         * Verifies a Watch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Watch message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Watch
         */
        public static fromObject(object: { [k: string]: any }): show.Watch;

        /**
         * Creates a plain object from a Watch message. Also converts values to other types if specified.
         * @param message Watch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Watch, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Watch to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Watch {

        /** Properties of a Provider. */
        interface IProvider {

            /** Provider id */
            id?: (number|null);

            /** Provider priority */
            priority?: (number|null);

            /** Provider logoPath */
            logoPath?: (string|null);

            /** Provider name */
            name?: (string|null);
        }

        /** Represents a Provider. */
        class Provider implements IProvider {

            /**
             * Constructs a new Provider.
             * @param [properties] Properties to set
             */
            constructor(properties?: show.Watch.IProvider);

            /** Provider id. */
            public id: number;

            /** Provider priority. */
            public priority: number;

            /** Provider logoPath. */
            public logoPath: string;

            /** Provider name. */
            public name: string;

            /**
             * Creates a new Provider instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Provider instance
             */
            public static create(properties?: show.Watch.IProvider): show.Watch.Provider;

            /**
             * Encodes the specified Provider message. Does not implicitly {@link show.Watch.Provider.verify|verify} messages.
             * @param message Provider message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: show.Watch.IProvider, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Provider message, length delimited. Does not implicitly {@link show.Watch.Provider.verify|verify} messages.
             * @param message Provider message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: show.Watch.IProvider, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Provider message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Provider
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Watch.Provider;

            /**
             * Decodes a Provider message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Provider
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Watch.Provider;

            /**
             * Verifies a Provider message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Provider message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Provider
             */
            public static fromObject(object: { [k: string]: any }): show.Watch.Provider;

            /**
             * Creates a plain object from a Provider message. Also converts values to other types if specified.
             * @param message Provider
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: show.Watch.Provider, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Provider to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a Cast. */
    interface ICast {

        /** Cast id */
        id?: (number|null);

        /** Cast name */
        name?: (string|null);

        /** Cast character */
        character?: (string|null);

        /** Cast profilePath */
        profilePath?: (string|null);
    }

    /** Represents a Cast. */
    class Cast implements ICast {

        /**
         * Constructs a new Cast.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.ICast);

        /** Cast id. */
        public id: number;

        /** Cast name. */
        public name: string;

        /** Cast character. */
        public character: string;

        /** Cast profilePath. */
        public profilePath: string;

        /**
         * Creates a new Cast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Cast instance
         */
        public static create(properties?: show.ICast): show.Cast;

        /**
         * Encodes the specified Cast message. Does not implicitly {@link show.Cast.verify|verify} messages.
         * @param message Cast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.ICast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Cast message, length delimited. Does not implicitly {@link show.Cast.verify|verify} messages.
         * @param message Cast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.ICast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Cast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Cast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Cast;

        /**
         * Decodes a Cast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Cast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Cast;

        /**
         * Verifies a Cast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Cast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Cast
         */
        public static fromObject(object: { [k: string]: any }): show.Cast;

        /**
         * Creates a plain object from a Cast message. Also converts values to other types if specified.
         * @param message Cast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Cast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Cast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Crew. */
    interface ICrew {

        /** Crew id */
        id?: (number|null);

        /** Crew name */
        name?: (string|null);

        /** Crew job */
        job?: (string|null);

        /** Crew profilePath */
        profilePath?: (string|null);
    }

    /** Represents a Crew. */
    class Crew implements ICrew {

        /**
         * Constructs a new Crew.
         * @param [properties] Properties to set
         */
        constructor(properties?: show.ICrew);

        /** Crew id. */
        public id: number;

        /** Crew name. */
        public name: string;

        /** Crew job. */
        public job: string;

        /** Crew profilePath. */
        public profilePath: string;

        /**
         * Creates a new Crew instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Crew instance
         */
        public static create(properties?: show.ICrew): show.Crew;

        /**
         * Encodes the specified Crew message. Does not implicitly {@link show.Crew.verify|verify} messages.
         * @param message Crew message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: show.ICrew, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Crew message, length delimited. Does not implicitly {@link show.Crew.verify|verify} messages.
         * @param message Crew message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: show.ICrew, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Crew message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Crew
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show.Crew;

        /**
         * Decodes a Crew message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Crew
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show.Crew;

        /**
         * Verifies a Crew message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Crew message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Crew
         */
        public static fromObject(object: { [k: string]: any }): show.Crew;

        /**
         * Creates a plain object from a Crew message. Also converts values to other types if specified.
         * @param message Crew
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: show.Crew, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Crew to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace user. */
export namespace user {

    /** Properties of a Detail. */
    interface IDetail {

        /** Detail id */
        id?: (string|null);

        /** Detail email */
        email?: (string|null);

        /** Detail first */
        first?: (string|null);

        /** Detail last */
        last?: (string|null);

        /** Detail genres */
        genres?: (show.IGenre[]|null);
    }

    /** Represents a Detail. */
    class Detail implements IDetail {

        /**
         * Constructs a new Detail.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IDetail);

        /** Detail id. */
        public id: string;

        /** Detail email. */
        public email: string;

        /** Detail first. */
        public first: string;

        /** Detail last. */
        public last: string;

        /** Detail genres. */
        public genres: show.IGenre[];

        /**
         * Creates a new Detail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Detail instance
         */
        public static create(properties?: user.IDetail): user.Detail;

        /**
         * Encodes the specified Detail message. Does not implicitly {@link user.Detail.verify|verify} messages.
         * @param message Detail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: user.IDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Detail message, length delimited. Does not implicitly {@link user.Detail.verify|verify} messages.
         * @param message Detail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: user.IDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Detail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user.Detail;

        /**
         * Decodes a Detail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user.Detail;

        /**
         * Verifies a Detail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Detail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Detail
         */
        public static fromObject(object: { [k: string]: any }): user.Detail;

        /**
         * Creates a plain object from a Detail message. Also converts values to other types if specified.
         * @param message Detail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: user.Detail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Detail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Register. */
    interface IRegister {

        /** Register email */
        email?: (string|null);

        /** Register password */
        password?: (string|null);

        /** Register first */
        first?: (string|null);

        /** Register last */
        last?: (string|null);
    }

    /** Represents a Register. */
    class Register implements IRegister {

        /**
         * Constructs a new Register.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IRegister);

        /** Register email. */
        public email: string;

        /** Register password. */
        public password: string;

        /** Register first. */
        public first: string;

        /** Register last. */
        public last: string;

        /**
         * Creates a new Register instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Register instance
         */
        public static create(properties?: user.IRegister): user.Register;

        /**
         * Encodes the specified Register message. Does not implicitly {@link user.Register.verify|verify} messages.
         * @param message Register message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: user.IRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Register message, length delimited. Does not implicitly {@link user.Register.verify|verify} messages.
         * @param message Register message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: user.IRegister, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Register message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user.Register;

        /**
         * Decodes a Register message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user.Register;

        /**
         * Verifies a Register message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Register message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Register
         */
        public static fromObject(object: { [k: string]: any }): user.Register;

        /**
         * Creates a plain object from a Register message. Also converts values to other types if specified.
         * @param message Register
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: user.Register, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Register to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Update. */
    interface IUpdate {

        /** Update email */
        email?: (string|null);

        /** Update password */
        password?: (string|null);

        /** Update first */
        first?: (string|null);

        /** Update last */
        last?: (string|null);
    }

    /** Represents an Update. */
    class Update implements IUpdate {

        /**
         * Constructs a new Update.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IUpdate);

        /** Update email. */
        public email: string;

        /** Update password. */
        public password: string;

        /** Update first. */
        public first: string;

        /** Update last. */
        public last: string;

        /**
         * Creates a new Update instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Update instance
         */
        public static create(properties?: user.IUpdate): user.Update;

        /**
         * Encodes the specified Update message. Does not implicitly {@link user.Update.verify|verify} messages.
         * @param message Update message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: user.IUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Update message, length delimited. Does not implicitly {@link user.Update.verify|verify} messages.
         * @param message Update message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: user.IUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Update message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Update
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user.Update;

        /**
         * Decodes an Update message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Update
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user.Update;

        /**
         * Verifies an Update message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Update message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Update
         */
        public static fromObject(object: { [k: string]: any }): user.Update;

        /**
         * Creates a plain object from an Update message. Also converts values to other types if specified.
         * @param message Update
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: user.Update, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Update to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Login. */
    interface ILogin {

        /** Login email */
        email?: (string|null);

        /** Login password */
        password?: (string|null);
    }

    /** Represents a Login. */
    class Login implements ILogin {

        /**
         * Constructs a new Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.ILogin);

        /** Login email. */
        public email: string;

        /** Login password. */
        public password: string;

        /**
         * Creates a new Login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login instance
         */
        public static create(properties?: user.ILogin): user.Login;

        /**
         * Encodes the specified Login message. Does not implicitly {@link user.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: user.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link user.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: user.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user.Login;

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user.Login;

        /**
         * Verifies a Login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Login
         */
        public static fromObject(object: { [k: string]: any }): user.Login;

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @param message Login
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: user.Login, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Login to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DetailAndToken. */
    interface IDetailAndToken {

        /** DetailAndToken token */
        token?: (string|null);

        /** DetailAndToken detail */
        detail?: (user.IDetail|null);
    }

    /** Represents a DetailAndToken. */
    class DetailAndToken implements IDetailAndToken {

        /**
         * Constructs a new DetailAndToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IDetailAndToken);

        /** DetailAndToken token. */
        public token: string;

        /** DetailAndToken detail. */
        public detail?: (user.IDetail|null);

        /**
         * Creates a new DetailAndToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DetailAndToken instance
         */
        public static create(properties?: user.IDetailAndToken): user.DetailAndToken;

        /**
         * Encodes the specified DetailAndToken message. Does not implicitly {@link user.DetailAndToken.verify|verify} messages.
         * @param message DetailAndToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: user.IDetailAndToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DetailAndToken message, length delimited. Does not implicitly {@link user.DetailAndToken.verify|verify} messages.
         * @param message DetailAndToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: user.IDetailAndToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DetailAndToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DetailAndToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user.DetailAndToken;

        /**
         * Decodes a DetailAndToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DetailAndToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user.DetailAndToken;

        /**
         * Verifies a DetailAndToken message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DetailAndToken message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DetailAndToken
         */
        public static fromObject(object: { [k: string]: any }): user.DetailAndToken;

        /**
         * Creates a plain object from a DetailAndToken message. Also converts values to other types if specified.
         * @param message DetailAndToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: user.DetailAndToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DetailAndToken to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
