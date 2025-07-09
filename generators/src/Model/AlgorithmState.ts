import { Strategy } from "./Strategy"
import { Generator } from "./Generator"
import { randomExpDecayChoice } from "./Utility"
import { Mutators } from "./Mutators"


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
    populationSize = 5
    startingMoney = 10
    evaluationTimesteps = 100

    // TODO: Use Strategy.compare instead.
    strategyComparisonFunction = (s1: Strategy, s2: Strategy) => 
        s2.snapshotAtTimestamp(this.evaluationTimesteps).currentMoney 
        - s1.snapshotAtTimestamp(this.evaluationTimesteps).currentMoney
    

    constructor(){
        this.generatorChoices = []
        this.population = []
    }

    setStartingMoney(newStartingMoney: number){
        if (newStartingMoney != this.startingMoney){
            this.startingMoney = newStartingMoney
            this.population.forEach(strategy => {
                strategy.restartWithMoney(newStartingMoney)
            })
        }
    }

    setEvaluationTimesteps(newTimesteps: number){
        this.evaluationTimesteps = newTimesteps
    }



    /**
     * This is used to make all new objects from this algorithmState so that react will register the fact that they're different.
     */
    snapshotClone(){
        const result = new AlgorithmState()
        result.generatorChoices = [...  this.generatorChoices]
        result.population = [... this.population] // since strategies always look the same as long as generators, timestampToSee, and goal settings don't change, it's ok to skip re-rendering for each individual strategy.
        result.evaluationTimesteps = this.evaluationTimesteps
        result.startingMoney = this.startingMoney
        return result
    }


    /**
     * This is the method that will effectively be the 'solver'
     * and should be called regularly in the background. 
     */
    async computeOneStep(){
        console.log("Starting one step")

        this.population.sort(this.strategyComparisonFunction)

        const toModify = randomExpDecayChoice(this.population)
        const child = Mutators.simpleMutate(toModify, this.generatorChoices)
        child.restartWithMoney(this.startingMoney)
        this.population.push(child)

        // Sleep added for visibility - nothing here is shown to user so it's just to slow things down.
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.population.sort(this.strategyComparisonFunction)
        while (this.population.length >= this.populationSize){
            this.population.pop()
        }

        console.log("I computed one step")
        return this
    }
}

export {
    AlgorithmState
}