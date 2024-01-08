import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {memo} from 'react';

// eslint-disable-next-line react/display-name
export const Logo = memo(
  (): JSX.Element => (
    <div className="logo">
      <Link to={AppRoute.Main} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  )
);

// export function Logo(): JSX.Element {
//   return (
//     <div className="logo">
//       <Link to={AppRoute.Main} className="logo__link">
//         <span className="logo__letter logo__letter--1">W</span>
//         <span className="logo__letter logo__letter--2">T</span>
//         <span className="logo__letter logo__letter--3">W</span>
//       </Link>
//     </div>
//   );
// }
