import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Generator } from './Model/Generator';
import { GeneratorComponent } from './Components/GeneratorComponent'
import { updateGenerator } from './Controller/UserActions';
import { StrategyComponent } from './Components/StrategyComponent';
import { Strategy } from './Model/Strategy';
import { EditGeneratorsComponent } from './Components/EditGeneratorsComponent';
import { AlgorithmState } from './Model/AlgorithmState';

function App() {
  // Eventually, we won't pass setAlgorithmState down
  // We'll wrap it in another function.
  // If we have a background process changing the algorithm state & the user changing algorithm state, 
  // and both get in the setState queue at the same time, we always want the user process to win.
  // So before a user action can setState, it should mark a flag like "backgroundUpdatesInvalid".
  // Before the background stuff can setState, it should check that the flag still lets it.
  // The flag should go green, and background process start, only after there's nothing left in the useState queue, so I assume after a render completes.
  const [algorithmState, setAlgorithmState] = useState(new AlgorithmState())

  // On first load, initialize the algorithm state.
  // Since we're using development mode on React > 18, this runs twice:
  // https://www.techiediaries.com/react-18-useeffect/#:~:text=The%20standard%20behavior%20of%20the,effect%20twice%20instead%20of%20once.
  useEffect(() => {
    const g = new Generator({cost: 1, income: 5, name: "f"})
    const s = new Strategy([g, g, g, g, g, g, g])
  
    algorithmState.generatorChoices.push(g)
    algorithmState.population.push(s)
    setAlgorithmState(algorithmState.snapshotClone())
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <EditGeneratorsComponent state={algorithmState} updateState={setAlgorithmState}/>
      </header>
    </div>
  );
}

export default App;
