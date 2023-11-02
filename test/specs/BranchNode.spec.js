const { expect } = require("chai");
const { BranchNode } = require("../../dist/BranchNode.js");

describe("BranchNode", function() {
    describe("(instance)", function() {
        beforeEach(function() {
            this.node = new BranchNode("test", {
                simple: true,
                empty: null,
                complex: [
                    {
                        abc: 123,
                        s: "456",
                        another: 123456789
                    }
                ]
            });
        });

        describe("toString", function() {
            it("outputs primative values", function() {
                const str = this.node.toString();
                expect(str).to.match(/simple\s+\|\s+true/m);
                expect(str).to.match(/empty\s+\|\s+null/m);
            });

            it("outputs complex values", function() {
                const str = this.node.toString();
                expect(str).to.match(/\|\s+"abc": 123/);
            });
        });
    });
});
