import React, { useState } from 'react';
import { AlgorithmState } from '../Model/AlgorithmState';
// import { makeNewStrategy } from '../Controller/UserActions';
import { StrategyComponent } from './StrategyComponent';

const defaultStartingMoney = 10

/**
 * The population component lets users:
 * 
 * - See the performance of current strategies
 * - Select a strategy to drill into
 * - Freeze the background process
 * 
 * The background process means that this component will be frequently refreshing with the best found strategies so far.
 * 
 * Users can submit new strategies from in the 'drill into' component.
 *  
 */
function PopulationComponent({state, updateState}: {
    state: AlgorithmState,
    updateState: (state: AlgorithmState) => void
}){

    // TODO this is identical to the one in StrategyBuilder
    function updateTimestampEvent(event: React.ChangeEvent<HTMLInputElement>){
        const digits = event.target.value.replace(/[^\d]/g, '')
        const newNumber = Number(digits) || state.evaluationTimesteps
        if (newNumber != state.evaluationTimesteps){
            state.setEvaluationTimesteps(newNumber)
            updateState(state.snapshotClone()) 
        }
    }

    function updateMoneyEvent(event: React.ChangeEvent<HTMLInputElement>){
        const newMoney = Number(event.target.value) || state.startingMoney
        if (newMoney != state.startingMoney){
            state.setStartingMoney(newMoney)
            updateState(state.snapshotClone())
        }
    }

    return <div>
        <div>
            <label>Starting money<input value={state.startingMoney} onInput={updateMoneyEvent}></input></label>
            <label>Timestamp<input value={state.evaluationTimesteps} onChange={updateTimestampEvent}></input></label>
        </div>
        <ul>
            {state.population.map(strategy => {
                return <li><StrategyComponent s={strategy} timestampToDisplay={state.evaluationTimesteps}/></li>
            })}
        </ul>
    </div>
}

export {
    PopulationComponent,
    defaultStartingMoney,
}