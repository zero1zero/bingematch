import * as $protobuf from "protobufjs";

/** Namespace movie. */
export namespace movie {

    /** Properties of a Detail. */
    interface IDetail {

        /** Detail id */
        id?: (number|null);

        /** Detail title */
        title?: (string|null);

        /** Detail overview */
        overview?: (string|null);

        /** Detail genres */
        genres?: (movie.IGenre[]|null);

        /** Detail originalLanguage */
        originalLanguage?: (string|null);

        /** Detail originalTitle */
        originalTitle?: (string|null);

        /** Detail posterPath */
        posterPath?: (string|null);

        /** Detail backdropPath */
        backdropPath?: (string|null);

        /** Detail votes */
        votes?: (movie.IVotes|null);

        /** Detail releaseDate */
        releaseDate?: (string|null);

        /** Detail popularity */
        popularity?: (number|null);

        /** Detail tagline */
        tagline?: (string|null);

        /** Detail imdbId */
        imdbId?: (string|null);

        /** Detail status */
        status?: (movie.Detail.Status|null);

        /** Detail spokenLanguage */
        spokenLanguage?: (string[]|null);

        /** Detail videos */
        videos?: (movie.IVideo[]|null);

        /** Detail posters */
        posters?: (movie.IImage[]|null);

        /** Detail recommendations */
        recommendations?: (number[]|null);

        /** Detail similar */
        similar?: (number[]|null);

        /** Detail watch */
        watch?: (movie.IWatch[]|null);
    }

    /** Represents a Detail. */
    class Detail implements IDetail {

        /**
         * Constructs a new Detail.
         * @param [properties] Properties to set
         */
        constructor(properties?: movie.IDetail);

        /** Detail id. */
        public id: number;

        /** Detail title. */
        public title: string;

        /** Detail overview. */
        public overview: string;

        /** Detail genres. */
        public genres: movie.IGenre[];

        /** Detail originalLanguage. */
        public originalLanguage: string;

        /** Detail originalTitle. */
        public originalTitle: string;

        /** Detail posterPath. */
        public posterPath: string;

        /** Detail backdropPath. */
        public backdropPath: string;

        /** Detail votes. */
        public votes?: (movie.IVotes|null);

        /** Detail releaseDate. */
        public releaseDate: string;

        /** Detail popularity. */
        public popularity: number;

        /** Detail tagline. */
        public tagline: string;

        /** Detail imdbId. */
        public imdbId: string;

        /** Detail status. */
        public status: movie.Detail.Status;

        /** Detail spokenLanguage. */
        public spokenLanguage: string[];

        /** Detail videos. */
        public videos: movie.IVideo[];

        /** Detail posters. */
        public posters: movie.IImage[];

        /** Detail recommendations. */
        public recommendations: number[];

        /** Detail similar. */
        public similar: number[];

        /** Detail watch. */
        public watch: movie.IWatch[];

        /**
         * Creates a new Detail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Detail instance
         */
        public static create(properties?: movie.IDetail): movie.Detail;

        /**
         * Encodes the specified Detail message. Does not implicitly {@link movie.Detail.verify|verify} messages.
         * @param message Detail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: movie.IDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Detail message, length delimited. Does not implicitly {@link movie.Detail.verify|verify} messages.
         * @param message Detail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: movie.IDetail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Detail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movie.Detail;

        /**
         * Decodes a Detail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Detail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movie.Detail;

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
        public static fromObject(object: { [k: string]: any }): movie.Detail;

        /**
         * Creates a plain object from a Detail message. Also converts values to other types if specified.
         * @param message Detail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: movie.Detail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Detail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Detail {

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
        constructor(properties?: movie.IGenre);

        /** Genre id. */
        public id: number;

        /** Genre name. */
        public name: string;

        /**
         * Creates a new Genre instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Genre instance
         */
        public static create(properties?: movie.IGenre): movie.Genre;

