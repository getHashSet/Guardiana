import * as I from '../../../../utils/types';
import worldMap from '../worldMap';
import imageBottom from './battle01Bottom.png';
import imageTop from './battle01Top.png';

const getMap = (eventID: number) => {
    switch (eventID) {
        case 41:
            const mapData = worldMap;
            mapData.heroStartLocations = [{
                name: 'Max',
                x: 27,
                y: 23
            }];
            mapData.cameraStartLocation = {
                x: 23,
                y: 20
            }
            return mapData
        default:
            return battle01
    }
};

const battle01: I.Map = {
    name: "Ol' Cliffside Ruins",
    imageBottom,
    imageTop,
    mapDimentions: {
        x: 16,
        y: 22
    },
    grid: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0],
        [0, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 0],
        [0, 9, 0, 0, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 9, 0],
        [0, 9, 0, 0, 0, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 0],
        [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0],
        [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0],
        [0, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 0],
        [0, 6, 0, 0, 0, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 0],
        [0, 6, 0, 9, 9, 5, 5, 9, 9, 9, 9, 9, 9, 0, 9, 0],
        [0, 9, 0, 9, 5, 5, 5, 5, 9, 9, 9, 9, 9, 0, 9, 0],
        [0, 9, 5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 9, 0, 9, 0],
        [0, 5, 5, 5, 5, 5, 5, 9, 9, 9, 9, 9, 9, 0, 9, 0],
        [0, 5, 0, 0, 5, 5, 9, 9, 9, 9, 0, 0, 0, 0, 9, 0],
        [0, 9, 0, 0, 5, 5, 5, 9, 9, 9, 0, 0, 0, 0, 6, 0],
        [0, 6, 0, 0, 5, 5, 9, 9, 9, 9, 0, 0, 0, 0, 6, 0],
        [0, 9, 9, 9, 5, 9, 9, 9, 9, 9, 9, 6, 6, 6, 6, 0],
        [0, 9, 9, 9, 6, 6, 9, 9, 9, 9, 6, 6, 6, 6, 6, 0],
        [0, 9, 9, 9, 9, 6, 6, 9, 9, 6, 6, 6, 6, 6, 6, 0],
        [0, 9, 9, 9, 9, 9, 6, 9, 9, 6, 6, 6, 6, 6, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 41, 41, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    pixelOffset: {
        x: 0,
        y: 16
    },

    cameraStartLocation: {
        x: 3,
        y: 16
    },

    heroStartLocations: [
        { name: 'Hero 01', x: 7, y: 19 },
        { name: 'Hero 02', x: 8, y: 19 },
        { name: 'Hero 03', x: 7, y: 18 }
    ],

    npcStartLocations: [null],
    enemyStartLocations: [
        { name: 'Hero 01', x: 1, y: 1 }
    ],

    events: {
        getMap
    }
}

export default battle01;
