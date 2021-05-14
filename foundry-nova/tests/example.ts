import { expect } from "chai"
import { Nova } from "../src/index"

describe('Nova', () => {
    it('she is awesome', () => {
        expect(new Nova().awesome()).to.true
    });
    it('she is smart', () => {
        expect(new Nova().smart()).to.true
    });
});
