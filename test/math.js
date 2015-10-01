"use strict";

var expect = require('expect.js')

Math.log10 = null; //force alternative for testing
var log10 = require('../math/log10')


describe("Math testing functions", function(){

    it("should test math", function(){
        expect(log10(10)).to.be(1);
        expect(log10(100)).to.be(2);
        expect(Math.round(log10(1000))).to.be(3);
    });
});