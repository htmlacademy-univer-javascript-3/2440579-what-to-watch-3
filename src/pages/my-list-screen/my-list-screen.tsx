import {Footer} from '../../components/footer/footer';
import {Logo} from '../../components/logo/logo';
import {UserBlock} from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteFilms} from '../../store/film-data/selectors';
import {FilmList} from '../../components/film-list/film-list';
import {fetchFavoritesFilms} from '../../store/api-actions';
import {useEffect} from 'react';


export function MyListScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  useEffect(() => {
    dispatch(fetchFavoritesFilms());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>
        <UserBlock/>

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms}/>

      </section>

      <Footer/>

    </div>
  );
}
