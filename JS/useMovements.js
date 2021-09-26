const calculatePawnMovements    =   (posX, posY, matrix) => {
    let movements = [];
    let steps = (matrix[posX][posY].color === "white") ? [1,2] : [-1,-2];

    if (posX+steps[0]>=0 && posX+steps[0]<8) {
        if (!matrix[posX+steps[0]][posY]) {
            movements.push((posX+steps[0]).toString() + posY);
    
            if (posX === 1 || posX === 6) {
                if (posX+steps[1]>=0 && posX+steps[1]<8) {
                    if (!matrix[posX+steps[1]][posY]) {
                        movements.push((posX+steps[1]).toString() + posY);
                    } 
                }  
            }
        }
    }
    

    if (posY-1 >= 0 && posY-1 <= 7) {
        if (matrix[posX+steps[0]][posY-1]) {
            if (matrix[posX+steps[0]][posY-1].user != matrix[posX][posY].user) {
                movements.push((posX+steps[0]).toString() + (posY-1).toString());
            }
        }
    }

    if (posY+1 >= 0 && posY+1 <= 7) {
        if (matrix[posX+steps[0]][posY+1]) {
            if (matrix[posX+steps[0]][posY+1].user != matrix[posX][posY].user) {
                movements.push((posX+steps[0]).toString() + (posY+1).toString());
            }
        }
    }

    return movements;
}

const calculateRookMovements    =   (posX, posY, matrix) => {
    let movements = [];
    let stopXpositive = false, stopXnegative = false;
    let stopYpositive = false, stopYnegative = false;

    for (let i = 1; i < 8; i++) {

        if (!stopXpositive) {
            if (posX + i < 8) {
                if (matrix[posX + i][posY]) {
                    if (matrix[posX + i][posY].user != matrix[posX][posY].user) {
                        movements.push((posX + i).toString() + posY.toString());
                    }
                    stopXpositive = true;
                } else {
                    movements.push((posX + i).toString() + posY.toString());
                }
            }
        }

        if (!stopXnegative) {
            if (posX - i >= 0) {
                if (matrix[posX - i ][posY]) {
                    if (matrix[posX - i ][posY].user != matrix[posX][posY].user) {
                        movements.push((posX - i ).toString() + posY.toString());
                    }
                    stopXnegative = true;
                } else {
                    movements.push((posX - i ).toString() + posY.toString());
                }
            }
        }

        if (!stopYpositive) {
            if (posY + i < 8) {
                if (matrix[posX][posY + i]) {
                    if (matrix[posX][posY + i].user != matrix[posX][posY].user) {
                        movements.push((posX).toString() + (posY + i).toString());
                    }
                    stopYpositive = true;
                } else {
                    movements.push((posX).toString() + (posY + i).toString());
                }
            }
        }

        if (!stopYnegative) {
            if (posY - i >= 0) {
                if (matrix[posX][posY - i]) {
                    if (matrix[posX][posY - i].user != matrix[posX][posY].user) {
                        movements.push((posX).toString() + (posY - i).toString());
                    }
                    stopYnegative = true;
                } else {
                    movements.push((posX).toString() + (posY - i).toString());
                }
            }
        }
    }

    return movements;
}

const calculateBiShopMovements  =   (posX, posY, matrix) => {
    let stopXposYpos = false, stopXposYneg = false,
        stopXnegYpos = false, stopXnegYneg = false;
    let movements = [];

    for (let i = 1; i < 8; i++) {

        if (!stopXposYpos) {
            let x = posX+i, y = posY+i;
            if (x<8 && y<8) {
                if (matrix[x][y]) {
                    if (matrix[x][y].user != matrix[posX][posY].user) {
                        movements.push(x + "" + y);
                    }
                    stopXposYpos = true;
                } else {
                    movements.push(x + "" + y);
                }
            }
        }

        if (!stopXposYneg) {
            let x = posX+i, y = posY-i;
            if (x<8 && y>=0) {
                if (matrix[x][y]) {
                    if (matrix[x][y].user != matrix[posX][posY].user) {
                        movements.push(x + "" + y);
                    }
                    stopXposYneg = true;
                } else {
                    movements.push(x + "" + y);                    
                }
            }
        }
        
        if (!stopXnegYpos) {
            let x = posX-i, y = posY+i;
            if ((x)>=0 && (y)<8) {
                if (matrix[x][y]) {
                    if (matrix[x][y].user != matrix[posX][posY].user) {
                        movements.push(x + "" + y);
                    }
                    stopXnegYpos = true;
                } else {
                    movements.push(x + "" + y);                  
                }
            }
        }
        

        if (!stopXnegYneg) {
            let x = posX-i, y = posY-i;
            if (x>=0 && y>=0) {
                if (matrix[x][y]) {
                    if (matrix[x][y].user != matrix[posX][posY].user) {
                        movements.push(x + "" + y);
                    }
                    stopXnegYneg = true;
                } else {
                    movements.push(x + "" + y);                    
                }
            }
        }

        
        
    }

    return movements;
}

