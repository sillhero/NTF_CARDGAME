import { ethers } from "ethers"
// import {setShowAlert} from '../context';

import {ABI} from "../contract"
import { playAudio, sparcle } from "../utils/animation";
import { defenseSound } from "../assets";


const emptyAccount = '0x0000000000000000000000000000000000000000';


/**
 *
 * @param {*} eventFilter
 * @param {*} provider
 * @param {*} cb  callback 回调函数
 */
const AddNewEvent = (eventFilter, provider, cb) => {
    provider.removeListener(eventFilter) // 确保在同一时间里，对同一个事件只有一个监听器 所以先移除
    provider.on(eventFilter, (logs) => {
        const parsedLogs = (new ethers.utils.Interface(ABI)).parseLog(logs)
        cb(parsedLogs)
    })
}



const getCoords = (cardRef) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
  
    return {
      pageX: left + width / 2,
      pageY: top + height / 2.25,
    };
  };
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
export const createEventListeners = ({
                                         navigate,
                                         contract,
                                         provider,
                                         walletAddress,
                                         setShowAlert,
                                         player1Ref,
                                         player2Ref,
                                         setUpdateGameData
                                     }) => {
    const NewPlayerEventFilter = contract.filters.NewPlayer()
    AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
        console.log("New player created!", args)

        if (walletAddress === args.owner) {
            setShowAlert({
                status: true,
                type: "success",
                message: "Player has been successfully registered"
            })
        }
    })

    // 监听新玩家， 有新玩家加入游戏后 会自动重定向到创建游戏界面

    const NewGameTokenEventFilter = contract.filters.NewGameToken();
    AddNewEvent(NewGameTokenEventFilter, provider, ({ args }) => {
      console.log('New game token created!', args.owner);
  
      if (walletAddress.toLowerCase() === args.owner.toLowerCase()) {
        setShowAlert({
          status: true,
          type: 'success',
          message: 'Player game token has been successfully generated',
        });
  
        navigate('/createBattle');
      }
    });

    // 监听玩家加入对局
    const NewBattleEventFilter = contract.filters.NewGameToken()

    // 这个监听事件主要引导玩家进入游戏界面
    AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
        console.log("New Battle started!", args, walletAddress)
        if (walletAddress.toLowerCase() === args.player1.toLowerCase() || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
            // 确认玩家身份
            navigate(`/battle/${args.battleName}`)
        }
        setUpdateGameData((preUpdateGameData) => preUpdateGameData + 1)
    })

    // 监听玩家移动
    const BattleMoveEventFilter = contract.filters.BattleMove();
    AddNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
    console.log('Battle move initiated!', args);
    });

    // 监听对局
    const RoundEndedEventFilter = contract.filters.RoundEnded();
    AddNewEvent(RoundEndedEventFilter, provider, ({ args }) => {
        console.log('Round ended!', args, walletAddress);
        for(let i = 0; i < args.damagedPlayers.length; i += 1) {
            if (args.damagedPlayers[i] !== emptyAccount) {
                if (args.damagedPlayers[i].toLowerCase() === walletAddress.toLowerCase()) {
                    sparcle(getCoords(player1Ref))
                } else if (args.damagedPlayers[i] !== walletAddress) {
                    sparcle(getCoords(player2Ref))
                }
            } else {
                playAudio(defenseSound)
            }
        }
        setUpdateGameData((preUpdateGameData) => preUpdateGameData + 1)

    });

    // 监听游戏结束
    const BattleEndedEventFilter = contract.filters.BattleEnded();
    AddNewEvent(BattleEndedEventFilter, provider, ({ args }) => {
        console.log('Battle ended!', args, walletAddress);

        if (walletAddress.toLowerCase() === args.winner.toLowerCase()) {
            setShowAlert({
                status: true,
                type: "success",
                message: "You won the battle!"
            })
        }else if (walletAddress.toLowerCase() === args.loser.toLowerCase()) {
            setShowAlert({
                status: true,
                type: "failure",
                message: "You lost the battle!"
            })
        }

        navigate("/createBattle")
    });
}

