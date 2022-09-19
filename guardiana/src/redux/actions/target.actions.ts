import { ACTIONS, Character } from "../../utils/types";

export const test = (newTarget: Character) => {
    return {
        type: ACTIONS.SET_TARGET,
        payload: newTarget
    };
};
