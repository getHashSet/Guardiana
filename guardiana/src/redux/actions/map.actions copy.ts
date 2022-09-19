import { ACTIONS } from "../../utils/types";

export const setTarget = (newTarget: any) => {
    return {
        type: ACTIONS.SET_TARGET,
        payload: newTarget
    };
};
