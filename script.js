function create2DArray(rows, cols) {
    arr = new Array(rows)
    for (i = 0; i < cols; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

let resolution = 40;
let rows;
let cols;

let grid;

function setup() {
    createCanvas(400, 400, P2D);

    frameRate(1);

    rows = width / resolution;
    cols = height / resolution;

    grid = create2DArray(rows, cols);

    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            grid[i][j] = floor(random(2));
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 0) {
                fill(255);
            } else if (grid[i][j] == 1) {
                fill(0);
            }

            rect(x, y, resolution - 5, resolution - 5);
        }
    }

}

function draw() {
    background(127);


    let newGrid = create2DArray(rows, cols);


    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {

            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 0) {
                fill(255);
            } else if (grid[i][j] == 1) {
                fill(0);
            }

            rect(x, y, resolution - 5, resolution - 5);
        }
    }
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {

            let state = grid[i][j];

            let nB = getNeighbor(i, j, grid);

            console.log(nB);

            if (state == 0 && nB == 3) {
                newGrid[i][j] = 1;
            } else if (state == 1 && (nB > 3 || nB < 2)) {
                newGrid[i][j] = 0;
            } else {
                newGrid[i][j] = 0;
            }
        }
    }
    //grid = newGrid;
}


function getNeighbor(x, y, gridd) {
    let nbCount = 0;

    for (i = -1; i <= 1; i++) {
        for (j = -1; j <= 1; j++) {
            let row = (x + i + rows) % rows;
            let col = (y + j + cols) % cols;
            nbCount += gridd[row][col];
        }
    }
    nbCount -= gridd[x][y];
    return nbCount;
}
