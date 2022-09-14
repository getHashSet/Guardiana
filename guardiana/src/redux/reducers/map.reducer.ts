import { ACTIONS, Map } from "../../utils/types";
import defaultMap from '../../assets/maps/cityMaps/Guardiana/GuardianaCastle.png';

const defaultState: Map = {
    image: defaultMap,
    width: 640,
    height: 420,
    startingLocationX: -2000,
    startingLocationY: -2000,
    pixelsWidth: 3000,
    pixelsHeight: 4000
}

const map_reducer = (state: Map = defaultState, action: any) => {
    switch (action.type) {
        case ACTIONS.SET_MAP:
            return action.payload;
        default:
            return state;
    };
};

export default map_reducer;