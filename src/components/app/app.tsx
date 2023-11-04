import {MainScreen} from '../../pages/main-screen/main-screen';
import {Film} from '../../types/Film';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen';
import {SignInScreen} from '../../pages/sign-in-screen/sign-in-screen';
import {PrivateRoute} from '../private-route/private-route';
import {MovieScreen} from '../../pages/movie-screen/movie-screen';
import {MovieReviewsScreen} from '../../pages/movie-reviews-screen/movie-reviews-screen';
import {PlayerScreen} from '../../pages/player-screen/player-screen';
import {MyListScreen} from '../../pages/my-list-screen/my-list-screen';


const promoFilm : Film = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: new Date(2014, 0),
  poster: 'img/the-grand-budapest-hotel-poster.jpg',
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen promoFilm={promoFilm}/>}/>
        <Route path={AppRoute.SignIn} element={<SignInScreen/>}/>
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authStatus={AuthStatus.Auth}>
            <MyListScreen/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Film} element={<MovieScreen/>}/>
        <Route path={AppRoute.AddReview} element={<MovieReviewsScreen/>}/>
        <Route path={AppRoute.Player} element={<PlayerScreen/>}/>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
