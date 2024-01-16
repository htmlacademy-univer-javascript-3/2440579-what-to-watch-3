import {DetailFilm} from '../../types/film';

function getRatingText(rating: number): string {
  if (rating === 10) {
    return 'Awesome';
  } else if (rating >= 8) {
    return 'Very good';
  } else if (rating >= 5) {
    return 'Good';
  } else if (rating >= 3) {
    return 'Normal';
  } else {
    return 'Bad';
  }
}

export type OverviewProps = {
  film: DetailFilm;
}

export function OverviewTab({film}: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingText(film.rating)}</span>
          <span className="film-rating__count">{`${film.scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>{`Director: ${film.director}`}</strong></p>

        <p className="film-card__starring"><strong>{`Starring: ${film.starring.join(', ')} and other`}</strong></p>
      </div>
    </>
  );
}
