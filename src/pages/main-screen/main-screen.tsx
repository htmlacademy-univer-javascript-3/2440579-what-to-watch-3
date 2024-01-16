import {Footer} from '../../components/footer/footer';
import {Logo} from '../../components/logo/logo';
import {FilmList} from '../../components/film-list/film-list';
import {useNavigate} from 'react-router-dom';
import {AppRoute, MAX_GENRE_LIST_SIZE} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GenreList} from '../../components/genre-list/genre-list';
import {useEffect, useMemo} from 'react';
import {getFilms, resetFilmSize} from '../../store/action';
import Spinner from '../../components/spinner/Spinner';
import {UserBlock} from '../../components/user-block/user-block';
import {
  getAllFilms,
  getCurrentGenre, getFilmDataLoadingStatus,
  getFilmsByGenre,
  getFilmsSize,
  getPromoFilm
} from '../../store/film-data/selectors';
import MyListButton from '../../components/my-list-button/my-list-button';
import {getAuthStatus} from '../../store/user-process/selectors';
import {fetchPromoFilm} from '../../store/api-actions';

export function MainScreen(): JSX.Element {
  const films = useAppSelector(getAllFilms);
  const filmsByGenre = useAppSelector(getFilmsByGenre);
  const selectedGenre = useAppSelector(getCurrentGenre);
  const displayedFilmsSize = useAppSelector(getFilmsSize);
  const promoFilm = useAppSelector(getPromoFilm);
  const filmDataLoadingStatus = useAppSelector(getFilmDataLoadingStatus);
  const authStatus = useAppSelector(getAuthStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filmGenres = useMemo(
    () => ['All genres', ...new Set(films.map((film) => film.genre))]
      .slice(0, MAX_GENRE_LIST_SIZE + 1),
    [films]);

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch, selectedGenre, films]);

  useEffect(() => {
    dispatch(fetchPromoFilm());
  }, [dispatch, authStatus]);

  useEffect(() => {
    dispatch(resetFilmSize());
  }, [dispatch]);

  if (filmDataLoadingStatus || promoFilm === null) {
    return <Spinner/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">

          <Logo/>

          <UserBlock/>

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released.valueOf()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => navigate(AppRoute.Player.replace(':id', promoFilm.id))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <MyListButton filmId={promoFilm.id} isFavorite={promoFilm.isFavorite}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={filmGenres}/>

          <FilmList films={filmsByGenre} displayedFilmsSize={displayedFilmsSize} showMore/>

        </section>

        <Footer />

      </div>
    </>
  );
}
