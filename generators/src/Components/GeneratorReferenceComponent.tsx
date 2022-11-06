import React from 'react';
import {Generator} from '../Model/Generator'

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