import React from 'react';
import {Generator} from '../Model/Generator'

/**
 * The component that refers to a generator, without giving all details
 * Can be highlighted or not (to represent bought or not in a strategy)
 * @param param0 
 * @returns 
 */
function GeneratorReferenceComponent({g, hilight}: {g: Generator, hilight: boolean}){

    const style = {
        padding: "2%", 
        border: "solid", 
        ... hilight && {backgroundColor: "green"}
    }

    if (hilight){
        return <div style={style} data-testid="hilighted">{g.name}</div>
    } else {
        return <div style={style}>{g.name}</div>
    }
}

export {
    GeneratorReferenceComponent
}