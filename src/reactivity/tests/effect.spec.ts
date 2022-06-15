import {effect} from "../effect";
import {reactive} from "../reactive";

describe('effect', () => {
    it('happy path',() => {
        const user = reactive({
            name:'xjnn',
            age:19
        })

        let nextAge;

        effect(() => {
            nextAge = user.age;
        })

        expect(nextAge).toBe(19);

        // update
        user.age++;
        expect(nextAge).toBe(20);
    })
})
