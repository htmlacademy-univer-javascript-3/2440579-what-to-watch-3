import {Logo} from '../../components/logo/logo';
import {AddReviewForm} from '../../components/add-review-form/add-review-form';
import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../const';
import {NotFoundScreen} from '../not-found-screen/not-found-screen';
import {UserBlock} from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchFilm} from '../../store/api-actions';

export function AddReviewScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.currentFilm);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id]);

  if (!film) {
    return <NotFoundScreen/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock/>

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218"
            height="327"
          />
        </div>
      </div>

      <AddReviewForm/>

    </section>
  );
}
