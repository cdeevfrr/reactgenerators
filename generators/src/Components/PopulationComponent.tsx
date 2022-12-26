import React from 'react';
import { AlgorithmState } from '../Model/AlgorithmState';
// import { makeNewStrategy } from '../Controller/UserActions';
import { StrategyComponent } from './StrategyComponent';

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

    return <ul>
        {state.population.map(strategy => {
            return <li><StrategyComponent s={strategy} timestampToDisplay={100}/></li>
        })}
    </ul>
}

export {PopulationComponent}