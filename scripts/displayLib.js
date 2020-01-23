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

const displayScore = function(game) {
  const score = game.newScore;
  document.getElementById('score').innerText = score;
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.type);
};

const eraseFood = function() {
  const previousCell = document.querySelector('.food');
  previousCell.classList.remove('food');
};

const rearrangeSetup = function(game) {
  const types = ['snake', 'ghostSnake'];
  const status = game.currentStatus;
  types.forEach(species => {
    eraseTail(status[species]);
    drawSnake(status[species]);
  });
  renderFood(game);
  displayScore(game);
};

const drawBoard = function(game) {
  const { snake, ghostSnake, food } = game.currentStatus;
  drawSnake(snake);
  drawSnake(ghostSnake);
  drawFood(food);
};
