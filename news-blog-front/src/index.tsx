import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './components/App/App';



ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

