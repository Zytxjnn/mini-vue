import {reactive} from "../reactive";

describe('reactive', () => {
    it('happy path',() => {
        const original = {
            foo:1
        }

        const p = reactive(original);

        expect(original).not.toBe(p);
        expect(p.foo).toBe(1);
    })
})