        /**
         * Encodes the specified Genre message. Does not implicitly {@link movie.Genre.verify|verify} messages.
         * @param message Genre message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: movie.IGenre, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Genre message, length delimited. Does not implicitly {@link movie.Genre.verify|verify} messages.
         * @param message Genre message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: movie.IGenre, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Genre message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Genre
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movie.Genre;

        /**
         * Decodes a Genre message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Genre
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movie.Genre;

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
        public static fromObject(object: { [k: string]: any }): movie.Genre;

        /**
         * Creates a plain object from a Genre message. Also converts values to other types if specified.
         * @param message Genre
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: movie.Genre, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: movie.IVotes);

        /** Votes average. */
        public average: number;

        /** Votes count. */
        public count: number;

        /**
         * Creates a new Votes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Votes instance
         */
        public static create(properties?: movie.IVotes): movie.Votes;

        /**
         * Encodes the specified Votes message. Does not implicitly {@link movie.Votes.verify|verify} messages.
         * @param message Votes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: movie.IVotes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Votes message, length delimited. Does not implicitly {@link movie.Votes.verify|verify} messages.
         * @param message Votes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: movie.IVotes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Votes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Votes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movie.Votes;

        /**
         * Decodes a Votes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Votes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movie.Votes;

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
        public static fromObject(object: { [k: string]: any }): movie.Votes;

        /**
         * Creates a plain object from a Votes message. Also converts values to other types if specified.
         * @param message Votes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: movie.Votes, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        type?: (movie.Video.Type|null);
    }

    /** Represents a Video. */
    class Video implements IVideo {

        /**
         * Constructs a new Video.
         * @param [properties] Properties to set
         */
        constructor(properties?: movie.IVideo);

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
        public type: movie.Video.Type;

        /**
         * Creates a new Video instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Video instance
         */
        public static create(properties?: movie.IVideo): movie.Video;

        /**
         * Encodes the specified Video message. Does not implicitly {@link movie.Video.verify|verify} messages.
         * @param message Video message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: movie.IVideo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Video message, length delimited. Does not implicitly {@link movie.Video.verify|verify} messages.
         * @param message Video message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: movie.IVideo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Video message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Video
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movie.Video;

        /**
         * Decodes a Video message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Video
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movie.Video;

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
        public static fromObject(object: { [k: string]: any }): movie.Video;

        /**
         * Creates a plain object from a Video message. Also converts values to other types if specified.
         * @param message Video
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: movie.Video, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            Bloopers = 5
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
        votes?: (movie.IVotes|null);

        /** Image language */
        language?: (string|null);
    }

    /** Represents an Image. */
    class Image implements IImage {

        /**
         * Constructs a new Image.
         * @param [properties] Properties to set
         */
        constructor(properties?: movie.IImage);

        /** Image filePath. */
        public filePath: string;

        /** Image aspectRatio. */
        public aspectRatio: number;

        /** Image height. */
        public height: number;

        /** Image width. */
        public width: number;

        /** Image votes. */
        public votes?: (movie.IVotes|null);

        /** Image language. */
        public language: string;

        /**
         * Creates a new Image instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Image instance
         */
        public static create(properties?: movie.IImage): movie.Image;

        /**
         * Encodes the specified Image message. Does not implicitly {@link movie.Image.verify|verify} messages.
         * @param message Image message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: movie.IImage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Image message, length delimited. Does not implicitly {@link movie.Image.verify|verify} messages.
         * @param message Image message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: movie.IImage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Image message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Image
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movie.Image;

        /**
         * Decodes an Image message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Image
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movie.Image;

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
        public static fromObject(object: { [k: string]: any }): movie.Image;

        /**
         * Creates a plain object from an Image message. Also converts values to other types if specified.
         * @param message Image
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: movie.Image, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        rent?: (movie.Watch.IProvider[]|null);

        /** Watch buy */
        buy?: (movie.Watch.IProvider[]|null);
    }

    /** Represents a Watch. */
    class Watch implements IWatch {

        /**
         * Constructs a new Watch.
         * @param [properties] Properties to set
         */
        constructor(properties?: movie.IWatch);

        /** Watch language. */
        public language: string;

        /** Watch link. */
        public link: string;

        /** Watch rent. */
        public rent: movie.Watch.IProvider[];

        /** Watch buy. */
        public buy: movie.Watch.IProvider[];

        /**
         * Creates a new Watch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Watch instance
         */
        public static create(properties?: movie.IWatch): movie.Watch;

