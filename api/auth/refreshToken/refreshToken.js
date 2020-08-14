class RefreshTokenHandler {
  store = {};

  create(payload) {
    const refreshToken = this.generate();

    this.store[refreshToken] = payload;

    return refreshToken;
  }

  update(prevToken, payload) {
    if (!(prevToken in this.store)) {
      throw new Error('Invalid refresh token');
    }

    delete this.store[prevToken];
    this.create(payload);
  }

  generate() {
    // https://stackoverflow.com/questions/21816595/how-to-generate-a-random-number-of-fixed-length-using-javascript
    // Will always create a number of 11 digits and it ensures the first digit will never be 0. The code in your question will create a number of less than 6 digits.
    return Math.floor(10000000000 + Math.random() * 90000000000);
  }
}

export const refreshTokenHandler = new RefreshTokenHandler();
