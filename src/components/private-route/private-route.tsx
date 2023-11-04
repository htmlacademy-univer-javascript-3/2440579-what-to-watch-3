import {AppRoute, AuthStatus} from '../../const';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  authStatus: string;
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authStatus, children} = props;

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn}/>
  );
}
