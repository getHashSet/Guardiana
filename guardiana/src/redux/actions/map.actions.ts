import { ACTIONS, Map } from "../../utils/types";

export const setMap = (map: Map) => {
    return {
        type: ACTIONS.SET_MAP,
        payload: map
    };
};