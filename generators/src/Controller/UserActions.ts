import { GeneratorUpdateArgs } from "../Components/GeneratorComponent";
import { AlgorithmState } from "../Model/AlgorithmState";
import { Generator } from "../Model/Generator";


function updateGenerator({newCost, newIncome, newName, oldGenerator}: GeneratorUpdateArgs, state: AlgorithmState, setState: (state: AlgorithmState)=> void) {
    console.log("Pretend I updated generator g")
    // Make sure to make a new generator object & remove the old one so that react notices a change.

    const oldSpot = state.generatorChoices.indexOf(oldGenerator)

    setState(state.snapshotClone())

}

function makeNewGenerator(state: AlgorithmState, setState: (state: AlgorithmState)=> void){
    state.generatorChoices.push(
        new Generator({
            cost: 1,
            income: 0,
            name: "Unnamed generator"
        })
    )
    // No need to invalidate existing strategies, just generators. Do need a re-render to show the new generator in the generators list.
    setState(state.snapshotClone())
}

export {
    updateGenerator,
    makeNewGenerator
}