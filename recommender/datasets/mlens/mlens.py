"""mlens dataset."""
import csv
from typing import Iterator, Tuple, Dict, Any

import tensorflow

import tensorflow_datasets as tfds

# TODO(mlens): Markdown description  that will appear on the catalog page.
_DESCRIPTION = """
Description is **formatted** as markdown.

It should also contain any processing which has been applied (if any),
(e.g. corrupted example skipped, images cropped,...):
"""

# TODO(mlens): BibTeX citation
_CITATION = """
"""


class Mlens(tfds.core.GeneratorBasedBuilder):
    """DatasetBuilder for mlens dataset."""

    VERSION = tfds.core.Version('1.0.0')
    RELEASE_NOTES = {
        '1.0.0': 'Initial release.',
    }


    def _info(self) -> tfds.core.DatasetInfo:
        """Returns the dataset metadata."""

        return tfds.core.DatasetInfo(
            builder=self,
            description=_DESCRIPTION,
            features=tfds.features.FeaturesDict({
                # These are the features of your dataset like images, labels ...
                # 'image': tfds.features.Image(shape=(None, None, 3)),
                # 'label': tfds.features.ClassLabel(names=['no', 'yes']),
                'user_id': tensorflow.string,
                'user_rating': tensorflow.float32,
                'timestamp': tensorflow.float64,

                'movie_id':
                    tensorflow.string,
                'movie_title':
                    tensorflow.string,
                'movie_genres':
                    tfds.features.Sequence(
                        tfds.features.ClassLabel(names=[
                            'Action',
                            'Adventure',
                            'Animation',
                            'Children',
                            'Comedy',
                            'Crime',
                            'Documentary',
                            'Drama',
                            'Fantasy',
                            'Film-Noir',
                            'Horror',
                            'IMAX',
                            'Musical',
                            'Mystery',
                            'Romance',
                            'Sci-Fi',
                            'Thriller',
                            'Unknown',
                            'War',
                            'Western',
                            '(no genres listed)',
                        ]),),
            }),
            # If there's a common (input, target) tuple from the
            # features, specify them here. They'll be used if
            # `as_supervised=True` in `builder.as_dataset`.
            # supervised_keys=('image', 'label'),  # Set to `None` to disable
            homepage='https://dataset-homepage/',
            citation=_CITATION,
        )

    def _split_generators(self, dl_manager: tfds.download.DownloadManager):
        """Returns SplitGenerators."""
        # TODO(couchtime): Downloads the data and defines the splits
        # path = dl_manager.download_and_extract('https://todo-data-url')

        # TODO(couchtime): Returns the Dict[split names, Iterator[Key, Example]]
        return {
            'train': self._generate_examples(),
        }

    def _generate_examples(self) -> Iterator[Tuple[int, Dict[str, Any]]]:
        """Yields examples by calling the corresponding parsing function."""
        for ex in parse_current_ratings_data():
            yield ex


def parse_current_movies_data() -> Iterator[Tuple[int, Dict[str, Any]]]:
    """Parses the movies data in current format (20m, 25m, and latest-small)."""
    movies_file_path = 'datasets/mlens/data/movies.csv'
    with tensorflow.io.gfile.GFile(movies_file_path) as movies_file:
        movies_reader = csv.DictReader(movies_file)
        for row_num, row in enumerate(movies_reader):
            yield row_num, {
                'movie_id': row['movieId'],
                'movie_title': row['title'],
                'movie_genres': row['genres'].split('|'),
            }


def parse_current_ratings_data() -> Iterator[Tuple[int, Dict[str, Any]]]:
    """Parses the ratings data in current format (20m, 25m, and latest-small)."""
    movie_info_map = {}
    for _, movie_example in parse_current_movies_data():
        movie_info_map[movie_example['movie_id']] = movie_example

    ratings_file_path = 'datasets/mlens/data/25m/ratings.csv'
    with tensorflow.io.gfile.GFile(ratings_file_path) as ratings_file:
        ratings_reader = csv.DictReader(ratings_file)
        for row_num, row in enumerate(ratings_reader):
            ex = {
                'user_id': row['userId'],
                'user_rating': row['rating'],
                'timestamp': row['timestamp'],
            }
            ex.update(movie_info_map[row['movieId']])
            yield row_num, ex
