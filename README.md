# Sepolia Gods - Online Multiplayer Web3 NFT Card Game

## Instructions on setting up the Web3 part of the project

0. `cd web3`
1. `npx hardhat` -> y → typescript → enter → enter
2. `npm install @openzeppelin/contracts dotenv @nomiclabs/hardhat-ethers` + Hardhat packages `npm install --save-dev "hardhat@^2.12.0" "@nomicfoundation/hardhat-toolbox@^2.0.0"`
3. Install [Core](https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb), a Metamask smart wallet alternative built for Avalanche dApps
4. Turn on the testnet mode by: opening up the Core extension -> click the hamburger menu on the top left -> go to advanced -> turn on the testnet mode
5. Fund your wallet from the [Sepolia Faucet](https://sepoliafaucet.com/)
6. Create a `.env` file and specify a PRIVATE_KEY variable.
7. To get to the private key, do the following steps:
8. Open up the MetaMask extension -> 在网络中选择 Sepolia Testnet -> 点击账户 -> 导出私钥

9. Copy the `hardhat.config.ts` file from the GitHub gist down in the description
10. Copy the `deploy.ts` script from the GitHub gist down in the description
11. Copy the `AvaxGods.sol` smart contract code from the GitHub gist down in the description
12. Compile the contract by running the `npx hardhat compile` command
13. Deploy the smart contract on the Fuji test network by running the `npx hardhat run scripts/deploy.ts --network fuji` command
    Move the `/artifacts/contracts/AVAXGods.json` file to the `/contract` folder on the frontend
    Copy the address of the deployed contract from the terminal and paste it into the `/contract/index.js` file of the frontend application

# 目前存在问题

    玩家加入对局后，无法直接重定向到对局页面，需要手动刷新页面
    玩家退出对局后，无法直接重定向到主页，需要手动刷新页面
    （可能是由于小狐狸处理国漫导致）
