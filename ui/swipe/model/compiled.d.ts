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
    }

    /** Properties of a QueuedShow. */
    interface IQueuedShow {

        /** QueuedShow show */
        show?: (string|null);
    }

    /** Represents a QueuedShow. */
    class QueuedShow implements IQueuedShow {

        /**
         * Constructs a new QueuedShow.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IQueuedShow);

        /** QueuedShow show. */
        public show: string;
    }

    /** Properties of a DislikedShow. */
    interface IDislikedShow {

        /** DislikedShow show */
        show?: (string|null);
    }

    /** Represents a DislikedShow. */
    class DislikedShow implements IDislikedShow {

        /**
         * Constructs a new DislikedShow.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IDislikedShow);

        /** DislikedShow show. */
        public show: string;
    }

    /** Properties of a LikedShow. */
    interface ILikedShow {

        /** LikedShow show */
        show?: (string|null);

        /** LikedShow order */
        order?: (number|null);
    }

    /** Represents a LikedShow. */
    class LikedShow implements ILikedShow {

        /**
         * Constructs a new LikedShow.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.ILikedShow);

        /** LikedShow show. */
        public show: string;

        /** LikedShow order. */
        public order: number;
    }

    /** Properties of a MatchedShow. */
    interface IMatchedShow {

        /** MatchedShow show */
        show?: (string|null);

        /** MatchedShow user */
        user?: (string|null);

        /** MatchedShow order */
        order?: (number|null);
    }

    /** Represents a MatchedShow. */
    class MatchedShow implements IMatchedShow {

        /**
         * Constructs a new MatchedShow.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IMatchedShow);

        /** MatchedShow show. */
        public show: string;

        /** MatchedShow user. */
        public user: string;

        /** MatchedShow order. */
        public order: number;
    }

    /** Properties of a WatchedShow. */
    interface IWatchedShow {

        /** WatchedShow show */
        show?: (string|null);

        /** WatchedShow rating */
        rating?: (number|null);
    }

    /** Represents a WatchedShow. */
    class WatchedShow implements IWatchedShow {

        /**
         * Constructs a new WatchedShow.
         * @param [properties] Properties to set
         */
        constructor(properties?: user.IWatchedShow);

        /** WatchedShow show. */
        public show: string;

        /** WatchedShow rating. */
        public rating: number;
    }
}
