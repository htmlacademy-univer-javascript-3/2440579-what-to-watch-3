import {FilmCard} from '../film-card/film-card';
import {Film} from '../../types/Film';
import {useState} from 'react';

type FilmListProps = {
  films: Film[];
}

export function FilmList({films}: FilmListProps): JSX.Element {
  const [, setActiveFilm] = useState('');

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          onMouseEnter={() => setActiveFilm(film.id)}
          onMouseLeave={() => setActiveFilm('')}
        />
      ))}
    </div>
  );
}
