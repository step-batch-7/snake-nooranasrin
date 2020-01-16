const areTwoPointsEqual = function(snakeHead, foodLocation) {
  const [colId1, rowId1] = snakeHead;
  const [colId2, rowId2] = foodLocation;
  return colId1 === colId2 && rowId1 === rowId2;
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  get currentStatus() {
    const snake = { location: this.snake.location.slice() };
    snake.type = this.snake.type;
    snake.previousTail = this.snake.previousTail.slice();
    const ghostSnake = { location: this.ghostSnake.location.slice() };
    ghostSnake.type = this.ghostSnake.type;
    ghostSnake.previousTail = this.ghostSnake.previousTail.slice();
    const food = { location: [this.food.colId, this.food.rowId] };
    return { snake, ghostSnake, food };
  }

  turnSnake(turnDirection, species) {
    this[species][turnDirection]();
  }

  moveSnake() {
    this.snake.move();
  }

  moveGhostSnake() {
    this.ghostSnake.move();
  }

  isSnakeGotFood() {
    const snakeHead = this.snake.getHead();
    const foodLocation = this.food.position;
    return areTwoPointsEqual(snakeHead, foodLocation);
  }

  get foodLocation() {
    return this.food.position;
  }

  get previousFoodPosition() {
    return this.food.getPreviousFoodPosition();
  }

  generateNewFood() {
    const colId = Math.floor(Math.random() * NUM_OF_COLS);
    const rowId = Math.floor(Math.random() * NUM_OF_ROWS);
    const previousFoodPosition = [...this.food.position];
    const newFood = new Food(colId, rowId, previousFoodPosition);
    this.food = newFood;
  }

  update() {
    this.moveSnake();
    this.moveGhostSnake();
    if (this.isSnakeGotFood()) {
      this.generateNewFood();
      this.snake.grow();
    }
  }
}
