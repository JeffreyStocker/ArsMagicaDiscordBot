/*
user template = {

}
*/

const Users = class Users {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.characters = [];
    this.currentChar = null;
  }

  static import (userFile) {
    userFile.__proto__ = Users.prototype;
    return userFile;
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

};


module.exports = Users;