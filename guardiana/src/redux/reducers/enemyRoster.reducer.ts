import { ACTIONS, Character } from "../../utils/types";
import RuneKnight from "../../assets/enemies/RuneKnight";
import DarkDwarf from "../../assets/enemies/DarkDwarf";
import Goblin from "../../assets/enemies/Goblin";

const heroRoster_reducer = (state: Character[] = [RuneKnight, DarkDwarf, DarkDwarf, Goblin, Goblin, Goblin, Goblin, Goblin], action: any) => {
    switch (action.type) {
        case ACTIONS.SET_ENEMY_ROSTER:
            return action.payload;
        default:
            return state;
    };
};

export default heroRoster_reducer;
