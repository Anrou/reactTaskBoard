import 'core-js/es6/promise';
import 'core-js/es6/map';
import 'core-js/es6/set';
import './scss/index.scss'

if (typeof window.requestAnimationFrame !== 'function') {
    window.requestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(callback, 0);
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => (
        <div>
            <h1>Hello, Redux!</h1>
        </div>
);

ReactDOM.render(<App />, document.getElementById('root'));