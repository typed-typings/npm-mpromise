import Promise = require('mpromise');
var aplus = require('promises-aplus-tests');

// tests
describe("run A+ suite", function () {
  aplus.mocha({
    fulfilled: Promise.fulfilled,
    rejected: Promise.rejected,
    deferred: Promise.deferred
  });
});
