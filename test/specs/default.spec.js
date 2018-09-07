"use strict";

var CoM = require("../../index");

describe("Generic Test", function() {
  it("Testing", function(done) {
    CoM.log("[log] Success!");
    CoM.debug("[debug] Success!");
    CoM.warn("[warn] Success!");
    CoM.error("[error] Success!");
    done();
  });
});
