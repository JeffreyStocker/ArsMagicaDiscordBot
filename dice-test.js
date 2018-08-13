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

  describe ('sum', function ( ) {
    it('should sum up an array of numbers', function () {
      expect (dice.sum([1, 2, 3, 4, 5])).to.equal(15);
      expect (dice.sum([-1, 5, 2])).to.equal(6);
      expect (dice.sum([3, 6, 1, 4])).to.equal(14);
    });
    it ('should return NaN for non numbers entered', function () {
      expect (dice.sum([3, 6, 1, 'a'])).to.be.NaN;
      expect (dice.sum([3, 6, {test: 'test'}, 0])).to.be.NaN;
      expect (dice.sum([3, 6, [1, 2, 3], 0])).to.be.NaN;
    });
  });

  describe ('stress', function ( ) {
    it('should return an array of numbers', function () {

    });
    it ('should return a botch when rolled a zero', function () {
      var testResults = [];
      for (val of new Array(500)) {
        testResults.push(dice.stress());
      }
      expect(testResults).to.satisfy((val) => {
        if (val = 'botch') {
          return true;
        } else {
          val.every(val => {
            if (val < 0 || val < 11) {
              return true;
            }
            return false;
          })
        }
      })
    });
  });

  describe ('stressSum', function ( ) {
    it('should add up value if only 1 length long', function () {
      expect (dice.stressSum([2])).to.equal(2);
      expect (dice.stressSum([6])).to.equal(6);
      expect (dice.stressSum([8])).to.equal(8);
      expect (dice.stressSum([4])).to.equal(4);
    });

    it ('should add up value of dice that are over the miniumum', function () {
      var sum = dice.stressSum;
      expect (sum([1,7])).to.equal(14);
      expect (sum([1,9])).to.equal(18);
      expect (sum([1, 1, 1, 1, 2])).to.equal(32);
      expect (sum([1, 1, 5])).to.equal(20);
    });

    it ('should add up exploding stress die that are less than 10 + 5*number of explosions', function () {
      var sum = dice.stressSum;
      expect (sum([1, 1, 1])).to.equal(15);
      expect (sum([1,2])).to.equal(10);
      expect (sum([1, 1, 1, 2])).to.equal(20);
    });

  });
});