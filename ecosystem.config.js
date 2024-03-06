module.exports = {
  apps: [
    {
      name: 'canxium-staking-mainnet',
      script: 'serve -s buld -l 8008',
      env: {
        REACT_APP_IS_MAINNET: true,
        REACT_APP_GENESIS_FORK_VERSION: 0x00300300,
        REACT_APP_RPC_URL: 'https://rpc.canxium.org',
      },
    },
    {
      name: 'canxium-staking-testnet',
      script: 'serve -s buld -l 8018',
      env: {
        REACT_APP_IS_MAINNET: false,
        REACT_APP_GENESIS_FORK_VERSION: 0x00311300,
        REACT_APP_RPC_URL: 'https://cerium-rpc.canxium.net',
      },
    },
  ],
};
