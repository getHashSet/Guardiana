import { combineReducers } from 'redux';
import test_reducer from './test.reducer';
import map_reducer from './map.reducer';

const allReducers = combineReducers({
    test: test_reducer,
    map: map_reducer
});

export default allReducers;