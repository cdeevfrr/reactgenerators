import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { GeneratorComponent, GeneratorUpdateArgs } from './GeneratorComponent';
import { Generator } from '../Model/Generator'
import userEvent from '@testing-library/user-event';

test('Handles weird inputs', () => {

    const original: Generator = new Generator({
        cost: 1,
        income: 2,
        name: "gen1"
    })

    const saves: Array<GeneratorUpdateArgs> = []
    function saveRecordingFunction (args: GeneratorUpdateArgs) {
        saves.push(args)
    }

    render(<GeneratorComponent g={original} saveGeneratorFunction={saveRecordingFunction}/>);


    const generatorNameInput = screen.getByLabelText(/name/i);
    const generatorCostInput = screen.getByLabelText(/cost/i);

    const saveButton = screen.getByText(/save/i);

    expect(generatorNameInput).toBeInTheDocument();

    userEvent.clear(generatorNameInput);
    userEvent.type(generatorNameInput, "gen2");
    userEvent.click(saveButton);

    expect(saves).toEqual([
        {
            newCost: 1,
            newIncome: 2,
            newName: "gen2",
            oldGenerator: original,
        },
    ]);

    userEvent.clear(generatorCostInput);
    userEvent.type(generatorCostInput, "3");
    userEvent.click(saveButton);

    expect(saves).toEqual([
        {
            newCost: 1,
            newIncome: 2,
            newName: "gen2",
            oldGenerator: original,
        },
        {
            newCost: 3,
            newIncome: 2,
            newName: "gen2",
            oldGenerator: original,
        },
    ]);

  });