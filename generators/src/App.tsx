import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Generator } from './Model/Generator';
import { GeneratorComponent } from './Components/GeneratorComponent'
import { updateGenerator } from './Model/UserActions';
import { StrategyComponent } from './Components/StrategyComponent';
import { Strategy } from './Model/Strategy';

function App() {
  const g = new Generator({cost: 1, income: 5, name: "f"})
  const s = new Strategy([g, g, g, g, g, g, g])

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
        <GeneratorComponent g={g} saveGeneratorFunction={updateGenerator}/>
        <StrategyComponent s={s} timestampToDisplay={10} />
      </header>
    </div>
  );
}

export default App;
