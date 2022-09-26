import { combineReducers } from 'redux';
import map_reducer from './map.reducer';
import hero_roster_reducer from './heroRoster.reducer';
import enemy_roster_reducer from './enemyRoster.reducer';

const allReducers = combineReducers({
    map: map_reducer,
    heroRoster: hero_roster_reducer,
    enemyRoster: enemy_roster_reducer,
});

export default allReducers;