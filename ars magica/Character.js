
module.exports = class Character {
  constructor(name, attributes, arts) {
    this.name = name;
    this.attribute = {
      str: 0,
      dex: 0,
      com: 0,
      pre: 0,
      int: 0,
      qui: 0,
      sta: 0,
    }
    this.size = 0;
    this.arts = {
      cr: null,
      re: null,
      pe: null,
      mu: null,
      in: null,
      an: null,
      aq: null,
      au: null,
      co: null,
      he: null,
      ig: null,
      im: null,
      me: null,
      te: null,
      vi: null,
    }
    attributes && this.setAllAttributes(attributes);
  }

  setAttribute(name, val) {
    if (this.attribute[name]) {
      this.attribute[name] = val;
      return true;
    }
    return false;
  }
  setAllAttributes (data) {
    for (let attribute of Object.keys(data)) {
      this.setAttribute(attribute, data[attribute]);
    }
  }

  load (data) {
    for (let [key, val] of data.entries()) {
      this[key] = val;
    }
  }

  save () {
    var output = {};
    for (let [key, val] of this.entries() ) {
      output[key] = val;
    }
    return output;
  }
}