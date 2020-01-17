class Food {
  #colId;
  #rowId;
  #previousFoodPosition;
  constructor(colId, rowId, previousFoodPosition) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#previousFoodPosition = previousFoodPosition;
  }

  get position() {
    return [this.#colId, this.#rowId];
  }

  getPreviousFoodPosition() {
    return this.#previousFoodPosition;
  }

  update() {
    this.#previousFoodPosition = [...this.position];
    this.#colId = Math.floor(Math.random() * NUM_OF_COLS);
    this.#rowId = Math.floor(Math.random() * NUM_OF_ROWS);
  }
}
