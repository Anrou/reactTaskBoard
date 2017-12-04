import 'core-js/es6/promise';
import 'core-js/es6/map';
import 'core-js/es6/set';
import './scss/index.scss'

if (typeof window.requestAnimationFrame !== 'function') {
    window.requestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(callback, 0);
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import App from './components/app'


const store = configureStore();

const Container = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Container />, document.getElementById('root'));