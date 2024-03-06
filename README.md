# Staking Launchpad

[![GitPOAP Badge](https://public-api.gitpoap.io/v1/repo/ethereum/staking-launchpad/badge)](https://www.gitpoap.io/gh/ethereum/staking-launchpad)

The [Launchpad](https://launchpad.canxium.org/) is the Canxium Foundation's official way to deposit your CAU for staking on Canxium

## Dependencies

  - **Technology stack**: 
    - [React](https://reactjs.org/) via [CRA](https://reactjs.org/docs/create-a-new-react-app.html)
    - [Redux](https://redux.js.org/)
    - [TypeScript](https://www.typescriptlang.org/)
    - [Web3-React](https://github.com/NoahZinsmeister/web3-react)
    - [Grommet](https://v2.grommet.io/)
    - [Yarn](https://yarnpkg.com/)


## Configuration

To have full functionality of the Launchpad, you must create an `.env` file in your root directory and add an environment variable.


The Infura Project ID will enable the network status progress bar showing the balance of the Deposit Contract

```
REACT_APP_INFURA_PROJECT_ID=your-infura-project-id-here
```

Note: The Portis wallet option is not available when running locally

## Installation

**Available Scripts**
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

**Install Dependencies and Start the Application**
```
yarn
yarn start
```

## Development workflow

By default, `dev` acts as the primary base branch which all PRs should merge into. Make sure any pull requests target this branch.

## Launchpad deployment

- The `master` branch represents the live **testnet** version of the Launchpad. Open a PR to merge `dev` into `master` to deploy a testnet Launchpad
- The `mainnet` branch represents the live **Mainnet** version of the Launchpad. Open a PR to merge `master` into `mainnet` to deploy the Mainnet Launchpad

## Launchpad translation

Our community of translators is also working on translating the Staking Launchpad.

If you are interested in getting involved and helping with the translations, please [visit the project in Crowdin](https://crowdin.com/project/launchpad-translation). 

After joining the project, you can start translating by opening your desired language from the language list.

Detailed information on using Crowdin is available in the [Crowdin Online Editor documentation](https://support.crowdin.com/online-editor/).

----
## Open source licensing info
Creative Commons Zero v1.0 Universal - For more information read the [`LICENSE`](./LICENSE) file.

----
