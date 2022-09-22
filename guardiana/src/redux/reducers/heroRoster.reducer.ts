import { ACTIONS, Character } from "../../utils/types";
import Max from '../../assets/characters/Max';
import Adam from '../../assets/characters/Adam';

const heroRoster_reducer = (state: Character[] = [Max, Adam], action: any) => {
    switch (action.type) {
        case ACTIONS.SET_HERO_ROSTER:
            return action.payload;
        default:
            return state;
    };
};

export default heroRoster_reducer;
