"use strict";

var CoM = require("../../index");

describe("Generic Test", function() {
  it("Testing", function(done) {
    CoM.log("Log Message |disco:|Success!|:disco|");
    CoM.space();
    CoM.debug("Debugging Message |green:|Success!|:green|");
    CoM.space();
    CoM.warn("Warning Message |yellow:|Success!|:yellow|");
    CoM.space();
    CoM.error("Error/Fatal Message |red:|Success!|:red|");
    CoM.divider();
    done();
  });
});
