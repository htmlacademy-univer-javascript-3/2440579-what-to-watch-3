import {DetailFilm} from '../../types/film';
import {useState} from 'react';
import {OverviewTab} from './overview-tab';
import {DetailsTab} from './details-tab';
import {ReviewTab} from './review-tab';

export type TabsProps = {
  film: DetailFilm;
}

export function Tabs({film}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const tabs = {
    Overview: <OverviewTab film={film}/>,
    Details: <DetailsTab film={film}/>,
    Review: <ReviewTab/>,
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            Object.keys(tabs).map((k) => (
              <li key={k} className={`film-nav__item ${k === activeTab ? 'film-nav__item--active' : ''}`}>
                <a className="film-nav__link" onClick={() => setActiveTab(k)}>{k}</a>
              </li>
            ))
          }
        </ul>
      </nav>

      {tabs[activeTab as keyof typeof tabs]}

    </div>
  );
}
