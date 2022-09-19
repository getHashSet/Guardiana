import { Targetable } from "../../infrastructure/class/Targetable";
import { ACTIONS } from "../../utils/types";

const target_reducer = (state: Targetable | null, action: any) => {
    switch (action.type) {
        case ACTIONS.SET_TARGET:
            return action.payload;
        default:
            return state;
    };
};

export default target_reducer;
