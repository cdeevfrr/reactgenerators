import React from "react";
import { Generator } from "../Model/Generator";
import { useState } from "react";


function AddGeneratorComponent({
    addGenerator,
    generatorsList,
}:{
    addGenerator: (generator: Generator)=>void
    generatorsList: Array<Generator>
}){
    const [sIndex, setIndex] = useState('0')

    const selectedGenerator = generatorsList[Number(sIndex)]

    if (generatorsList.length == 0){
        generatorsList = [{name: "Prebuilt generator", cost: 1, income: 0}]
    }

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        setIndex(event.target.value)
    }

    return <div>
        <select value={sIndex} onChange={handleChange}>
            {generatorsList.map( (g, index) => {
                return <option value={index} key={index}>{g.name}</option>   
            })}
          </select>
    <button onClick={() => addGenerator(generatorsList[Number(sIndex)])}>Add generator</button>
    </div>
}

export {
    AddGeneratorComponent
}


