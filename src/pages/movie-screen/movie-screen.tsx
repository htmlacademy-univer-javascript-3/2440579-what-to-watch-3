import {Footer} from '../../components/footer/footer';
import {Logo} from '../../components/logo/logo';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {AppRoute, AuthStatus, MAX_MORE_LIKES_THIS_SIZE} from '../../const';
import {NotFoundScreen} from '../not-found-screen/not-found-screen';
import {Tabs} from '../../components/tabs/tabs';
import {UserBlock} from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, useState} from 'react';
import {fetchFilm, fetchSimilarFilms} from '../../store/api-actions';
import {FilmList} from '../../components/film-list/film-list';
import {Film} from '../../types/film';
import {getCurrentFilm} from '../../store/film-data/selectors';
import {getAuthStatus} from '../../store/user-process/selectors';
import MyListButton from '../../components/my-list-button/my-list-button';


export function MovieScreen() : JSX.Element {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getCurrentFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const [similarFilms, setSimilarFilms] = useState<Film[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
      dispatch(fetchSimilarFilms(id))
        .unwrap()
        .then((data) => setSimilarFilms(data));
    }
  }, [dispatch, id, authStatus]);

  if (!film) {
    return <NotFoundScreen/>;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">

            <Logo/>

            <UserBlock/>

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => navigate(AppRoute.Player.replace(':id', film.id))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <MyListButton filmId={film.id} isFavorite={film.isFavorite}/>
                {
                  authStatus === AuthStatus.Auth &&
                  <Link to={AppRoute.AddReview.replace(':id', film.id)} className="btn film-card__button">Add review</Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name } poster`} width="218"
                height="327"
              />
            </div>

            <Tabs film={film}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={similarFilms} displayedFilmsSize={MAX_MORE_LIKES_THIS_SIZE}/>

        </section>

        <Footer />

      </div>
    </>
  );
}
