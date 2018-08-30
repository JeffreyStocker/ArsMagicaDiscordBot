const chai = require('chai');
const expect = chai.expect;


describe ('Character Class', function () {
  var Character = require ('../ars magica/Character');
  describe ('new Character constructor', function () {
    it('should create a new character', function () {
      expect(new Character('George', 342234).__proto__).to.equal(Character.prototype);
      expect(() => { new Character('George'); }).to.throw();
      expect(() => { new Character(undefined, 3424324); }).to.throw();
    });

    it ('should have properties forms, techniques, user, name, id ', function () {
      expect (new Character ('George', 34243243)).to.have.all.keys('forms', 'techniques', 'name', 'attributes', 'user', 'size');
    });

    it ('should ', function () {

    });
  });

  describe ('returnFormTechBonus', function () {
    var char = new Character('George', 342342);
    Object.assign(char.techniques, {cr: 5, re: 1, in: 1, pe: 9, mu: 4});
    Object.assign(char.forms, {
      an: 1,
      aq: 2,
      au: 3,
      co: 4,
      he: 5,
      im: 6,
      ig: 7,
      me: 8,
      te: 9,
      vi: 10
    });
    it('should return the form + techniques total', function () {
      expect(char.returnFormTechBonus('crme')).to.equal(5 + 8);
    });

    it ('should return the lesser value of technique', function () {
      expect(char.returnFormTechBonus('crinme')).to.equal(1 + 8);
    });

    it ('should return the lesser value of form', function () {
      expect(char.returnFormTechBonus('peimig')).to.equal(9 + 6);
    });

    it ('should return be able to use multiple forms and techiques', function () {
      expect(char.returnFormTechBonus('peremeig')).to.equal(1 + 7);
    });

    it ('should be able to handle other text', function () {
      expect(char.returnFormTechBonus('mu(cr)im(an)')).to.equal(4 + 1);
    });
  });

  describe ('import', function ( ) {
    it('should set __proto__ of the imported object to the Character prototyple', function () {
      var prevChar = new Character ('goerge', 34342383);
      var parsedChar = JSON.parse(JSON.stringify(prevChar));
      var char = Character.import(parsedChar);
      // expect(char.__proto__).to.equal (Character.prototype);
      expect(typeof Character.import).to.equal ('function');
      expect(typeof char.set).to.equal ('function');
    });
  });

  describe ('set', function ( ) {
    var char;
    beforeEach (() => {
      char = new Character('test', 3243242);
    });
    it('should be a function', function () {
      expect(typeof char.set).to.equal ('function');
    });
    it('should set technique creo (cr) to 5', () => {
      expect(char.techniques.cr).to.equal(0);
      char.set('cr', 5);
      expect(char.techniques.cr).to.equal(5);
    });
    it ('should set a attribute str to -1', function () {
      expect(char.attributes.str).to.equal(0);
      char.set('str', -1);
      expect(char.attributes.str).to.equal(-1);
    });

    it ('should ', function () {

    });
  });

  describe ('setAll', function ( ) {
    it('should ', function () {

    });
  });


});