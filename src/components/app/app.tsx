import {MainScreen} from '../../pages/main-screen/main-screen';
import {DeatailFilm} from '../../types/Film';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen';
import {SignInScreen} from '../../pages/sign-in-screen/sign-in-screen';
import {PrivateRoute} from '../private-route/private-route';
import {MovieScreen} from '../../pages/movie-screen/movie-screen';
import {PlayerScreen} from '../../pages/player-screen/player-screen';
import {MyListScreen} from '../../pages/my-list-screen/my-list-screen';
import {AddReviewScreen} from '../../pages/add-review-screen/add-review-screen';

export type AppProps = {
  films: DeatailFilm[];
}

export function App({films}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen/>}/>
        <Route path={AppRoute.SignIn} element={<SignInScreen/>}/>
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authStatus={AuthStatus.Auth}>
            <MyListScreen films={films}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Film} element={<MovieScreen films={films}/>}/>
        <Route path={AppRoute.AddReview} element={<AddReviewScreen films={films}/>}/>
        <Route path={AppRoute.Player} element={<PlayerScreen films={films}/>}/>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}
