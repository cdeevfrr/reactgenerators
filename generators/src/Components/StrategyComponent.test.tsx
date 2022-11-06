import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Strategy } from '../Model/Strategy';
import { Generator } from '../Model/Generator';
import { StrategyComponent } from './StrategyComponent';

test('Happy path', async () => {
    const g = new Generator({name: "f", cost: 1, income: 1})
    const s = new Strategy([g, g, g])

    // Mock out the strategy
    s.snapshotAtTimestamp = (n) => { return {
        currentIncomePerTimestep: 5,
        currentMoney: 10,
        nextGeneratorToBuy: 1,
        timestamp: n
    }}

    render(<StrategyComponent s={s} timestampToDisplay={7}/>)

    expect(screen.getByText(/Income/i)).toBeInTheDocument()
    expect(screen.getByText(/5/i)).toBeInTheDocument()
    expect(screen.getByText(/money/i)).toBeInTheDocument()
    expect(screen.getByText(/10/i)).toBeInTheDocument()
   
    const generatorsOnScreen = await screen.findAllByText(g.name)
    const hilightedGeneratorsOnScreen = await screen.findAllByTestId("hilighted")


    expect(generatorsOnScreen).toHaveLength(3)
    expect(hilightedGeneratorsOnScreen).toHaveLength(1) 
})