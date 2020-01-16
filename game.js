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

  moveSnake() {
    this.snake.turnLeft();
  }
}
