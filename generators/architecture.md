


We want a `state` object that holds enough information that a solver can perform one step of computation using only the info in it. Things the state needs to include:

 - the list of generators created by the user
 - a collection of strategies. Some will be user-created, some created by algorithms
 - Any recorded information about the strategies. This might be in the strategy objects themselves.
 - settings, like "starting money", "starting generators", "number of timesteps" (if the goal is max money by time n), current goal, 


 ### Goals
 - Max money by time n
 - Max generation-per-timestep by time n



## Background optimizer
We'll have some kind of background solver be running operations to find better strategies. The user shouldn't be allowed to touch this bucket of strategies, it'll continuously be updated - but they should be able to see it.

V1, the optimizer will be DEAD simple. We should make sure that users can manually optimize things by just playing around, very quickly, as the MVP - making the computer faster at that will be version 2.


### Generators
Generators will be specified by users. They get a name, a cost, and an income amount. Future versions will be more general.

### Strategy objects
Strategies will have the ordered list of generators, and will keep an exponential backoff list of snapshots at timestep n (eg, a snapshot might say current timestamp, current money, nextGeneratorToPurchase, and current money-per-timestep). This way two strategies can quickly compare, and a given strategy never needs to recompute from scratch (this may change for probabilistic generators).

Strategies will need methods like `evaluateToTimestep(n)`, `clearStoredData` (eg if the generators are changed), and `compare(other)`. The background solver must be able to make new strategies from old ones so it's a genetic algorithm. Note that if you make a new strategy, and its first k generators are the same as another computed strategy's first k generators, we can probably reuse some of that computation (not supported first pass).


## Display
The user should be able to specify generators in one page.
Then, the user should be able to see strategies using those generators (at this point, generators will be displayed using their name)

There should be one place for the being-optimized strategies, a "freeze" button, and a place to modify a strategy (this place should allow you to say "evaluate to timestep n" and "add to population")

The user should be able to specify a timestep they're interested in, and strategies will display the value they achieved (money & money per second) at that timestep.   

Strategies will look like a list of generators, possibly with an elipses.







 ### Future plans not supported in this round
 - Probabilistic generators? 
    - This is really useful for stocks. Would require recomputing things that weren't originally recomputed, and would open up a new goal: Maximize chance of reaching $X. 
- Selling generators
    - Just return exactly the resources it takes to purchase that generator.
        - If you're doing stocks, just have the "amount generated" by the generators be inflation adjusted.
- Multiple resource types (eg, money & space)
    - NOT TIME, that's next bullet.
    - Do include fixed amounts (eg stardew space)
- Generators can reduce resources (meaning delaying purchase might be good)
    - If generators require upkeep, eg time investment, that can be a multi-resource subtraction.

- New goal: Max money in the limit (this might actually be covered by other goals)

- Settings (not stored in the state mentioned above) that control how the background solver works

- When making a new strategy from an old one, reuse partial computation from the old one if the prefix of the generators list is similar.

Add the following to generator specifications:
 - timestep delay until first production
 - end time (could be covered by selling generators?)
 - User can specify a function for amountGeneratedAtTimestepN
 - DO NOT ADD - generators can affect other generators. We'll stick with generator independence
 - Max number of this generator that can be bought by a strategy (limited stock)


