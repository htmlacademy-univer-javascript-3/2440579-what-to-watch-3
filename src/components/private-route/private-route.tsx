import {AppRoute, AuthStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn}/>
  );
}
