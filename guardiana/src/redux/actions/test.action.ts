import { ACTIONS } from "../../utils/types";

export const test = (bool: boolean) => {
    return {
        type: ACTIONS.TEST,
        payload: bool
    };
};