/*
user template = {

}
*/

const Users = class Users {
  constructor(name, id) {
    this.name = name;
    this._id = id;
    this.characters = [];
    this.currentChar = null;
  }

  static import (userFile) {
    userFile.__proto__ = Users.prototype;
    // var user = new User();
    // user.assign(userFile);
    return userFile;
  }


  _checkIfCharExists(name) {
    if (this.characters.hasOwnProperty(name)) {
      return true;
    }
    return false;
  }


  addChar (name, charId) {
    this.characters.push([name, charId]);
  }


  removeChar(id) {
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i][1] === id) {
        this.characters.splice (i, 1);
        return true;
      }
    }
    return false;
  }


  removeCharByIndex(index) {
    let removed = this.characters.splice(index, 1);
    return removed[0];
  }


  removeCharByName(name) {
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i][0] === name) {
        let removed = this.characters.splice (i, 1);
        return removed[0];
      }
    }
    return false;
  }


  listChars () {
    var names = [];
    for (var charData of this.characters) {
      names.push(charData[0]);
    }
    return names;
  }


  getCharByIndex (index) {
    try {
      return this.characters[index];
    } catch (err) {
      return null;
    }
  }


  getCharByName (charName) {
    var foundChar = this.searchCharByName((character, index, name, id) => {
      return charName === name;
    });
    return foundChar;
  }


  getChar (nameOrIndex) {
    if (isNaN(nameOrIndex)) {
      return this.getCharByName(nameOrIndex);
    }
    return this.getCharByIndex(nameOrIndex);
  }


  searchCharByName (callback) {
    for (let i = 0; i < this.characters.length; i++) {
      if (callback(this.characters[i], i, this.characters[i][0], this.characters[i][1]) === true) {
        return this.characters[i];
      }
    }
    return null;
  }

  setCurrentChar (nameOrIndex) {
    var char = this.getChar(nameOrIndex);
    if (char === null) { return null; }
    this.currentChar = char;
    return char;
  }

};

module.exports = Users;