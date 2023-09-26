import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ButtonAppBar from "./ButtonAppBar";
import {Provider} from "react-redux";
import {store} from "./store/store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
// import {combineReducers, createStore} from 'redux'
// import ReactDOM from 'react-dom'
// import {Provider, useSelector} from 'react-redux'
// import React, {useReducer} from 'react'
//
// let initialState = {items:
//         [
//             {id: 1, name: 'Dimych'},
//             {id: 2, name: 'Ignat'}
//         ]
// }
// const usersReducer = (state = initialState, action: any) => {
//     return state
// }
//
// let authInitialState = {login: 'Margo', settings: {theme: 'dark'}}
// const authReducer = (state = authInitialState, action: any) => {
//     return state
// }
//
// let rootReducer = combineReducers({
//     users: usersReducer,
//     auth: authReducer
// })
//
// const store = createStore(rootReducer)
// type RootStateType = ReturnType<typeof rootReducer>
//
// const selector = (state: RootStateType) => state.users.items
//
// const Users = () => {
//
//     const users = store.getState().users.items//useSelector<RootStateType,RootStateType>(state => state)
//     console.log(store.getState().users.items)
//     return <ul>
//         {users.map(u => <li key={u.id}>{u.name}</li>)}
//     </ul>
// }
//
// ReactDOM.render(<div>
//         <Provider store={store}>
//             <Users/>
//         </Provider>
//     </div>,
//     document.getElementById('root')
// )
//
// // Что нужно написать вместо XXX, чтобы отрендерить список юзеров?
// // ❗ Ответ дать минимально возможным объёмом кода