const calculateKingMovements    =   (posX, posY, matrix) => {

    let movements = [];

    /* Movimiento diagonal */
        if ((posX+1)<8 && (posY+1)<8) {
            if (matrix[posX+1][posY+1]) {
                if (matrix[posX+1][posY+1].user != matrix[posX][posY].user) {
                    movements.push((posX+1) + "" + (posY+1));
                }
            } else {
                movements.push((posX+1) + "" + (posY+1));                    
            }
        }

        if ((posX+1)<8 && (posY-1)>=0) {
            if (matrix[posX+1][posY-1]) {
                if (matrix[posX+1][posY-1].user != matrix[posX][posY].user) {
                    movements.push((posX+1) + "" + (posY-1));
                }
            } else {
                movements.push((posX+1) + "" + (posY-1));                    
            }
        }

        if ((posX-1)>=0 && (posY+1)<8) {
            if (matrix[posX-1][posY+1]) {
                if (matrix[posX-1][posY+1].user != matrix[posX][posY].user) {
                    movements.push((posX-1) + "" + (posY+1));
                }
            } else {
                movements.push((posX-1) + "" + (posY+1));                    
            }
        }
        
        if ((posX-1)>=0 && (posY-1)>=0) {
            if (matrix[posX-1][posY-1]) {
                if (matrix[posX-1][posY-1].user != matrix[posX][posY].user) {
                    movements.push((posX-1) + "" + (posY-1));
                }
            } else {
                movements.push((posX-1) + "" + (posY-1));                    
            }
        }

    /* Movimiento recto */
        if (posX+1 < 8) {
            if (matrix[posX+1][posY]) {
                if (matrix[posX+1][posY].user != matrix[posX][posY].user) {
                    movements.push((posX+1).toString() + posY.toString());
                }
            } else {
                movements.push((posX+1).toString() + posY.toString());
            }
        }

        if (posX-1 >= 0) {
            if (matrix[posX-1][posY]) {
                if (matrix[posX-1][posY].user != matrix[posX][posY].user) {
                    movements.push((posX-1).toString() + posY.toString());
                }
            } else {
                movements.push((posX - 1).toString() + posY.toString());
            }
        }

        if (posY + 1 < 8) {
            if (matrix[posX][posY+1]) {
                if (matrix[posX][posY+1].user != matrix[posX][posY].user) {
                    movements.push((posX).toString() + (posY+1).toString());
                }
            } else {
                movements.push((posX).toString() + (posY+1).toString());
            }
        }

        if (posY-1 >=0) {
            if (matrix[posX][posY-1]) {
                if (matrix[posX][posY-1].user != matrix[posX][posY].user) {
                    movements.push((posX).toString() + (posY-1).toString());
                }
            } else {
                movements.push((posX).toString() + (posY-1).toString());
            }
        }
    
    /* FINAL Movimiento recto */
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

const calculateMovements = (index, matrix) => {
    // Getting indexes from clicked square
    let [x, y] = index.split("");
    let posX = parseInt(x), posY = parseInt(y);
    let piece = matrix[posX][posY]; //Piecen in that index
    let movements = [];
    
    switch (piece.type) {
        case 'pawn':
            movements = calculatePawnMovements(posX, posY, matrix);
            break;

        case 'rook':
            movements = calculateRookMovements(posX, posY, matrix);
            break;
        
        case 'bishop':
            movements = calculateBiShopMovements(posX, posY, matrix);
            break;

        case 'queen':
            movements.push(...calculateRookMovements(posX, posY, matrix));
            movements.push(...calculateBiShopMovements(posX, posY, matrix));
            break;
    
        case 'king':
            movements = calculateKingMovements(posX, posY, matrix);
            break;

        case 'knight':
            movements = calculateKnightMovements(posX, posY, matrix);
            break;
    }
    
    return movements;
}

export {calculateMovements};