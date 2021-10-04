// create the grid
const width = 20;
const height = 12;
let score = 0;
let cont = document.getElementById('h4');

const grid = document.querySelector('.grid');
const cells = [];
for (i = 0; i < 240; i++) {
  const cell = document.createElement('div', (id = i));
  grid.appendChild(cell);
  cells.push(cell);
}

//create the snake
const snake = [];
const addsnake = (index) => cells[index].classList.add('snake');
const removesnake = (index) => cells[index].classList.remove('snake');
const addFood = (index) => cells[index].classList.add('food');
const removeFood = (index) => cells[index].classList.remove('food');
let foodposition = Math.floor((Math.random() * Math.pow(10, 10)) % 240);
headPosition = 106;
let x = 6;
let y = 5;
let size = 4;
let timer = 0;
let timeUp = 500;
let timeDown = 500;
let timeLeft = 500;
let timeRight = 500;
addsnake(headPosition);
function gameOver() {
  if (window.confirm('Fin del juego. ¿Jugar otra vez?')) {
    window.location.reload();
  } else {
    window.open('http://www.josemanuelcastellano.com', '_self');
  }
}
addFood(foodposition);
let lastDirection = 0;
const handleKeyPress = (event) => {
  event.preventDefault();
  let direction = null;
  direction = 0;
  const { key } = event;
  direction = key;
  if (direction !== lastDirection) {
    switch (direction) {
      case 'ArrowUp':
        repeatUp = true;
        repeatDown = false;
        repeatLeft = false;
        repeatRight = false;
        break;
      case 'ArrowRight':
        repeatUp = false;
        repeatDown = false;
        repeatLeft = false;
        repeatRight = true;
        break;
      case 'ArrowLeft':
        repeatUp = false;
        repeatDown = false;
        repeatLeft = true;
        repeatRight = false;
        break;
      case 'ArrowDown':
        repeatUp = false;
        repeatDown = true;
        repeatLeft = false;
        repeatRight = false;
        break;
      default:
        break;
    }
    function clearScreen() {
      for (i = 0; i < 240; i++) {
        removesnake(i);
      }
    }
    window.setInterval(function () {
      clearScreen();
      switch (direction) {
        case 'ArrowUp':
          window.setTimeout(() => {
            if (y >= 0 && repeatUp) {
              y = y - 1;
              if (y === -1) {
                gameOver();
              }
              headPosition = headPosition - width;
              if (snake.includes(headPosition)) {
                gameOver();
              }
              snake.push(headPosition);
              if (headPosition === foodposition) {
                removeFood(foodposition);
                score = score + 10;
                cont.textContent = score;
                foodposition = Math.floor(
                  (Math.random() * Math.pow(10, 10)) % 240,
                );
                if (!snake.includes(foodposition)) {
                  addFood(foodposition);
                } else {
                  foodposition = Math.floor(
                    (Math.random() * Math.pow(10, 10)) % 240,
                  );
                  addFood(foodposition);
                }
                size++;
              }
              removesnake(headPosition);
            }
          }, timeUp);
          timeUp = timeUp + 500;
          break;
        case 'ArrowRight':
          window.setTimeout(() => {
            if (x < 20 && repeatRight) {
              x = x + 1;
              headPosition++;
              if (snake.includes(headPosition)) {
                gameOver();
              }
              snake.push(headPosition);
              if (headPosition === foodposition) {
                removeFood(foodposition);
                score = score + 10;
                cont.textContent = score;
                foodposition = Math.floor(
                  (Math.random() * Math.pow(10, 10)) % 240,
                );
                if (!snake.includes(foodposition)) {
                  addFood(foodposition);
                } else {
                  foodposition = Math.floor(
                    (Math.random() * Math.pow(10, 10)) % 240,
                  );
                  addFood(foodposition);
                }
                size++;
              }
              if (x === 20) {
                gameOver();
              }
              removesnake(headPosition);
            }
          }, timeRight);
          timeRight = timeRight + 500;
          break;
        case 'ArrowDown':
          window.setTimeout(() => {
            if (y <= 11 && repeatDown) {
              y = y + 1;
              if (y === 12) {
                gameOver();
              }
              headPosition = headPosition + width;
              if (snake.includes(headPosition)) {
                gameOver();
              }
              snake.push(headPosition);
              if (headPosition === foodposition) {
                removeFood(foodposition);
                score = score + 10;
                cont.textContent = score;
                foodposition = Math.floor(
                  (Math.random() * Math.pow(10, 10)) % 240,
                );
                if (!snake.includes(foodposition)) {
                  addFood(foodposition);
                } else {
                  foodposition = Math.floor(
                    (Math.random() * Math.pow(10, 10)) % 240,
                  );
                  addFood(foodposition);
                }
                size++;
              }
              removesnake(headPosition);
            }
          }, timeDown);
          timeDown = timeDown + 500;
          break;
        case 'ArrowLeft':
          window.setTimeout(() => {
            if (x >= 0 && repeatLeft) {
              x = x - 1;
              headPosition--;
              if (snake.includes(headPosition)) {
                gameOver();
              }
              snake.push(headPosition);
              if (headPosition === foodposition) {
                removeFood(foodposition);
                score = score + 10;
                cont.textContent = score;
                foodposition = Math.floor(
                  (Math.random() * Math.pow(10, 10)) % 240,
                );
                if (!snake.includes(foodposition)) {
                  addFood(foodposition);
                } else {
                  foodposition = Math.floor(
                    (Math.random() * Math.pow(10, 10)) % 240,
                  );
                  addFood(foodposition);
                }

                size++;
              }
              if (x === -1) {
                gameOver();
              }
              removesnake(headPosition);
            }
          }, timeLeft);
          timeLeft = timeLeft + 500;
          break;
        default:
          break;
      }
      if (snake.length === size) {
        snake.splice(0, 1);
      }
      addsnake(headPosition);
      snake.forEach((element) => {
        addsnake(element);
      });
    }, timer);
  }
};
cont.textContent = score;

window.addEventListener('keydown', handleKeyPress);
