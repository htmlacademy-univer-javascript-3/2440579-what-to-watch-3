import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthStatus} from '../../const';
import {Link, useNavigate} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {getAuthStatus} from '../../store/user-process/selectors';
import {memo} from 'react';

// eslint-disable-next-line react/display-name
export const UserBlock = memo(
  (): JSX.Element => {
    const navigate = useNavigate();
    const authStatus = useAppSelector(getAuthStatus);

    const dispatch = useAppDispatch();

    return authStatus === AuthStatus.Auth
      ? (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"
                onClick={() => navigate(AppRoute.MyList)}
              />
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
);
