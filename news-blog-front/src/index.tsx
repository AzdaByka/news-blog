import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { App } from './components/App/App';
import newsReducer from './reducers/articleReducer';

const store = createStore(newsReducer);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

