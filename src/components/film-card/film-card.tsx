import {Link} from 'react-router-dom';
import {Film} from '../../types/film';
import {memo, MouseEventHandler, useEffect, useState} from 'react';
import {PreviewPlayer} from '../preview-player/preview-player';
import {AppRoute} from '../../const';

export type FilmCardProps = {
  film: Film;
  isActive: boolean;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

// eslint-disable-next-line react/display-name
export const FilmCard = memo(
  ({film, isActive, onMouseEnter, onMouseLeave}: FilmCardProps): JSX.Element => {
    const [width, height] = [280, 175];

    const [isActivePlayer, setIsActivePlayer] = useState(false);

    useEffect(() => {
      if (isActive) {
        const timer = setTimeout(() => {
          setIsActivePlayer(true);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setIsActivePlayer(false);
      }
    }, [isActive]);

    return (
      <Link to={AppRoute.Film.replace(':id', film.id)} className="small-film-card catalog__films-card small-film-card__link">
        <article onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div className="small-film-card__image">
            {
              isActivePlayer
                ? <PreviewPlayer videoLink={film.previewVideoLink} posterImage={film.previewImage} width={width} height={height} muted autoPlay/>
                : <img src={film.previewImage} alt={film.name} width={width} height={height}/>
            }
          </div>
          <h3 className="small-film-card__title">{film.name}</h3>
        </article>
      </Link>
    );
  }
);
