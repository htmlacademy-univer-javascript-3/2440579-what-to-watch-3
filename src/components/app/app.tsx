import {MainScreen} from '../../pages/main-screen/main-screen';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen';
import {SignInScreen} from '../../pages/sign-in-screen/sign-in-screen';
import {PrivateRoute} from '../private-route/private-route';
import {MovieScreen} from '../../pages/movie-screen/movie-screen';
import {PlayerScreen} from '../../pages/player-screen/player-screen';
import {MyListScreen} from '../../pages/my-list-screen/my-list-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import {AddReviewScreen} from '../../pages/add-review-screen/add-review-screen';
import {ToastContainer} from 'react-toastify';

export function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <ToastContainer/>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen/>}/>
        <Route path={AppRoute.SignIn} element={<SignInScreen/>}/>
        <Route path={AppRoute.MyList} element={
          <PrivateRoute>
            <MyListScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.AddReview} element={
          <PrivateRoute>
            <AddReviewScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Film} element={<MovieScreen />}/>
        <Route path={AppRoute.Player} element={<PlayerScreen />}/>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </HistoryRouter>
  );
}
