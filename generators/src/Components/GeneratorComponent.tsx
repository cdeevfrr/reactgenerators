import React from 'react';
import {Generator} from '../Model/Generator'

export interface GeneratorUpdateArgs {
    oldGenerator: Generator,
    newName: string | undefined,
    newCost: number | undefined, // May be Nan
    newIncome: number | undefined, // May be Nan
}

function GeneratorComponent({g, saveGeneratorFunction}: { 
    g: Generator, 
    saveGeneratorFunction: (args: GeneratorUpdateArgs) => void
} ){

    const nameInputRef = React.createRef<HTMLInputElement>()
    const costInputRef = React.createRef<HTMLInputElement>()
    const incomeInputRef = React.createRef<HTMLInputElement>()
    const nameInput = <input name="name" ref={nameInputRef} type="text" defaultValue={g.name}></input>
    const costInput = <input name="cost" ref={costInputRef} type="number" defaultValue={g.cost}></input>
    const incomeInput = <input name="income" ref={incomeInputRef} type="number" defaultValue={g.income}></input>
    
    return <section>
        <label>Name{nameInput}</label>
        <label>Cost{costInput}</label>
        <label>Income{incomeInput}</label>
        <button onClick={ () =>
            saveGeneratorFunction({
                oldGenerator: g,
                newName: nameInputRef.current?.value, 
                newCost: Number(costInputRef.current?.value), 
                newIncome: Number(incomeInputRef.current?.value),
            })
        }>Save</button>
    </section>
}

export {
    GeneratorComponent,
}