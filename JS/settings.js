let root = document.documentElement;
let primaryColorInput = document.querySelector('#primary_color_btn');
let secondaryColorInput = document.querySelector('#secondary_color_btn');
let whiteColorInput = document.querySelector('#primary_pieces_color_btn');
let blackColorInput = document.querySelector('#secondary_pieces_color_btn');
let bgColorInput = document.querySelector('#bg_color_btn');

const setPrimaryColor = (e) => {
    root.style.setProperty('--chessboard-primary-color', e.target.value);
}

const setSecondaryColor = (e) => {
    root.style.setProperty('--chessboard-secondary-color', e.target.value);
}

const setWhiteColor = (e) => {
    root.style.setProperty('--piece-white-icon-color', e.target.value);
}

const setBlackColor = (e) => {
    root.style.setProperty('--piece-black-icon-color', e.target.value);
}

const setBgColor = (e) => {
    root.style.setProperty('--app-bg-color', e.target.value);
}


primaryColorInput.addEventListener('input', setPrimaryColor);
secondaryColorInput.addEventListener('input', setSecondaryColor);
whiteColorInput.addEventListener('input', setWhiteColor);
blackColorInput.addEventListener('input', setBlackColor);
bgColorInput.addEventListener('input', setBgColor);

