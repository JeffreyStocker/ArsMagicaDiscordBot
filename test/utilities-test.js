const chai = require('chai');
const expect = chai.expect;

describe ('updateWith', function () {
  const uti = require ('../utilities/utilities');
  it('should add update values in base object', function () {
    var target = {a: null, b: 1, c: 'x'};
    var source1 = {a: true, e: false };
    var source2 = {c: false, d: 'notAdded'};
    uti.updateWith(target, source1, source2);

    expect(target.a).to.equal(true);
    expect(target.c).to.equal(false);
    expect(target.b).to.equal(1);
    expect(target.d).to.not.exist;
    expect(target.f).to.not.exist;
  });
});