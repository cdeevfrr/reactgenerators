import { Generator } from "./Generator"

export {
    Strategy
}

interface Snapshot{
    timestamp: number,
    currentMoney: number,
    currentIncomePerTimestep: number,
    nextGeneratorToBuy: number,
}

enum StrategyComparisonOutcome {
    LEFTISGREATER,
    LEFTISLESS,
    UNDEFINED,
}

type ComparisonFunction = (s1: Snapshot, s2: Snapshot) => StrategyComparisonOutcome

// A strategy is an ordered list of generators we want to buy.
// Given a strategy, there is a 1:1 function state(t) from timestamp to {money, generators bought, ...}
// 
// This class does a bunch of computational hacks to make it easy to comute that 
// function somewhat quickly.
// Namely, it stores snapshots of a few timestamps, and computes state(t) by starting at the nearest
// stored snapshot.
class Strategy{
    generatorList: ReadonlyArray<Generator>
    snapshots: {[timestamp: number]: Snapshot} // Let's store every 2^n timestamp, and timestamp 0.
    currentState: Snapshot

    constructor(generatorList: ReadonlyArray<Generator>){
        this.generatorList = generatorList
        // Copy of clearStoredData() to make compiler happy.
        this.snapshots = {}
        this.currentState = {
            currentMoney: 0,
            currentIncomePerTimestep: 0,
            nextGeneratorToBuy: 0,
            timestamp: 0
        }
        this.snapshots[0] = this.currentState
    }

    clearStoredData(){
        this.snapshots = {}
        this.currentState = {
            currentMoney: 0,
            currentIncomePerTimestep: 0,
            nextGeneratorToBuy: 0,
            timestamp: 0
        }
        this.snapshots[0] = this.currentState
    }

    /**
     * Start this strategy over, but assume it has n dollars to start with.
     * @param n 
     */
    restartWithMoney(n: number){
        this.clearStoredData()
        this.currentState.currentMoney = n // overwrites snapshots[0] too.
    }


    /**
     * Given the previous snapshot, figure out what the snapshot would look like after one additional timestep
     * 
     * Each timestep includes:
     *    - Add income
     *    - buy as many generators as you can
     * This means that timesteps generally report low money values.
     * 
     * If the timestamp is a power of 2, statefully store it. 
     * @param previousSnapshot 
     */
    nextSnapshot(previousSnapshot: Snapshot): Snapshot{
        let newMoney = previousSnapshot.currentMoney
        // record your previous income rate in case it changes.
        let newIncome = previousSnapshot.currentIncomePerTimestep

        // Acquire your income
        newMoney += newIncome // technically oldIncome for now.


        // Find the next generator to buy
        let nextGeneratorToBuyIndex = previousSnapshot.nextGeneratorToBuy
        let nextToBuy = this.generatorList[nextGeneratorToBuyIndex]
        // While we can buy it, see if we can buy the one after that too.
        while (nextToBuy && newMoney >= nextToBuy.cost){
            // buy a generator
            newMoney -= nextToBuy.cost
            newIncome += nextToBuy.income
            

            // look at the next one
            nextGeneratorToBuyIndex += 1
            nextToBuy = this.generatorList[nextGeneratorToBuyIndex]
        }

        const newTimestamp = previousSnapshot.timestamp + 1

        const result: Snapshot =  {
            timestamp: newTimestamp,
            currentIncomePerTimestep: newIncome,
            currentMoney: newMoney,
            nextGeneratorToBuy: nextGeneratorToBuyIndex,
        }

        if (powerOf2(newTimestamp)){
            this.snapshots[newTimestamp] = result
        }

        return result
    }

    snapshotAtTimestamp(n: number): Snapshot{
        if (n < 0){
            throw new Error ("Cannot find state at timestamp " + n)
        }

        // If currentState is before n, we'll just advance current state until we hit n.
        while (this.currentState.timestamp < n){
            this.currentState = this.nextSnapshot(this.currentState)
        } 
        if (n == this.currentState.timestamp){
            return this.currentState
        } 
        // At this point, we know current state is past n, so we have to reset to an old snapshot and recompute.
        // We know the old snapshot will exist (starting with { 1: } )
        else {
            let previousSnapshot = this.snapshots[biggestPowerOf2Inside(n)]
            while(n < previousSnapshot.timestamp){
                previousSnapshot = this.nextSnapshot(previousSnapshot)
            }
            return previousSnapshot
        }
    }

    compare(other: Strategy, comparisonFunction: ComparisonFunction, timestamp?: number): StrategyComparisonOutcome{
        if (timestamp) {
            return comparisonFunction(this.snapshotAtTimestamp(timestamp), other.snapshotAtTimestamp(timestamp))
        } else {
            const latestSharedTimestamp = Math.min(this.currentState.timestamp, other.currentState.timestamp)
            return comparisonFunction(this.snapshotAtTimestamp(latestSharedTimestamp), other.snapshotAtTimestamp(latestSharedTimestamp))
        }
    }

    // While the compare function cares about money at a given timestamp, for sorting,
    // this function just evaulates the abstract idea of a strategy as
    // a function (generatorList, timestamp) -> {money, boughtGenerators}
    // and asks if another Strategy object represents the same function.
    isSameStrategy(other: Strategy){
        return canonical(other.generatorList) === canonical(this.generatorList)
    }

}

function canonical(gList: ReadonlyArray<Generator>){
    return JSON.stringify(gList.map((g) => {return {"name": g.name, "cost": g.cost, "income": g.income}}))
}

//https://stackoverflow.com/questions/30924280/what-is-the-best-way-to-determine-if-a-given-number-is-a-power-of-two
// Note that 1 IS a power of 2 according to this function. 
function powerOf2(v: number) {
    v = Math.trunc(v)
    return v && !(v & (v - 1));
}

function biggestPowerOf2Inside(n: number): number{
    n = Math.trunc(n)
    return Math.pow(2, Math.floor(Math.log(n) / Math.log(2)))
}