import { combineReducers } from 'redux';
import test_reducer from './test.reducer';
import map_reducer from './map.reducer';
//import target_reducer from './target.reducer';
import hero_roster_reducer from './heroRoster.reducer';

const allReducers = combineReducers({
    test: test_reducer,
    map: map_reducer,
    heroRoster: hero_roster_reducer
});

export default allReducers;