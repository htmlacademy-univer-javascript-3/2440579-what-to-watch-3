import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Film} from '../../types/Film';
import {MouseEventHandler} from 'react';

export type FilmCardProps = {
  film: Film;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

export function FilmCard({film, onMouseEnter, onMouseLeave}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film.replace(':id', film.id)} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}
