import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Generator } from './Model/Generator';
import { Strategy } from './Model/Strategy';
import { EditGeneratorsComponent } from './Components/EditGeneratorsComponent';
import { AlgorithmState } from './Model/AlgorithmState';
import { defaultStartingMoney, PopulationComponent } from './Components/PopulationComponent';
import { StrategyBuilderComponent } from './Components/StrategyBuilderComponent';

function App() {
  // This app, rather than using a state library like Redux, holds all state in the AlgorithmState object. 
  // The majorit of this file deals with ensuring that user updates to this state take precedence over background updates,
  // and kicking off a background process to compute the resources each generator has over time.

  const [algorithmState, setAlgorithmState] = useState(new AlgorithmState())
  const dbLoaded = useRef<boolean>(false)

  // Tracks whether the background process should stop
  const backgroundAbortController = useRef<{ abort: () => void } | null>(null);


  // Instead of letting sub components setAlgorithmState directly, we make a userSetState
  // and a backgroundSetState that aborts if userSetState has alread been called.
  const lastUserUpdate = useRef<number>(0)
  const userSetAlgorithmState = (state: AlgorithmState) => {
    const now = Date.now();
    lastUserUpdate.current = now;
    setAlgorithmState(state);
  };
  const backgroundSetAlgorithmState = (state: AlgorithmState) => {
    const userUpdateAtStart = lastUserUpdate.current;

    setAlgorithmState((prevState) => {
      // If a user update happened since this update started, skip
      if (lastUserUpdate.current > userUpdateAtStart) {
        return prevState; // Ignore this background update
      }
      return state; // Accept background update
    });
  };

  useEffect(() => {
    if (dbLoaded.current){ // Explicitly gate this to run at most once. UseEffect runs twice in dev mode, and seems to re-run regularly?
      return
    }

    // Simulate a DB load
    const f = new Generator({cost: 1, income: 5, name: "f"})
    const g = new Generator({cost: 5, income: 20, name: "g"})
    const s = new Strategy([g, g, g, g, g, g, g])
    s.restartWithMoney(defaultStartingMoney)
  
    algorithmState.generatorChoices.push(f)
    algorithmState.generatorChoices.push(g)
    algorithmState.population.push(s)
    dbLoaded.current = true
    setAlgorithmState(algorithmState.snapshotClone())
  }, [])

  // Background process kicks off *only* after user updates (see useEffect's second arg below)
  useEffect(() => {
    let aborted = false

    // Outline of this useEffect function:
    // Define 
    // - the background loop (repeatedly call computeOneStep)
    // - the render interval.
    // - the abort fn that stops both.
    // Then, 
    // - call the previous abort function (saved from useRef),
    // - call background loop & render interval
    // - return the abort fn

    let backgroundState = algorithmState;

    const runBackgroundLoop = async () => {
      let newState = await backgroundState.snapshotClone().computeOneStep();
      while (
        newState.didUpdate(backgroundState) &&
        !aborted
      ) {
        backgroundState = newState;
        newState = await backgroundState.computeOneStep();
      }
    };

    // Rerender update loop
    const renderInterval = setInterval(() => {
      if (!aborted) {
        backgroundSetAlgorithmState(backgroundState);
      }
    }, 1000);

    const abortFn = () => {
      aborted = true;
      clearInterval(renderInterval);
    }

    // Shut down any existing runs of this useEffect
    if (backgroundAbortController.current){
      backgroundAbortController.current.abort()
    }
    backgroundAbortController.current = {
      abort: abortFn
    };
    // Start the background loop
    runBackgroundLoop();

    // In addition to `abort` being called when replaced by a user update 
    //    retriggering this block, (backgroundAbortController.current.abort())
    // Also call it when unmounting.
    return abortFn;
  }, [lastUserUpdate.current]); // 👈 re-runs only after a new user update


  return (
    <div className="App">
      <header className="App-header">
        <EditGeneratorsComponent state={algorithmState} updateState={userSetAlgorithmState}/>
        <PopulationComponent state={algorithmState} updateState={userSetAlgorithmState} />
        <StrategyBuilderComponent state={algorithmState} updateState={userSetAlgorithmState}></StrategyBuilderComponent>
      </header>
    </div>
  );
}

export default App;
