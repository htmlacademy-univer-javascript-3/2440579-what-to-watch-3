import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Footer} from '../../components/footer/footer';

export function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <div style={{
        textAlign: 'center',
        marginTop: '20vh',
        height: '60vh'
      }}
      >
        <h1>Page Not Found</h1>
        <Link to={AppRoute.Main}>Main Page</Link>
      </div>

      <Footer/>

    </div>
  );
}
