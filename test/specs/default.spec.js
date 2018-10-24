"use strict";

var CoM = require("../../index");

describe("Generic Test", function() {
  it("Testing", function(done) {
    CoM.log("Log Message |disco:|Success!|:disco|");
    CoM.debug("Debugging Message |green:|Success!|:green|");
    CoM.warn("Warning Message |yellow:|Success!|:yellow|");
    CoM.error("Error/Fatal Message |red:|Success!|:red|");
    done();
  });
});
