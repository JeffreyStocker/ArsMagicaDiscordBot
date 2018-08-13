const chai = require('chai');
const expect = chai.expect;
const dice = require('./dice.js');

describe ('dice', function () {
  describe ('simple', function () {
    it('should output nothing but numbers between 1 and 10', function () {
      for (let i = 0; i < 500; i++) {
        expect(dice.simple()).to.within(1, 10);
      }
    });
  });
});