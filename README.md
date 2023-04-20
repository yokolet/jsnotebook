# Lerna and React app

This project is built by Lerna.
Subpackages are cli, local-api (Express server), and React app.
The React app is, something like Python's notebook, able to add markdown cells and
code cells. Those cells can be moved up and down, deleted as well.

Note: The features of fetching and saving cells are disabled.

## How to use

### Install Lerna

Install Lerna by npm or yarn.

### bootstrap

The command below installs JavaScript packages.

`lerna bootstrap`

### Start Transpiling Server

`lerna run start --parallel`

### Start Express Server

`node packages/cli/dist/index.js serve`


### Open App

`http://localhost:4005`

## Learn More

- Lerna: https://lerna.js.org/docs/introduction
- Express: https://expressjs.com/
- TypeScript: https://www.typescriptlang.org/
- Monaco Editor: https://github.com/microsoft/monaco-editor
- React MD Editor: https://github.com/uiwjs/react-md-editor
- TypeScript React: https://create-react-app.dev/docs/adding-typescript/
- TypeScript React Redux: https://react-redux.js.org/using-react-redux/usage-with-typescript
- Axios: https://axios-http.com/docs/intro
