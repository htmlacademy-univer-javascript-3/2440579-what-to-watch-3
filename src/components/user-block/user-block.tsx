import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthStatus} from '../../const';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';

export function UserBlock(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);

  const dispatch = useAppDispatch();

  return authStatus === AuthStatus.Auth
    ? (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <Link
            to={'/'}
            className="user-block__link"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            Sign out
          </Link>
        </li>
      </ul>
    )
    : (
      <div className="user-block">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </div>
    );
}
