# What's this?

See it live at [(https://cdeevfrr.github.io/reactgenerators/)](https://cdeevfrr.github.io/reactgenerators/)

# Generators

This project is similar to https://github.com/cdeevfrr/generators but intended to be more flexible/user friendly.

Generators are "things which cost resources to acquire, and which then produce resources at a regular cadence". Examples: Houses that you're renting. A house that you buy, that then saves you $x in rent. A stock. Stardew valley crops. Almost every item in Factorio. The cookie clicker game. 


The goal is to make a very user-friendly interface for specifying real-life generators and understanding how they interact.

We will assume that, if you plan to purchase a generator, delaying the purchase can never _hurt_ you; so given some ordering in which generators must be purchased, it's always strictly better to purchase each one as soon as possible. Such an ordering of generators is called a _Strategy_. The goal is to find very good (or maybe optimal) strategies given user-specified generators, user specified definitions of goodness (total dollars after n timesteps? most money in the limit? ...?), and while allowing users to easily test slight modifications to strategies eg "If I swap the generators in spot i an j, how much worse is the result?"

Many players of many of the games mentioned above think they have clearly optimal formulas, eg "time to recovering investment / investment" or similar. However, every formula we've seen fails in at least one case. See the starterURL in [the previous version of this project](https://github.com/cdeevfrr/generators)

# Goals

# Devops

See package scripts. 
- `npm run deploy` works with the gh-pages npm package
- `npm run start` and `npm run test` run with react-scripts. 
    - To run all tests (not just ones recently modified) run `npm run test -- --watchAll`







# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
