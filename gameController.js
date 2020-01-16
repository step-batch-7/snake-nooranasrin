const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.type);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.type);
  });
};

const drawFood = function(food) {
  let [colId, rowId] = food.location;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};

const eraseFood = function(game) {
  if (game.isSnakeGotFood()) {
    const [colId, rowId] = game.foodLocation;
    const cell = getCell(colId, rowId);
    cell.classList.remove('food');
  }
};

const moveAndDrawSnake = function(game, moveSpecies, species) {
  game[moveSpecies]();
  eraseFood(game);
  eraseTail(species);
  drawSnake(species);
};

const handleKeyPress = function(event, game) {
  const keyMap = { 37: 'turnLeft', 39: 'turnRight' };
  const turnDirection = keyMap[event.keyCode];
  turnDirection && game.turnSnake(turnDirection, 'snake');
};

const attachEventListeners = game => {
  document.body.onkeydown = () => handleKeyPress(event, game);
};

const initSnake = (direction, species) => {
  const snakePosition = {
    snake: [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    ghost: [
      [40, 30],
      [41, 30],
      [42, 30]
    ]
  };
  return new Snake(snakePosition[species], new Direction(direction), species);
};

const setup = game => {
  attachEventListeners(game);
  createGrids();
  const status = game.currentStatus;
  drawSnake(status.snake);
  drawSnake(status.ghostSnake);
  drawFood(status.food);
};

const animateSnakes = game => {
  const status = game.currentStatus;
  moveAndDrawSnake(game, 'moveSnake', status.snake);
  moveAndDrawSnake(game, 'moveGhostSnake', status.ghostSnake);
};

const randomlyTurnSnake = game => {
  let x = Math.random() * 100;
  if (x > 50) {
    game.turnSnake('turnLeft', 'ghostSnake');
  }
};

const main = function() {
  const snake = initSnake(EAST, 'snake');
  const ghostSnake = initSnake(SOUTH, 'ghost');
  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);
  setup(game);
  setInterval(animateSnakes, 200, game);
  setInterval(randomlyTurnSnake, 500, game);
};
