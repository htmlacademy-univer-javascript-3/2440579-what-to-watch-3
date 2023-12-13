import {Link} from 'react-router-dom';
import {DeatailFilm} from '../../types/Film';
import {MouseEventHandler, useEffect, useState} from 'react';
import {PreviewPlayer} from '../preview-player/preview-player';
import {AppRoute} from '../../const';

export type FilmCardProps = {
  film: DeatailFilm;
  isActive: boolean;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

export function FilmCard({film, isActive, onMouseEnter, onMouseLeave}: FilmCardProps): JSX.Element {
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
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="small-film-card__image">
        {
          isActivePlayer
            ? <PreviewPlayer videoLink={film.videoLink} posterImage={film.posterImage} width={width} height={height} muted autoPlay/>
            : <img src={film.previewImage} alt={film.name} width={width} height={height}/>
        }
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film.replace(':id', film.id)} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}
