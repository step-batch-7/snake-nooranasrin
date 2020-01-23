class Score {
  #currentScore;
  constructor() {
    this.#currentScore = 0;
  }

  updateScore(increase) {
    this.#currentScore += increase;
  }

  get newScore() {
    return this.#currentScore;
  }
}
