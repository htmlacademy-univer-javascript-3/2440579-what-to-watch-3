import {FilmCard} from '../film-card/film-card';
import {Film} from '../../types/film';
import {useState} from 'react';
import {ShowMore} from '../show-more/show-more';

type FilmListProps = {
  films: Film[];
  displayedFilmsSize?: number;
}

export function FilmList({films, displayedFilmsSize}: FilmListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState('');

  displayedFilmsSize = displayedFilmsSize || films.length;

  return (
    <>
      <div className="catalog__films-list">
        {films.slice(0, displayedFilmsSize).map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            isActive={activeFilmId === film.id}
            onMouseEnter={() => setActiveFilmId(film.id)}
            onMouseLeave={() => setActiveFilmId('')}
          />
        ))}
      </div>
      { films.length > displayedFilmsSize && <ShowMore/>}
    </>
  );
}
