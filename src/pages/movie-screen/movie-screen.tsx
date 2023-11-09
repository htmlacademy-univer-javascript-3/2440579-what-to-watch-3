import {Footer} from '../../components/footer/footer';
import {Logo} from '../../components/logo/logo';
import {Film} from '../../types/Film';
import {FilmList} from '../../components/film-list/film-list';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../const';
import {NotFoundScreen} from '../not-found-screen/not-found-screen';
import {Tabs} from '../../components/tabs/tabs';

export type MovieScreenProps = {
  films: Film[];
}

export function MovieScreen({films} : MovieScreenProps) : JSX.Element {
  const {id} = useParams();
  const navigate = useNavigate();
  const mainFilm: Film | undefined = films.find((f) => f.id === id);

  if (!mainFilm) {
    return <NotFoundScreen/>;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={mainFilm.backgroundImage} alt={mainFilm.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">

            <Logo/>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{mainFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => navigate(AppRoute.Player.replace(':id', mainFilm.id))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button"
                  onClick={() => navigate(AppRoute.MyList.replace(':id', mainFilm.id))}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={AppRoute.AddReview.replace(':id', mainFilm.id)} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={mainFilm.posterImage} alt={`${mainFilm.name } poster`} width="218"
                height="327"
              />
            </div>

            <Tabs film={mainFilm}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={films.filter((f) => f.id !== id)} />

        </section>

        <Footer />

      </div>
    </>
  );
}
