import {ALL_GENRES} from '../../const';
import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setGenre} from '../../store/action';
import {getCurrentGenre} from '../../store/film-data/selectors';

type GenreListProps = {
  genres: Set<string>;
}

export function GenreList({genres}: GenreListProps) : JSX.Element {
  const selectedGenre = useAppSelector(getCurrentGenre);
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {
        [ALL_GENRES, ...genres].map((g) => (
          <li key={g} className={cn('catalog__genres-item', {'catalog__genres-item--active': selectedGenre === g})}>
            <a onClick={() => dispatch(setGenre(g))} className="catalog__genres-link">{g}</a>
          </li>
        ))
      }
    </ul>
  );
}
