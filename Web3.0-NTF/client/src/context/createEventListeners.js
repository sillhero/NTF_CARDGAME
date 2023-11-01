import { ethers } from "ethers";
// import {setShowAlert} from '../context';

import {ABI} from '../contract';

/**
 * 
 * @param {*} eventFilter 
 * @param {*} provider 
 * @param {*} cb  callback 回调函数 
 */
const AddNewEvent = (eventFilter, provider, cb) => {
    provider.removeListener(eventFilter); // 确保在同一时间里，对同一个事件只有一个监听器 所以先移除
    provider.on(eventFilter, (logs)=> {
        const parsedLogs = (new ethers.utils.Interface(ABI)).parseLog(logs);
        cb(parsedLogs);
    })
}

/**
 * @param navigate 导航
 * @param contract 合约
 * @param provider 提供者
 * @param walletAddress 钱包地址
 * @param setShowAlert 更新提示
 * @param player1Ref
 * @param player2Ref
 * @param setUpdateGameData
 */
export const createEventListeners = ({ navigate, contract, provider, walletAddress, setShowAlert, player1Ref, player2Ref, setUpdateGameData }) => {
    const NewPlayerEventFilter = contract.filters.NewPlayer();
    AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
      console.log('New player created!', args);
  
      if (walletAddress === args.owner) {
        setShowAlert({
          status: true,
          type: 'success',
          message: 'Player has been successfully registered',
        });
      }
    });
}