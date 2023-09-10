const { expect } = require("chai");
const { Fruition } = require("../../dist/Fruition.js");
const { Realisation, createEmptyRealisation } = require("../../dist/Realisation.js");

describe("Realisation", function() {
    it("can be instantiated", function() {
        const f = new Fruition();
        const r = new Realisation([], f);
        expect(r).to.be.an.instanceof(Realisation);
    });

    describe("(instance)", function() {
        beforeEach(function() {
            this.fruition = new Fruition("Test");
            this.realisation = new Realisation("test result", this.fruition);
        });

        it("includes the result", function() {
            expect(this.realisation).to.have.property("result").that.deep.equals("test result");
        });

        it("includes the trace", function() {
            expect(this.realisation).to.have.property("trace", this.fruition);
        });

        it("supports rendering explanation", function() {
            const explanation = this.realisation.explain();
            expect(explanation).to.be.a("string");
            expect(explanation).to.include("Result:");
            expect(explanation).to.include("test result");
        });
    });

    describe("createEmptyRealisation", function() {
        it("outputs a realisation", function() {
            const r = createEmptyRealisation(false, "test");
            expect(r).to.be.an.instanceof(Realisation);
        });
    });
});
