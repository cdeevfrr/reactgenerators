import { Strategy } from "./Strategy"
import { Generator } from "./Generator"


/**
 * The algorithm state is the top-level object that includes all state needed
 * It should include NO UI components.
 * 
 * It includes things like:
 * - The current goal for strategies.
 * - If goal is "most money at timestep n", the current n.
 * - The list of generators that the user has created so far
 * - The current population of strategies
 * 
 * 
 * Eventually, it should be serializeable so that people can share optimization problems/results
 */
class AlgorithmState {
    generatorChoices: Array<Generator>
    population: Array<Strategy>

    n = 100

    strategyComparisonFunction = (s1: Strategy, s2: Strategy) => 
        s1.snapshotAtTimestamp(this.n).currentMoney 
        - s2.snapshotAtTimestamp(this.n).currentMoney
    

    constructor(){
        this.generatorChoices = []
        this.population = []
    }

    /**
     * This is the method that will effectively be the 'solver'
     * and should be called regularly in the background. 
     */
    computeOneStep(){
        this.population.sort(this.strategyComparisonFunction)
    }

    /**
     * This is used to make all new objects from this algorithmState so that react will register the fact that they're different.
     */
    snapshotClone(){
        const result = new AlgorithmState()
        result.generatorChoices = [...  this.generatorChoices]
        result.population = [... this.population] // since strategies always look the same as long as generators, timestampToSee, and goal settings don't change, it's ok to skip re-rendering for each individual strategy.
        return result
    }
}

export {
    AlgorithmState
}