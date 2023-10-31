import {MainScreen} from '../../pages/main-screen/main-screen';
import {Film} from '../../types/Film';


const promoFilm : Film = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  date: new Date(2014, 0),
  poster: 'img/the-grand-budapest-hotel-poster.jpg',
};

function App() {
  return (
    <MainScreen promoFilm={promoFilm}/>
  );
}

export default App;
