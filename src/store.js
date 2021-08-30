import {createStore} from 'redux';
import f14_12192020 from './datasets/BW_12192020';

export default createStore(function(state, action){
    console.log(f14_12192020())
    if(state === undefined){
        return {
            number:0,
            data:f14_12192020()
        }
    }
    if(action.type === 'INCREMENT'){
        return {...state, number:state.number + action.size, data:f14_12192020()}
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())