import React from 'react';
import { AlgorithmState } from '../Model/AlgorithmState';
import { GeneratorComponent } from './GeneratorComponent';
import { updateGenerator, makeNewGenerator } from '../Controller/UserActions';
import { styles } from '../styles';


function EditGeneratorsComponent({state, updateState}: {
    state: AlgorithmState,
    updateState: (state: AlgorithmState) => void
}){
    
    return <div style={styles.componentBoxStyle}>
        <p style={styles.title}>Generators</p>
        <ul>
            {state.generatorChoices.map(generator => {

                return <li><GeneratorComponent g={generator} 
                    saveGeneratorFunction={
                        (generatorUpdateArgs) => 
                        updateGenerator(generatorUpdateArgs, state, updateState)
                    }/></li>
            })}
        </ul>
        <button onClick={(e) => makeNewGenerator(state, updateState)}>New Generator</button>
    </div>

}

export {
    EditGeneratorsComponent
}
