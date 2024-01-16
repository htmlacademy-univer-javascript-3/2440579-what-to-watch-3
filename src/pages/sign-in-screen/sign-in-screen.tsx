import {Footer} from '../../components/footer/footer';
import {Logo} from '../../components/logo/logo';
import {FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import {validateEmail, validatePassword} from '../../utils/validators';
import {getAuthStatus} from '../../store/user-process/selectors';
import {AppRoute, AuthStatus} from '../../const';
import {Navigate} from 'react-router-dom';

export function SignInScreen(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Main}/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      const emailIsValid = validateEmail(emailRef.current.value);
      const passwordIsValid = validatePassword(passwordRef.current.value);
      if (emailIsValid && passwordIsValid) {
        dispatch(loginAction({
          email: emailRef.current.value,
          password: passwordRef.current.value
        }));
      }
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" required ref={emailRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" required ref={passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />

    </div>
  );
}
