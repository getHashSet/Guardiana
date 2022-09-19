import { ACTIONS, Character } from "../../utils/types";

export const setHeroRoster = (newRoster: Character[]) => {
    return {
        type: ACTIONS.SET_HERO_ROSTER,
        payload: newRoster
    };
};
