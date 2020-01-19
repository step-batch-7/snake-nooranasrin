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

const renderFood = function(game) {
  let [colId, rowId] = game.foodLocation;
  const cell = getCell(colId, rowId);
  eraseFood();
  cell.classList.add('food');
  drawFood(game.currentStatus.food);
};

const handleKeyPress = function(event, game) {
  const keyMap = { 37: 'turnLeft', 39: 'turnRight' };
  const turnDirection = keyMap[event.keyCode];
  turnDirection && game.turnSnake(turnDirection);
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
  game.generateNewFood();
  drawBoard(game);
};

const startGame = function(game) {
  let timeInterval;
  timeInterval = setInterval(() => {
    game.update();
    if (game.isGameOver()) {
      return clearInterval(timeInterval);
    }
    rearrangeSetup(game);
  }, 100);
};

const randomlyTurnSnake = game => {
  let x = Math.random() * 100;
  if (x > 80) {
    game.turnGhostSnake();
  }
};

const main = function() {
  const snake = initSnake(EAST, 'snake');
  const ghostSnake = initSnake(SOUTH, 'ghost');
  const game = new Game(snake, ghostSnake);
  setup(game);
  startGame(game);
  setInterval(randomlyTurnSnake, 1000, game);
};
