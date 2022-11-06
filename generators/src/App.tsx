import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Generator } from './Model/Generator';
import { GeneratorComponent } from './Components/GeneratorComponent'
import { updateGenerator } from './Model/UserActions';

function App() {
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
        <GeneratorComponent g={new Generator({cost: 1, income: 5, name: "f"})} saveGeneratorFunction={updateGenerator}/>
      </header>
    </div>
  );
}

export default App;
