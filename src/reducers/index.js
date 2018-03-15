import { combineReducers } from 'redux'
import nodes from './nodes'
import appConfig from './appConfig'
 
function reducer(state = {}, action){
    switch(action.type){
      case 'message':
        return Object.assign({}, {message:action.data});

        case 'updateState':
        return Object.assign({}, {message:action.data});


      default:
        return state;
    }
  }


const nodeTreeApp = combineReducers({
  nodes,
  appConfig,
  reducer
})
 
export default nodeTreeApp