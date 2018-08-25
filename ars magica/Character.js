const getCorrectTech = function getCorrectTech (name) {
  if (typeof name !== 'string') { throw new Error ('name should be a string'); }
  name = name.toLowerCase();
  let firstLetter = name[0];

};

var wholeTech = {
  creo: 0,
  rego: 0,
  perdo: 0,
  muto: 0,
  intelligo: 0
};


var wholeForms = {
  animal: 0,
  aquam: 0,
  auram: 0,
  corpus: 0,
  herbam: 0,
  imaginem: 0,
  mentem: 0,
  ignem: 0,
  terram: 0,
  vim: 0,
};

var techniques = {
  cr: 0,
  re: 0,
  pe: 0,
  mu: 0,
  in: 0,
};


var forms = {
  an: 0,
  aq: 0,
  au: 0,
  co: 0,
  he: 0,
  im: 0,
  ig: 0,
  me: 0,
  te: 0,
  vi: 0,
};

var attributes = {
  str: 0,
  dex: 0,
  com: 0,
  per: 0,
  int: 0,
  qui: 0,
  sta: 0,
};

var test = [
  '(cr)|(re)|(in)|(pe)|(mu)',
  '(an)|(aq)|(au)|(co)|(he)|(im)|(ig)|(me)|(te)|(vi)'
];

const Character = class Character {
  constructor(name, user, { attri = attributes, arts = {} } = {}) {
    if (!name || !user) {
      throw new Error ('Must include a name and userId');
    }
    this.name = name;
    this.user = user;
    this.attributes = { ...attri };
    this.size = 0;
    this.forms = { ... forms };
    this.techniques = { ...techniques };

    attributes && this.setAllAttributes(attributes);
    arts && this.setAllAttributes(arts);
  }

  get arts() {
    return { ...this.forms, ...this.techniques};
  }

  setAttribute(name, val) {
    if (this.attributes[name]) {
      this.attributes[name] = val;
      return true;
    }
    return false;
  }

  setAllAttributes (data) {
    for (let attribute of Object.keys(data)) {
      this.setAttribute(attribute, data[attribute]);
    }
  }

  setArt(name, val) {
    if (this.arts[name]) {
      this.arts[name] = val;
      return true;
    }
    return false;
  }

  setArts (data) {
    for (let art of Object.keys(data)) {
      this.setArts(art, data[art]);
    }
  }

  set(stat, val) {
    val = Number (val);
    if ( isNaN(val)) { return null; }
    if (this.forms.hasOwnProperty(stat)) {
      this.forms[stat] = val;
    } else if (this.techniques.hasOwnProperty(stat)) {
      this.techniques[stat] = val;
    } else if (this.attributes.hasOwnProperty(stat)) {
      this.attributes[stat] = val;
    } else {
      return null;
    }
    return true;
  }

  static import (charData) {
    charData.__proto__ = Character.prototype;
    return charData;
  }

  returnFormTechBonus (formAndTech) {
    var techBonus = Object.entries(this.techniques).reduce((techBonus, [name, val]) => {
      var regexp = new RegExp(`${name}`, 'gi');
      var found = formAndTech.match(regexp);
      if (found && (techBonus > val || techBonus === null)) {
        return val;
      } else {
        return techBonus;
      }
    }, null);


    var formBonus = Object.entries(this.forms).reduce((formBonus, [name, val]) => {
      var regexp = new RegExp(`${name}`, 'gi');
      var found = formAndTech.match(regexp);
      if (found && (formBonus > val || formBonus === null)) {
        return val;
      } else {
        return formBonus;
      }
    }, null);

    techBonus = techBonus === null ? 0 : techBonus;
    formBonus = formBonus === null ? 0 : formBonus;

    return techBonus + formBonus;
  }
};


module.exports = Character;