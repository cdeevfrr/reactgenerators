import { Strategy } from "./Strategy";
import { Generator } from "./Generator"
import { randInt, randomChoice } from "./Utility";

export const Mutators = {
    simpleMutate: simpleMutate
}

function simpleMutate (s: Strategy, generatorChoices: Array<Generator>) {
    const mutateCount = randomChoice([1, 2], [.7, .3])

    const indexes = []
    for (let i = 0; i < mutateCount; i++){
        indexes.push(randInt({minInclusive: 0, maxExclusive: s.generatorList.length}))
    }

    const newStrategyGeneratorList = s.generatorList.slice()
    for (const index of indexes){
        newStrategyGeneratorList[index] = randomChoice(generatorChoices)
    }
    const result = new Strategy(newStrategyGeneratorList)
    newStrategyGeneratorList.push(generatorChoices[0])

    return result

}