import { ACTIONS } from "../../utils/types";

const test_reducer = (state: boolean = true, action: any) => {
    switch (action.type) {
        case ACTIONS.TEST:
            return action.payload;
        default:
            return state;
    };
};

export default test_reducer;
