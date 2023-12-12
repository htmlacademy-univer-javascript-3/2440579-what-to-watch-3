import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app';
import {films} from './mocks/film';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App films={films}/>
    </Provider>
  </React.StrictMode>
);
