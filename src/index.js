import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import nodeTreeApp from './reducers'
import MyApp from './components/App'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { serverMessage } from './actions'

import {devToolsEnhancer} from 'redux-devtools-extension';

// const store = createStore(reducer, /* preloadedState, */ devToolsEnhancer( //
// Specify custom devTools options ));

let defaultState = {
    "appConfig": {
        "modalShow": false,
        "activeModel": "",
        "modalState": {
            "isNew":true,
            "title": "",
            "id": "",

            "childrenCount": null,
            "rangeHigh": 1,
            "rangeLow": 1,

            "children": []
        }
    },
    "nodes": [
    ]
}

var socketEndpoint = 'http://realtime-api.challengemediagroup.com';
//   if(process.env.NODE_ENV === 'prod'){
//       var socketEndpoint = 'http://realtime-api.challengemediagroup.com';
//   }
//   else{
//     var socketEndpoint = 'http://localhost:5000';
//   }
  let socket = io(socketEndpoint);
  let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const store = applyMiddleware(socketIoMiddleware)(createStore)(nodeTreeApp, defaultState, devToolsEnhancer(
// Specify custom devTools options
));

  //let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

const App = () => (
    <MuiThemeProvider>
        <MyApp/>
    </MuiThemeProvider>
);

render(
    <Provider store={store}>
    <App store={store}/>
</Provider>, document.getElementById('root'))

module
    .hot
    .accept();





store.subscribe(()=>{
  console.log('new client state', store.getState());
  
});
store.dispatch({type:'server/getInitialState', data:'please'});