import { ACTIONS, Map } from "../../utils/types";
import worldMap from '../../assets/maps/chapter01/worldMap';

const map_reducer = (state: Map = worldMap, action: any) => {
    switch (action.type) {
        case ACTIONS.SET_MAP:
            return action.payload;
        default:
            return state;
    };
};

export default map_reducer;