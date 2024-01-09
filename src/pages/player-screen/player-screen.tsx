import {Link, useParams} from 'react-router-dom';
import {NotFoundScreen} from '../not-found-screen/not-found-screen';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, useMemo, useRef, useState} from 'react';
import {fetchFilm} from '../../store/api-actions';
import {getCurrentFilm, getPromoFilm} from '../../store/film-data/selectors';

function getFormatTime(ms: number) : string {
  const hours = Math.floor(ms / 3600);
  const minutes = Math.floor((ms % 3600) / 60);
  const seconds = Math.floor(ms % 60);
  return `-${[
    hours > 0 ? String(hours).padStart(2, '0') : null,
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].filter(Boolean).join(':')}`;
}


export function PlayerScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(getCurrentFilm);
  const promoFilm = useAppSelector(getPromoFilm);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const film = useMemo(() => {
    if (currentFilm && currentFilm.id === id) {
      return currentFilm;
    } else if (promoFilm && promoFilm.id === id) {
      return promoFilm;
    }
    return null;
  }, [id, currentFilm, promoFilm]);

  useEffect(() => {
    if (id && !film) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id, film]);

  useEffect(() => {
    if (videoRef.current) {
      const currentRef = videoRef.current;
      const updateTimeLeft = () => {
        const time = currentRef.duration - currentRef.currentTime;
        setTimeLeft(getFormatTime(time));
      };

      currentRef.addEventListener('timeupdate', updateTimeLeft);
      return () => {
        currentRef?.removeEventListener('timeupdate', updateTimeLeft);
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const currentRef = videoRef.current;
      const updateProgressBar = () => {
        const progress = (currentRef.currentTime / currentRef.duration) * 100;

        const progressBar = document.querySelector('.player__progress') as HTMLProgressElement;
        if (progressBar) {
          progressBar.value = progress;
        }

        const playerToggler = document.querySelector('.player__toggler') as HTMLElement;
        if (playerToggler) {
          playerToggler.style.left = `${progress}%`;
        }
      };

      currentRef.addEventListener('timeupdate', updateProgressBar);
      return () => {
        currentRef?.removeEventListener('timeupdate', updateProgressBar);
      };
    }
  }, []);


  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      video.addEventListener('play', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));

      return () => {
        video.removeEventListener('play', () => setIsPlaying(true));
        video.removeEventListener('pause', () => setIsPlaying(false));
      };
    }
  }, []);


  const playerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const onLoadedData = () => {
    setIsLoading(false);
    if (!videoRef.current) {
      return;
    }
    setTimeLeft(getFormatTime(videoRef.current.duration));
  };

  if (!film) {
    return <NotFoundScreen/>;
  }

  return (
    <div className="player" ref={playerRef}>
      <video
        ref={videoRef}
        src={film?.videoLink}
        className="player__video"
        poster={film?.posterImage}
        onLoadedData={onLoadedData}
        autoPlay
      />
      {isLoading && <div className="loading-spinner">Loading...</div>}
      <Link to={`/films/${film.id}`} className="player__exit">Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{ left: '30%' }}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={togglePlay}>
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <div className="player__name">{film?.name}</div>
          <button type="button" className="player__full-screen" onClick={toggleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
