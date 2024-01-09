import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {fetchFavoritesFilms, fetchFilm, fetchPromoFilm, postFavoritesStatus} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteFilms} from '../../store/film-data/selectors';
import {uuid} from '../../types/film';
import {getAuthStatus} from '../../store/user-process/selectors';
import {AppRoute, AuthStatus} from '../../const';
import {useNavigate} from 'react-router-dom';


type MyListButtonProps = {
  filmId: uuid;
  isFavorite: boolean;
};


export default function MyListButton({ filmId, isFavorite }: MyListButtonProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFavoritesFilms());
  }, [dispatch]);

  const handleClick = () => {
    if (authStatus !== AuthStatus.Auth) {
      return navigate(AppRoute.SignIn);
    }
    const favoriteStatus = isFavorite ? 0 : 1;
    dispatch(postFavoritesStatus({ filmId, status: favoriteStatus }))
      .unwrap()
      .then(() => {
        dispatch(fetchFavoritesFilms());
        dispatch(fetchFilm(filmId));
        dispatch(fetchPromoFilm());
      });
  };
  const favoriteFilms = useSelector(getFavoriteFilms);

  return (
    <button onClick={handleClick} className="btn btn--play film-card__button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

