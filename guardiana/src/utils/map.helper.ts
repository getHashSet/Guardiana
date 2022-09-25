// run the following line form this directory
// tsc map.helper.ts 
// then run the following line from this directory
// node map.helper.js

const startLocation: number[] = [4, 2] // x y

const endLocation: number[] = [4, 2] //x y

const updatedValue: number = 1

// Example Map
let map: number[][] = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

// the function!
let updatePoint = () => {

    const result: number[][] = map;

    const x: number = startLocation[1];
    const y: number = startLocation[0];

    const xE: number = endLocation[1];
    const yE: number = endLocation[0];


    // the great filter
    console.log(`y: ${y} > ${map[0].length}. yE: ${yE}`)
    if (y < 0 || y > map[0].length || yE > map[0].length) {
        console.log('Error: unable to understand range of y.');
        return;
    }

    if (x < 0 || x > map.length || xE > map.length) {
        console.log('Error: unable to understand range of x.');
        return;
    }

    // fill in all values between x and x and y and y
    if (xE !== -1 && xE !== x) {

        // order the start and end from largest to smallest
        let start = xE < x ? xE : x;
        let end = xE > x ? xE : x;

        for (let i = end; i >= start; i--) {

            map[i][y] = updatedValue
            console.log(`x = ${i}`)

            // in case my math is bad.
            if (i === -1) { return };
        }
    } else if (yE !== -1 && yE !== y) {

        // order the start and end from largest to smallest
        let start = yE < y ? yE : y;
        let end = yE > y ? yE : y;

        for (let i = end; i >= start; i--) {

            map[x][i] = updatedValue

            // in case my math is bad.
            if (i === -1) { return };
        }
    } else {
        map[x][y] = updatedValue;
    }

    console.table(result)
    console.log(result);

}

updatePoint();

// Lets make typescript happy
export { }
