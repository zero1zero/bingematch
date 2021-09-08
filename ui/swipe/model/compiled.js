/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

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

        return DetailAndToken;
    })();

    user.QueuedShow = (function() {

        /**
         * Properties of a QueuedShow.
         * @memberof user
         * @interface IQueuedShow
         * @property {string|null} [show] QueuedShow show
         */

        /**
         * Constructs a new QueuedShow.
         * @memberof user
         * @classdesc Represents a QueuedShow.
         * @implements IQueuedShow
         * @constructor
         * @param {user.IQueuedShow=} [properties] Properties to set
         */
        function QueuedShow(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QueuedShow show.
         * @member {string} show
         * @memberof user.QueuedShow
         * @instance
         */
        QueuedShow.prototype.show = "";

        return QueuedShow;
    })();

    user.DislikedShow = (function() {

        /**
         * Properties of a DislikedShow.
         * @memberof user
         * @interface IDislikedShow
         * @property {string|null} [show] DislikedShow show
         */

        /**
         * Constructs a new DislikedShow.
         * @memberof user
         * @classdesc Represents a DislikedShow.
         * @implements IDislikedShow
         * @constructor
         * @param {user.IDislikedShow=} [properties] Properties to set
         */
        function DislikedShow(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DislikedShow show.
         * @member {string} show
         * @memberof user.DislikedShow
         * @instance
         */
        DislikedShow.prototype.show = "";

        return DislikedShow;
    })();

    user.LikedShow = (function() {

        /**
         * Properties of a LikedShow.
         * @memberof user
         * @interface ILikedShow
         * @property {string|null} [show] LikedShow show
         * @property {number|null} [order] LikedShow order
         */

        /**
         * Constructs a new LikedShow.
         * @memberof user
         * @classdesc Represents a LikedShow.
         * @implements ILikedShow
         * @constructor
         * @param {user.ILikedShow=} [properties] Properties to set
         */
        function LikedShow(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LikedShow show.
         * @member {string} show
         * @memberof user.LikedShow
         * @instance
         */
        LikedShow.prototype.show = "";

        /**
         * LikedShow order.
         * @member {number} order
         * @memberof user.LikedShow
         * @instance
         */
        LikedShow.prototype.order = 0;

        return LikedShow;
    })();

    user.MatchedShow = (function() {

        /**
         * Properties of a MatchedShow.
         * @memberof user
         * @interface IMatchedShow
         * @property {string|null} [show] MatchedShow show
         * @property {string|null} [user] MatchedShow user
         * @property {number|null} [order] MatchedShow order
         */

        /**
         * Constructs a new MatchedShow.
         * @memberof user
         * @classdesc Represents a MatchedShow.
         * @implements IMatchedShow
         * @constructor
         * @param {user.IMatchedShow=} [properties] Properties to set
         */
        function MatchedShow(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchedShow show.
         * @member {string} show
         * @memberof user.MatchedShow
         * @instance
         */
        MatchedShow.prototype.show = "";

        /**
         * MatchedShow user.
         * @member {string} user
         * @memberof user.MatchedShow
         * @instance
         */
        MatchedShow.prototype.user = "";

        /**
         * MatchedShow order.
         * @member {number} order
         * @memberof user.MatchedShow
         * @instance
         */
        MatchedShow.prototype.order = 0;

        return MatchedShow;
    })();

    user.WatchedShow = (function() {

        /**
         * Properties of a WatchedShow.
         * @memberof user
         * @interface IWatchedShow
         * @property {string|null} [show] WatchedShow show
         * @property {number|null} [rating] WatchedShow rating
         */

        /**
         * Constructs a new WatchedShow.
         * @memberof user
         * @classdesc Represents a WatchedShow.
         * @implements IWatchedShow
         * @constructor
         * @param {user.IWatchedShow=} [properties] Properties to set
         */
        function WatchedShow(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WatchedShow show.
         * @member {string} show
         * @memberof user.WatchedShow
         * @instance
         */
        WatchedShow.prototype.show = "";

        /**
         * WatchedShow rating.
         * @member {number} rating
         * @memberof user.WatchedShow
         * @instance
         */
        WatchedShow.prototype.rating = 0;

        return WatchedShow;
    })();

    return user;
})();

export { $root as default };
