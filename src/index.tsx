import React from 'react';

import './index.css';
import App from './App';
import ButtonAppBar from "./ButtonAppBar";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={store}>
            <AppWithRedux/>
    </Provider>, document.getElementById('root')as HTMLElement
)
//
// ReactDOM.render(
//
// <Provider store={store} >
//         <AppWithRedux />
// </Provider>,document.getElementById('root')
// );
