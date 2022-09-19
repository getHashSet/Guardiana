import { ACTIONS, Character } from "../../utils/types";

const heroRoster_reducer = (state: Character[] = [], action: any) => {
    switch (action.type) {
        case ACTIONS.SET_HERO_ROSTER:
            return action.payload;
        default:
            return state;
    };
};

export default heroRoster_reducer;
