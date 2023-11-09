import {Film} from '../../types/Film';
import {useState} from 'react';
import {Overview} from './overview';
import {Details} from './details';
import {Review} from './review';

export type TabsProps = {
  film: Film;
}

export function Tabs({film}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const tabs = {
    Overview: <Overview film={film}/>,
    Details: <Details film={film}/>,
    Review: <Review/>,
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
