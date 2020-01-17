class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get location() {
    return this.#positions.slice();
  }

  get species() {
    return this.#type;
  }

  turnLeft() {
    this.#direction.turnLeft();
  }

  turnRight() {
    this.#direction.turnRight();
  }

  getHead() {
    return this.#positions[this.#positions.length - 1];
  }

  get previousTailPosition() {
    return this.#previousTail.slice();
  }

  hasTouchTheWall() {
    const [headX, headY] = [...this.getHead()];
    const isCrossedHorizontalBoundary = headX < 0 || headX >= NUM_OF_COLS;
    const isCrossedVerticalBoundary = headY < 0 || headY >= NUM_OF_ROWS;
    return isCrossedHorizontalBoundary || isCrossedVerticalBoundary;
  }

  move() {
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    this.#previousTail = this.#positions.shift();
    const [deltaX, deltaY] = this.#direction.delta;
    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    this.#positions.unshift(this.#previousTail);
  }

  isTouchTheBody() {
    const head = this.getHead();
    const body = this.location.slice(0, -1);
    return body.some(position => areTwoPointsEqual(head, position));
  }

  isTouchAnotherSnake(otherSnake) {
    const head = otherSnake.getHead();
    return this.#positions.some(position => areTwoPointsEqual(position, head));
  }
}
