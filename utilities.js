const updateWith = function (target, ...sources) {
  for (let source of sources) {
    for (let [key, val] of Object.entries(source)) {
      if (target.hasOwnProperty(key)) {
        target[key] = val;
      }
    }
  }
  return target;
};



module.exports = {
  updateWith
};