import { expect } from "chai";
import { testFun } from "../src/index";

describe("test-pkg", () => {
    it("test 1", () => {
        const a = 1;
        const b = 1;

        testFun();

        expect(a).to.deep.equal(b);
    });
});