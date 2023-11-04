import {FilmCard} from '../../components/film-card/film-card';
import {Footer} from '../../components/footer/footer';
import {Film} from '../../types/Film';
import {Logo} from '../../components/logo/logo';

type MainScreenProps = {
  promoFilm: Film;
}

export function MainScreen({promoFilm}: MainScreenProps): JSX.Element {
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={promoFilm.name}/>
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
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.poster} alt={`${promoFilm.name} poster`} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.date.getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">
            <FilmCard imageSrc={'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'} title={'Fantastic Beasts: The Crimes of Grindelwald'}/>
            <FilmCard imageSrc={'img/bohemian-rhapsody.jpg'} title={'Bohemian Rhapsody'}/>
            <FilmCard imageSrc={'img/macbeth.jpg'} title={'Macbeth'}/>
            <FilmCard imageSrc={'img/aviator.jpg'} title={'Aviator'}/>
            <FilmCard imageSrc={'img/we-need-to-talk-about-kevin.jpg'} title={'We need to talk about Kevin'}/>
            <FilmCard imageSrc={'img/what-we-do-in-the-shadows.jpg'} title={'What We Do in the Shadows'}/>
            <FilmCard imageSrc={'img/johnny-english.jpg'} title={'Johnny English'}/>
            <FilmCard imageSrc={'img/shutter-island.jpg'} title={'Shutter Island'}/>
            <FilmCard imageSrc={'img/pulp-fiction.jpg'} title={'Pulp Fiction'}/>
            <FilmCard imageSrc={'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'} title={'Fantastic Beasts: The Crimes of Grindelwald'}/>
            <FilmCard imageSrc={'img/bohemian-rhapsody.jpg'} title={'Bohemian Rhapsody'}/>
            <FilmCard imageSrc={'img/macbeth.jpg'} title={'Macbeth'}/>
            <FilmCard imageSrc={'img/aviator.jpg'} title={'Aviator'}/>
            <FilmCard imageSrc={'img/we-need-to-talk-about-kevin.jpg'} title={'We need to talk about Kevin'}/>
            <FilmCard imageSrc={'img/what-we-do-in-the-shadows.jpg'} title={'What We Do in the Shadows'}/>
            <FilmCard imageSrc={'img/johnny-english.jpg'} title={'Johnny English'}/>
            <FilmCard imageSrc={'img/shutter-island.jpg'} title={'Shutter Island'}/>
            <FilmCard imageSrc={'img/pulp-fiction.jpg'} title={'Pulp Fiction'}/>
            <FilmCard imageSrc={'img/macbeth.jpg'} title={'Macbeth'}/>
            <FilmCard imageSrc={'img/aviator.jpg'} title={'Aviator'}/>
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />

      </div>
    </>
  );
}
