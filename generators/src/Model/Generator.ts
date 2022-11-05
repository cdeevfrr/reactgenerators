export { 
    Generator 
}

class Generator {
    name: string
    cost: number
    income: number

    constructor({name, cost, income}: 
        {name: string, cost: number, income: number}){
        this.name = name
        this.cost = cost
        this.income = income
    }
}