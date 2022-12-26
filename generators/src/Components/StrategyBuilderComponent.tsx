import { useState } from "react";
import { AlgorithmState } from "../Model/AlgorithmState";
import { Generator } from "../Model/Generator";
import { Strategy } from "../Model/Strategy";
import { StrategyComponent } from "./StrategyComponent";
import DraggableList from 'react-draggable-list'
import React from "react";
import { AddGeneratorComponent } from "./AddGeneratorComponent";


/**
 * A strategy builder component is a separate window that lets the user construct a new strategy.
 * 
 * Users should be able to evaluate the strategy before it goes in the population.
 *     (Actually, we'll just have it auto-evaluate at 10 timesteps and the user can change the number of timesteps)
 * 
 * 
 *  
 * 
 * 
 * @param param0 
 */
function StrategyBuilderComponent({
    generatorList,
    state,
    updateState,
}: {
    generatorList?: ReadonlyArray<Generator>
    state: AlgorithmState,
    updateState: (state: AlgorithmState) => void
}){
    const [timestampToDisplay, setTimestampToDisplay] = useState(10)
    const [strategy, setStrategy] = useState(new Strategy(generatorList || []))

    // TODO there's some way to get the typing of this function to be
    // TypeOf<DraggableList.onMoveEnd>
    function handleDraggableListEvent(
        newList: readonly GeneratorCopyKey[], 
        movedItem: GeneratorCopyKey, 
        oldIndex: number, 
        newIndex: number,
    ){
        const newGeneratorList = newList.map(copyKey => strategy.generatorList[copyKey.index])
        const newStrategy = new Strategy(newGeneratorList)
        setStrategy(newStrategy)
    }

    function updateTimestampEvent(event: React.ChangeEvent<HTMLInputElement>){
        const digits = event.target.value.replace(/[^\d]/g, '')
        const newNumber = Number(digits) || timestampToDisplay // Automatically undo edits that make it not-a-number.
        setTimestampToDisplay(newNumber) 
    }

    function addGenerator(generator: Generator){
        const newGeneratorList = [...strategy.generatorList, generator]
        const newStrategy = new Strategy(newGeneratorList)
        setStrategy(newStrategy)
    }
    
    function removeGenerator(key: GeneratorCopyKey){
        const newGeneratorList = [...strategy.generatorList]
        newGeneratorList.splice(key.index, 1)
        setStrategy(new Strategy(newGeneratorList))
    }

    function addCurrentStrategyToPopulation(){
        state.population.push(strategy)
        updateState(state.snapshotClone())
    }

    const displayInfo = strategy.snapshotAtTimestamp(timestampToDisplay)

    return <div>
        <div style={{backgroundColor: "black"}}>
            <button onClick={addCurrentStrategyToPopulation}>Add Strategy to Population</button>
            <label>Timestamp<input value={timestampToDisplay} onChange={updateTimestampEvent}></input></label>
            <p>Money: {displayInfo.currentMoney}</p>
            <p>Income: {displayInfo.currentIncomePerTimestep}</p>
        </div>
        <DraggableList<
            GeneratorCopyKey, // Item type
            {removeGenerator: (g: GeneratorCopyKey) => void}, //Common props passed to the template that renders items
            DraggableGeneratorComponent // Type of the template
        >
            itemKey="index"
            template={DraggableGeneratorComponent}
            list={strategy.generatorList.map((val, index)=> {return {index, strategy}})}
            onMoveEnd={handleDraggableListEvent}
            commonProps={{removeGenerator}}
        />
        <AddGeneratorComponent addGenerator={addGenerator} generatorsList={state.generatorChoices}/>
    </div>
}

/**
 * Since you can have 2 identical generators in a strategy,
 * we need a way to make itemKeys for elements of the draggable list.
 * 
 * Normally, we'd make an array of included generators & point to that generator's index in the array.
 *   (this array could have duplicates for generators)
 * But this is exactly what a strategy holds, so we just point to the index in the current strategy.
 */
interface GeneratorCopyKey {
    index: number,
    strategy: Strategy,
}

interface DraggableListInputs {
    item: GeneratorCopyKey;
    itemSelected: number;
    dragHandleProps: object;
    commonProps: {removeGenerator: (g: GeneratorCopyKey) => void}
}

class DraggableGeneratorComponent extends React.Component<DraggableListInputs>{
    render(): React.ReactNode {
        const { item: generatorCopyKey, itemSelected, dragHandleProps, commonProps } = this.props;
        const generator = generatorCopyKey.strategy.generatorList[generatorCopyKey.index]
        return <div {...dragHandleProps}>
            <p>{generatorCopyKey.index}{generator.name}</p>
            <button onClick={() => commonProps.removeGenerator(generatorCopyKey)}>X</button>
        </div>
    }
}

export {StrategyBuilderComponent}