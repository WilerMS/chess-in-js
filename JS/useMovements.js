const calculatePawnMovements    =   (posX, posY, matrix) => {
    let movements = [], diagMoves = [1, -1];
    let steps = (matrix[posX][posY].color === "white") ? [1,2] : [-1,-2];

    if (posX+steps[0]>=0 && posX+steps[0]<8) {
        if (!matrix[posX+steps[0]][posY]) {
            movements.push((posX+steps[0]).toString() + posY);
    
            if ((posX === 1 || posX === 6) && posX+steps[1]>=0 && posX+steps[1]<8) {
                (!matrix[posX+steps[1]][posY]) && (movements.push((posX+steps[1])+""+posY));
            }
        }
    }
    
    for (let i = 0; i < 2; i++) {
        if (posY+diagMoves[i] >= 0 && posY+diagMoves[i] <= 7 && posX+steps[0]>=0 && posX+steps[0]<8) {
            if (matrix[posX+steps[0]][posY+diagMoves[i]]) {
                if (matrix[posX+steps[0]][posY+diagMoves[i]].user != matrix[posX][posY].user) {
                    movements.push((posX+steps[0]).toString() + (posY+diagMoves[i]).toString());
                }
            }
        }   
    }
    return movements;
}

const calculateRookMovements    =   (posX, posY, matrix) => {
    let movements = [], steps = [1, -1], 
        validMoves = [[false, false], [false, false]];

    for (let j = 0; j < 2; j++) {
        for (let i = 1; i < 8; i++) {
            let x = posX+(steps[j]*i), y = posY+(steps[j]*i);
            if (x<8 && x>=0) {
                if (!validMoves[0][j]) {
                    if (matrix[x][posY]) {
                        if (matrix[x][posY].user != matrix[posX][posY].user) {
                            movements.push((x).toString() + posY.toString());}
                        validMoves[0][j] = true;
                    } else { movements.push((x).toString() + posY.toString()); }
                }
            }

            if (y<8 && y>=0) {
                if (!validMoves[1][j]) {
                    if (matrix[posX][y]) {
                        if (matrix[posX][y].user != matrix[posX][posY].user) {
                            movements.push((posX).toString() + y.toString());}
                        validMoves[1][j] = true;
                    } else { movements.push((posX).toString() + y.toString()); }
                }
            }
        }
    }
    return movements;
}

const calculateBiShopMovements  =   (posX, posY, matrix) => {
    let movements  = [], steps = [1, -1], 
        validMoves = [[false, false], [false, false]];

    for (let i = 1; i < 8; i++) {
        for (let j = 0; j < 2; j++) {
            for (let z = 0; z < 2; z++) {
                if (!validMoves[j][z]) {
                    let x = posX+steps[j]*i, y = posY+steps[z]*i;
                    if (x<8 && x>=0 && y>=0 && y<8) {
                        if (matrix[x][y]) {
                            if (matrix[x][y].user != matrix[posX][posY].user) {
                                movements.push(x + "" + y);
                            }
                            validMoves[j][z] = true;
                        } else { movements.push(x + "" + y); }
                    }
                }
            }
        }
    }
    return movements;
}

const calculateKingMovements    =   (posX, posY, matrix) => {
    let movements = [ ...calculateBiShopMovements(posX, posY, matrix),
                      ...calculateRookMovements(posX, posY, matrix) ];
    let possibleMoves = [
        (posX+1)+""+(posY+1), (posX+1)+""+(posY-1), (posX-1)+""+(posY+1), 
        (posX-1)+""+(posY-1), (posX+1)+""+( posY ), ( posX )+""+(posY+1),
        (posX-1)+""+( posY ), ( posX )+""+(posY-1)
    ];
    movements = movements.filter(move => possibleMoves.includes(move));
    return movements;
}

const calculateKnightMovements  =   (posX, posY, matrix) => {
    let movements = [], steps = [1, 2, -1, -2];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (posX+steps[i]>=0 && posX+steps[i]<8 && posY+steps[j]>=0 && posY+steps[j]<8) {
                if (![0, 2, -2, 4, -4].includes(steps[i] + steps[j])) {
                    if (matrix[posX+steps[i]][posY+steps[j]]) {
                        if (matrix[posX+steps[i]][posY+steps[j]].user != matrix[posX][posY].user) {
                            movements.push((posX+steps[i]) + "" + (posY+steps[j]));
                        }
                    } else { movements.push((posX+steps[i]) + "" + (posY+steps[j])); }
                }
            }
        }
    }
    return movements;
}

const calculateQueenMovements   =   (posX, posY, matrix) => {
    return [...calculateRookMovements(posX, posY, matrix),
            ...calculateBiShopMovements(posX, posY, matrix)];
}

const calculateMovements = (index, matrix) => {
    // Getting indexes from clicked square
    let [x, y] = index.split("");
    let posX = parseInt(x), posY = parseInt(y);
    let {type} = matrix[posX][posY]; //Piecen in that index

    let PiecesMovements = {
        pawn:   calculatePawnMovements(posX, posY, matrix),
        rook:   calculateRookMovements(posX, posY, matrix),
        bishop: calculateBiShopMovements(posX, posY, matrix),
        king:   calculateKingMovements(posX, posY, matrix),
        knight: calculateKnightMovements(posX, posY, matrix),
        queen:  calculateQueenMovements(posX, posY, matrix)
    };
    
    return PiecesMovements[type];
}

export {calculateMovements};