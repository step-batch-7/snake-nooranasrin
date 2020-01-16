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

  generateNewFood() {
    const colId = Math.floor(Math.random() * 90);
    const rowId = Math.floor(Math.random() * 50);
    const newFood = new Food(colId, rowId);
    this.food = newFood;
  }

  growSnake() {
    this.snake.grow();
  }
}
