class Food {
  constructor(colId, rowId, previousFoodPosition) {
    this.colId = colId;
    this.rowId = rowId;
    this.previousFoodPosition = previousFoodPosition;
  }

  get position() {
    return [this.colId, this.rowId];
  }

  getPreviousFoodPosition() {
    return this.previousFoodPosition;
  }
}
