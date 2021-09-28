let root = document.documentElement;
let primaryColorInput = document.querySelector('#primary_color_btn');
let secondaryColorInput = document.querySelector('#secondary_color_btn');

const setPrimaryColor = (e) => {
    root.style.setProperty('--chessboard-primary-color', e.target.value);
}

const setSecondaryColor = (e) => {
    root.style.setProperty('--chessboard-secondary-color', e.target.value);
}


primaryColorInput.addEventListener('change', setPrimaryColor);
secondaryColorInput.addEventListener('change', setSecondaryColor);

