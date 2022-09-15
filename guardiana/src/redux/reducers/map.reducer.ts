import { ACTIONS, Map } from "../../utils/types";
//import defaultMapBottom from '../../assets/maps/cityMaps/Guardiana/GuardianaBasementBottom.png';
//import defaultMapTop from '../../assets/maps/cityMaps/Guardiana/GuardianaBasementTop.png'
import GuardianaCityBottom from '../../assets/maps/cityMaps/Guardiana/GuardianaBottom.png';
import GrandianaCityTop from '../../assets/maps/cityMaps/Guardiana/GuardianaTop.png';

const defaultState: Map = {
    // imageBottom: defaultMapBottom,
    // imageTop: defaultMapTop,
    // blocked: [
    //     // 'col row' 
    //     '11', '21','31','41','51', // top wall
    //     '00', '01', '02', '03', '04', '05', // left wall
    //     '22', // desk
    //     '50', '51', '52', '53', '54', '55', // right wall
    //     '15','25', '35', '45', '55' // bottom wall
    // ],
    // grid: [6, 6], // these will be multipled by 24 to get the total pixel count.
    // startingLocation: [4, 2] // [x , y]

    imageBottom: GuardianaCityBottom,
    imageTop: GrandianaCityTop,
    blocked: [
        '00','01', '02', '03','04', '05', '06', '07',
        // Church
        '59',
        '610','69','68','67','66','65','64','63', 
        '74', '84', '95', '104',
        '88', '89', '98',
        
        // Water
        '49','410','411','412',
    ],
    grid: [46, 46],
    startingLocation: [0, 0], // the square on the map 
    pixelOffset: {x:0, y: -4}
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