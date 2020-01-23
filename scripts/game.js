const areTwoPointsEqual = function(snakeHead, foodLocation) {
  const [colId1, rowId1] = snakeHead;
  const [colId2, rowId2] = foodLocation;
  return colId1 === colId2 && rowId1 === rowId2;
};

class Game {
  #snake;
  #ghostSnake;
  #food;
  #score;
  constructor(snake, ghostSnake) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#score = new Score();
    this.#food;
  }

  get currentStatus() {
    const snake = { location: this.#snake.location };
    snake.type = this.#snake.species;
    snake.previousTail = this.#snake.previousTailPosition;
    const ghostSnake = { location: this.#ghostSnake.location };
    ghostSnake.type = this.#ghostSnake.species;
    ghostSnake.previousTail = this.#ghostSnake.previousTailPosition;
    const food = { location: [...this.#food.position] };
    return { snake, ghostSnake, food };
  }

  turnSnake(turnDirection) {
    this.#snake[turnDirection]();
  }

  turnGhostSnake() {
    this.#ghostSnake.turnRight();
  }

  get foodLocation() {
    return this.#food.position;
  }

  generateNewFood() {
    const colId = Math.floor(Math.random() * NUM_OF_COLS);
    const rowId = Math.floor(Math.random() * NUM_OF_ROWS);
    this.#food = new Food(colId, rowId);
  }

  update() {
    this.#snake.move();
    this.#ghostSnake.wrap();
    this.#ghostSnake.move();
    if (this.#snake.isEat(this.#food)) {
      this.generateNewFood();
      this.#snake.grow();
      this.#score.updateScore(5);
    }
    if (this.#ghostSnake.isEat(this.#food)) {
      this.generateNewFood();
    }
  }

  isSnakeTouchTheGhostSnake() {
    const isGhostTouchSnake = this.#snake.isTouchAnotherSnake(this.#ghostSnake);
    const isSnakeTouchGhost = this.#ghostSnake.isTouchAnotherSnake(this.#snake);
    return isGhostTouchSnake || isSnakeTouchGhost;
  }

  isGameOver() {
    const isSnakeTouchTheWall = this.#snake.isTouchTheWall();
    const isSnakeTouchGhostSnake = this.isSnakeTouchTheGhostSnake();
    const isSnakeTouchItself = this.#snake.isTouchTheBody();
    return isSnakeTouchTheWall || isSnakeTouchGhostSnake || isSnakeTouchItself;
  }

  get newScore() {
    return this.#score.newScore;
  }
}
