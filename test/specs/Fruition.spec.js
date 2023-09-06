const { expect } = require("chai");
const { Fruition } = require("../../dist/Fruition.js");
const { Node } = require("../../dist/Node.js");
const { BranchNode } = require("../../dist/BranchNode.js");
const { MeasurementNode } = require("../../dist/MeasurementNode.js");

describe("Fruition", function() {
    it("can be instantiated", function() {
        const f = new Fruition();
        expect(f).to.be.an.instanceof(Fruition);
    });

    describe("(instance)", function() {
        beforeEach(function() {
            this.fruition = new Fruition("Test");
        });

        it("sets the name", function() {
            expect(this.fruition).to.have.property("name", "Test");
        });

        it("creates a start node", function() {
            expect(this.fruition.entry).to.be.an.instanceof(Node);
            expect(this.fruition.entry).to.equal(this.fruition.current);
        });

        it("can create new branches", function() {
            this.fruition.branch("branch");
            expect(this.fruition.current).to.be.an.instanceof(BranchNode);
            expect(this.fruition.entry).to.not.equal(this.fruition.current);
            expect(this.fruition.current.description).to.equal("branch");
        });

        it("can create new nodes", function() {
            this.fruition.mark("test");
            expect(this.fruition.current).to.be.an.instanceof(Node);
            expect(this.fruition.entry).to.not.equal(this.fruition.current);
            expect(this.fruition.current.description).to.equal("test");
        });

        it("can create new measurements", function() {
            this.fruition.measure("measurement", {
                test: true
            });
            expect(this.fruition.current).to.be.an.instanceof(MeasurementNode);
            expect(this.fruition.entry).to.not.equal(this.fruition.current);
            expect(this.fruition.current.description).to.equal("measurement");
        });

        it("can output to a string", function() {
            this.fruition
                .mark("in method")
                .branch("convert user", { id: 123 })
                .measure("session context", { dev: true, code: "abc123" });
            const output = this.fruition.toString();
            expect(output).to.contain("Fruition: Test");
            expect(output).to.contain("convert user");
            expect(output).to.contain("session context");
        });
    });
});
