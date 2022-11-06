import { Generator } from "./Generator";
import { Strategy } from "./Strategy";

 

test('initializing', ()=> {
    const g = new Generator({name: "f", cost: 1, income: 2})
    const s = new Strategy([g, g, g, g])


    s.snapshotAtTimestamp(5)

    expect(s.currentState.currentMoney).toEqual(0)
    expect(s.currentState.currentIncomePerTimestep).toEqual(0)


});