import { ACTIONS, Map } from "../../utils/types";
import guardianaCity from "../../assets/maps/cityMaps/guardiana";

const map_reducer = (state: Map = guardianaCity, action: any) => {
    switch (action.type) {
        case ACTIONS.SET_MAP:
            return action.payload;
        default:
            return state;
    };
};

export default map_reducer;