        /**
         * Encodes the specified Watch message. Does not implicitly {@link movie.Watch.verify|verify} messages.
         * @param message Watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: movie.IWatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Watch message, length delimited. Does not implicitly {@link movie.Watch.verify|verify} messages.
         * @param message Watch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: movie.IWatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Watch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movie.Watch;

        /**
         * Decodes a Watch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movie.Watch;

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
        public static fromObject(object: { [k: string]: any }): movie.Watch;

        /**
         * Creates a plain object from a Watch message. Also converts values to other types if specified.
         * @param message Watch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: movie.Watch, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            constructor(properties?: movie.Watch.IProvider);

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
            public static create(properties?: movie.Watch.IProvider): movie.Watch.Provider;

            /**
             * Encodes the specified Provider message. Does not implicitly {@link movie.Watch.Provider.verify|verify} messages.
             * @param message Provider message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: movie.Watch.IProvider, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Provider message, length delimited. Does not implicitly {@link movie.Watch.Provider.verify|verify} messages.
             * @param message Provider message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: movie.Watch.IProvider, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Provider message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Provider
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movie.Watch.Provider;

            /**
             * Decodes a Provider message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Provider
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movie.Watch.Provider;

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
            public static fromObject(object: { [k: string]: any }): movie.Watch.Provider;

            /**
             * Creates a plain object from a Provider message. Also converts values to other types if specified.
             * @param message Provider
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: movie.Watch.Provider, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Provider to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace queue. */
export namespace queue {

    /** Properties of an AllItems. */
    interface IAllItems {

        /** AllItems items */
        items?: (queue.IItem[]|null);
    }

    /** Represents an AllItems. */
    class AllItems implements IAllItems {

        /**
         * Constructs a new AllItems.
         * @param [properties] Properties to set
         */
        constructor(properties?: queue.IAllItems);

        /** AllItems items. */
        public items: queue.IItem[];

        /**
         * Creates a new AllItems instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AllItems instance
         */
        public static create(properties?: queue.IAllItems): queue.AllItems;

        /**
         * Encodes the specified AllItems message. Does not implicitly {@link queue.AllItems.verify|verify} messages.
         * @param message AllItems message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: queue.IAllItems, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AllItems message, length delimited. Does not implicitly {@link queue.AllItems.verify|verify} messages.
         * @param message AllItems message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: queue.IAllItems, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AllItems message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AllItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): queue.AllItems;

        /**
         * Decodes an AllItems message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AllItems
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): queue.AllItems;

        /**
         * Verifies an AllItems message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AllItems message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AllItems
         */
        public static fromObject(object: { [k: string]: any }): queue.AllItems;

        /**
         * Creates a plain object from an AllItems message. Also converts values to other types if specified.
         * @param message AllItems
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: queue.AllItems, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AllItems to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Item. */
    interface IItem {

        /** Item id */
        id?: (string|null);

        /** Item tmdbid */
        tmdbid?: (number|null);

        /** Item state */
        state?: (queue.Item.State|null);

        /** Item movie */
        movie?: (movie.IDetail|null);
    }

    /** Represents an Item. */
    class Item implements IItem {

        /**
         * Constructs a new Item.
         * @param [properties] Properties to set
         */
        constructor(properties?: queue.IItem);

        /** Item id. */
        public id: string;

        /** Item tmdbid. */
        public tmdbid: number;

        /** Item state. */
        public state: queue.Item.State;

        /** Item movie. */
        public movie?: (movie.IDetail|null);

        /**
         * Creates a new Item instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Item instance
         */
        public static create(properties?: queue.IItem): queue.Item;

        /**
         * Encodes the specified Item message. Does not implicitly {@link queue.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: queue.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link queue.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: queue.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): queue.Item;

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): queue.Item;

        /**
         * Verifies an Item message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Item
         */
        public static fromObject(object: { [k: string]: any }): queue.Item;

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @param message Item
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: queue.Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Item to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Item {

        /** State enum. */
        enum State {
            Queued = 0,
            Like = 1,
            Dislike = 2,
            Love = 3,
            Hate = 4,
            Skipped = 5
        }
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
