import {useAppDispatch} from '../../hooks';
import {upFilmSize} from '../../store/action';

export function ShowMore(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(upFilmSize())}>Show more</button>
    </div>
  );
}
