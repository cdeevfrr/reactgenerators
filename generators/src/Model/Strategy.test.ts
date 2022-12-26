import { Generator } from "./Generator";
import { Strategy } from "./Strategy";

test('initializing', ()=> {
    const g = new Generator({name: "f", cost: 1, income: 2})
    const s = new Strategy([g, g, g, g])


    s.snapshotAtTimestamp(5)

    expect(s.currentState.currentMoney).toEqual(0)
    expect(s.currentState.currentIncomePerTimestep).toEqual(0)


});

test('happy path', ()=> {
    const generatorIncome = 2
    const g = new Generator({name: "f", cost: 1, income: generatorIncome})
    const s = new Strategy([g, g, g, g])

    s.restartWithMoney(2)

    s.snapshotAtTimestamp(0)
    expect(s.currentState.currentMoney).toEqual(2)
    expect(s.currentState.timestamp).toEqual(0)
    expect(s.currentState.currentIncomePerTimestep).toEqual(0)

    s.snapshotAtTimestamp(1)
    // Should have bought 2 generators, each for $1
    expect(s.currentState.currentMoney).toEqual(0)
    expect(s.currentState.currentIncomePerTimestep).toEqual(2 * generatorIncome)
    expect(s.currentState.timestamp).toEqual(1)

    s.snapshotAtTimestamp(2)
    // Should have bought the last 2 generators for $2, then have $2 left over.
    expect(s.currentState.currentMoney).toEqual(2)
    expect(s.currentState.currentIncomePerTimestep).toEqual(4 * generatorIncome)
    expect(s.currentState.timestamp).toEqual(2)

    s.snapshotAtTimestamp(1)
    expect(s.currentState.timestamp).toEqual(2)

})

test ('Checking old timestamps doesnt reset currentTimestamp', () => {
    const g = new Generator({name: "f", cost: 1, income: 2})
    const s = new Strategy([g, g, g, g])
    expect(s.currentState.timestamp).toEqual(0)
    s.snapshotAtTimestamp(0)
    expect(s.currentState.timestamp).toEqual(0)
    s.snapshotAtTimestamp(1)
    expect(s.currentState.timestamp).toEqual(1)
    s.snapshotAtTimestamp(2)
    expect(s.currentState.timestamp).toEqual(2)
    s.snapshotAtTimestamp(1)
    expect(s.currentState.timestamp).toEqual(2)
})
