class Food {
  #colId;
  #rowId;
  constructor(colId, rowId) {
    this.#colId = colId;
    this.#rowId = rowId;
  }

  get position() {
    return [this.#colId, this.#rowId];
  }
}
