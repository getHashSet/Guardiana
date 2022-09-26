import { ACTIONS, Character } from "../../utils/types";
import Max from '../../assets/characters/Max';
import Adam from '../../assets/characters/Adam';
import Toa from "../../assets/characters/Tao";

const heroRoster_reducer = (state: Character[] = [Max, Adam, Toa], action: any) => {
    switch (action.type) {
        case ACTIONS.SET_HERO_ROSTER:
            return action.payload;
        default:
            return state;
    };
};

export default heroRoster_reducer;
