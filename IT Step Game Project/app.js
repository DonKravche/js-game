let boxes = document.querySelectorAll('.buttons');
let level = document.querySelector('.level');
let viewLevel = document.querySelector('.viewLevel');
let score = document.querySelector('.score');
let startGame_button = document.querySelector('.startGame button');
let showRandomColorDiv = document.querySelector('.showRandomColor');

let arry = [];
let currentScore = 0;
let correctAnswerClicked = false; // Flag to check if the correct answer was clicked

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let color = `rgb(${r}, ${g}, ${b})`;
    return color;
}

function generateRandomColorsArray(numColors) {
    let colorsArray = [];
    for (let i = 0; i < numColors; i++) {
        let color = getRandomColor();
        colorsArray.push(color);
    }
    return colorsArray;
}

arry = generateRandomColorsArray(9);
console.log(arry);

function getRandomColorFromArray(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function displayRandomColor(randomColor) {
    showRandomColorDiv.textContent = randomColor;
}

function typeOfLevels() {
    level.addEventListener('change', function () {
        if (level.value === "0") {
            viewLevel.innerHTML = 'Level: None';
        } else if (level.value === "1") {
            viewLevel.innerHTML = 'Level: Easy';
        } else if (level.value === "2") {
            viewLevel.innerHTML = 'Level: Medium';
        } else if (level.value === "3") {
            viewLevel.innerHTML = 'Level: Hard';
        } else {
            viewLevel.innerHTML = 'Level: None';
        }
    });
}

typeOfLevels();

function start() {
    startGame_button.addEventListener('click', function () {
        let numColors = 0;
        correctAnswerClicked = false; // Reset the flag at the start of the game

        if (level.value == '1') {
            numColors = 3;
        } else if (level.value == '2') {
            numColors = 6;
        } else if (level.value == '3') {
            numColors = 9;
        } else {
            alert('Please Choose Level Difficulty ❤️');
            return;
        }

        // Generate colors and choose a random color to display
        arry = generateRandomColorsArray(numColors);
        let randomColor = getRandomColorFromArray(arry);
        displayRandomColor(randomColor);

        for (let i = 0; i < boxes.length; i++) {
            if (i < numColors) {
                boxes[i].style.backgroundColor = arry[i];
                boxes[i].style.display = 'block';
            } else {
                boxes[i].style.display = 'none';
            }
        }

        // Add event listeners to the boxes
        boxes.forEach(box => {
            box.addEventListener('click', function handleClick() {
                if (box.style.backgroundColor === randomColor && !correctAnswerClicked) {
                    currentScore++; // Increment the score
                    score.textContent = currentScore.toString(); // Update the score display
                    correctAnswerClicked = true; // Set the flag to true
                    showRandomColorDiv.style.backgroundColor = randomColor; // Set the background color
                } else {
                    box.style.display = 'none';
                }
                // Remove event listener to avoid multiple increments
                box.removeEventListener('click', handleClick);
            });
        });
    });
}


start();


function dayNight() {
    let day_night_button = document.querySelector('.day_night_button');
    let isNightMode = false;

    day_night_button.addEventListener('click', function () {
        if (isNightMode) {
            document.body.style.backgroundColor = 'white';
            score.style.color = 'black';
            viewLevel.style.color = 'black'
        } else {
            document.body.style.backgroundColor = 'black';
            score.style.color = 'white';
            viewLevel.style.color = 'white'
            showRandomColorDiv.style.color = 'white'
        }
        isNightMode = !isNightMode; // Toggle the mode
    });
}

dayNight();


function toggleMute() {
    const audioPlayer = document.getElementById('audio_player');
    const audioToggleButton = document.getElementById('audio_toggle_button');
    let isPlaying = false;

    audioToggleButton.addEventListener('click', function () {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        isPlaying = !isPlaying; // Toggle the playback state
    });

    // Update the playback state when audio is paused or played
    audioPlayer.addEventListener('pause', function () {
        isPlaying = false;
    });

    audioPlayer.addEventListener('play', function () {
        isPlaying = true;
    });

}

toggleMute();