import { ACTIONS } from "../../utils/types";

export const setMap = (map: any) => {
    return {
        type: ACTIONS.SET_MAP,
        payload: map
    };
};