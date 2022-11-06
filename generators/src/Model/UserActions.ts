import { GeneratorUpdateArgs } from "../Components/GeneratorComponent";
import { Generator } from "./Generator";


function updateGenerator({newCost, newIncome, newName, oldGenerator}: GeneratorUpdateArgs) {
    console.log("Pretend I updated generator g")
}

export {
    updateGenerator
}