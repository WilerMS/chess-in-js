const renderChess = (matrix) => {
    for (let i = 0; i < 8; i++) {   
        for (let j = 0; j < 8; j++) {
            if (matrix[i][j]) {
                let {id, color, icon} = matrix[i][j];
                let position = i + "" + j;
                let iconElement = document.createElement('i');
                    iconElement.classList.add(icon, 'fas');
                let piece = document.createElement('div');
                    piece.id = id;
                    piece.classList.add(`piece`, color);
                    piece.appendChild(iconElement);
                let square = document.querySelector(`[data-position~="${position}"]`);
                    square.appendChild(piece);
            }
        }  
    }
}

const unselectPieces = () => {
    let pieces  = document.querySelectorAll('.piece');
        pieces.forEach((piece) => {
            piece.classList.remove('active');
        });
}

const selectPiece = (piece) => {
    if (piece.classList.contains('active')) {
        piece.classList.remove('active');
        unselectSquares();
        return;
    }
    unselectPieces();
    piece.classList.add('active');
}

const unselectSquares = () => {
    let squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.classList.remove('active');
        });
}

const selectSquare = (position) => {
    let square = document.querySelector(`[data-position~="${position}"]`);
    square.classList.add('active');
}

const renderMovements = (movements) => {
    movements.forEach((position) => {
        selectSquare(position);
    });
}

const setPiece = (index, matrix) => {
    let [x, y] = getPosition(index);
    return matrix[x][y];
}

const setTurn = (turn) => (turn === "white") ? "black" : "white";

const checkTurn = (index, matrix, currentTurn) => {
    let [x, y] = getPosition(index);
    return (matrix[x][y].color === currentTurn);
}

const getPosition = (index) => {
    let [x, y] = index.split("");
    let posX = parseInt(x), posY = parseInt(y);
    return [posX, posY];
}

const checkIfFinishGame = piece => piece.type === "king";

export {renderChess, unselectPieces, renderMovements, unselectSquares,
        setPiece, selectPiece, checkTurn , setTurn, getPosition, checkIfFinishGame};