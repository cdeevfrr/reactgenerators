import React from 'react';
import {Strategy} from '../Model/Strategy'
import { GeneratorReferenceComponent } from './GeneratorReferenceComponent';


function StrategyComponent({s, timestampToDisplay}: {s: Strategy, timestampToDisplay: number}){
    // Shows top-level info for this strategy
    const displayInfo = s.snapshotAtTimestamp(timestampToDisplay)
    const summaryArea = <div style={{backgroundColor: "black"}}>
        <p>Money: {displayInfo.currentMoney}</p>
        <p>Income: {displayInfo.currentIncomePerTimestep}</p>
    </div>
    // A flexible container that uses remaining room to show the list of generators in this strategy
    const generatorsListArea = <div style={{display: "flex", flexFlow:'flow wrap', overflow: "auto"}}>
        {
            s.generatorList.map((generator, index) => 
                // hilight if already bought
                GeneratorReferenceComponent({g: generator, hilight: index < displayInfo.nextGeneratorToBuy})
            )
        }
    </div>
    return <div style={{display: "flex", flexFlow:'flow wrap', margin: '5px'}}>
        {generatorsListArea}
        {summaryArea}
    </div>
}

export {
    StrategyComponent
}