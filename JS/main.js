import {matrix} from './consts.js';
import {calculateMovements} from './useMovements.js'
import {renderChess, selectPiece, renderMovements, 
        unselectSquares, setPiece, unselectPieces,
        checkTurn, setTurn, getPosition, checkIfFinishGame } from './Chess.js';

renderChess(matrix); //Rendering Chess in the window

let pieces  = document.querySelectorAll('.piece');
let squares = document.querySelectorAll('.square');
let currentPiece = null, currentTurn = "white", isFinished = false;

pieces.forEach( piece => {
    piece.addEventListener('click', function (e) {
        if (!isFinished) {
            let index = this.parentElement.dataset.position;
            if (checkTurn(index, matrix, currentTurn)) {
                let movements = calculateMovements(index, matrix);
                currentPiece = setPiece(index, matrix);
                this.classList.contains('active') && (currentPiece = null);
                e.stopPropagation();
                unselectSquares();
                renderMovements(movements);
                selectPiece(this);
            }
        }
    });
});

squares.forEach(square => {
    square.addEventListener('click', function() {
        if (square.classList.contains('active')) {
            let piece = document.querySelector(`#${currentPiece.id}`);
            let [previousX, prevviousY] = getPosition(piece.parentElement.dataset.position),
                [currentX,  currentY]   = getPosition(this.dataset.position);

            // Moving piece in HTML DOM
            this.innerHTML = '';
            this.appendChild(piece);
            
            // Checking if the game is finished
            let eliminatedPiece = matrix[currentX][currentY];
            if (eliminatedPiece) {
                if (checkIfFinishGame(eliminatedPiece)) {
                    setTimeout(() => {
                        isFinished = true;
                        alert("Se ha acabado");
                    }, 1000);
                }
            }
            
            //Moving piece in matrix array
            matrix[currentX][currentY] = matrix[previousX][prevviousY];
            matrix[previousX][prevviousY] = null;
            //Reseting all guides in the chessboard
            unselectSquares();
            unselectPieces();
            
            currentTurn = setTurn(currentTurn); //Setting turn
            currentPiece = null; // Finishing step with that piece
        }
    });
});
