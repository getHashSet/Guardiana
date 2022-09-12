import { combineReducers } from 'redux';
import test_reducer from './test.reducer';

const allReducers = combineReducers({
    test: test_reducer
});

export default allReducers;