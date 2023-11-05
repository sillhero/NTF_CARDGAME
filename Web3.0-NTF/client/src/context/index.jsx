// 这里主要是和智能合约进行交互
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import { ABI, ADDRESS } from "../contract"
import { logo } from "../assets"
import Web3Modal from "web3modal"
import { createEventListeners } from "./createEventListeners"

import { GetParams } from "../utils/onboard"

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    // 这里将和智能合约进行交互
    const [walletAddress, setWalletAddress] = useState("")
    const [provider, setProvider] = useState(null)
    const [contract, setContract] = useState(null)
    const [battleName, setBattleName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [gameData, setGameData] = useState({
        players: [],
        pendingBattles: [],
        activeBattle: null,
    })
    const [showAlert, setShowAlert] = useState({
        status: false,
        type: "info",
        message: "",
    })
    const [updateGameData, setUpdateGameData] = useState(0)
    // 战斗背景
    const [battleGround, setBattleGround] = useState("bg-astral") // 这里设置就是为了让静态的背景图片可以动态变化
    const [step, setStep] = useState(1) // 这里的步骤是用来控制模态框的显示的

    const player1Ref = useRef()
    const player2Ref = useRef()

    const navigate = useNavigate()

    //* Set the wallet address to the state
    // 这里的调用是有一些问题的
    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        if (accounts) setWalletAddress(accounts[0])
    }

    // 重置 web3的模态框
    useEffect(() => {
        const resetParms = async () => {
            const currentStep = await GetParams()
            setStep(currentStep)
        }

        resetParms()

        window?.ethereum?.on("chainChanged", () => resetParms())
        window?.ethereum?.on("accountsChanged", () => resetParms())
    }, [])

    // 确保背景图片已经存储在本地
    useEffect(() => {
        const BattlegroundFromLocalStorage =
            localStorage.getItem("battleground")

        if (BattlegroundFromLocalStorage) {
            setBattleGround(BattlegroundFromLocalStorage)
        } else {
            localStorage.setItem("battleground", battleGround)
        }
    }, [])

    // 用户变更的监听
    useEffect(() => {
        updateCurrentWalletAddress()
        window.ethereum.on("accountsChanged", updateCurrentWalletAddress, []) // 监听账户变化
    }, [])

    // set the smart contract the provider to the state
    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3modal = new Web3Modal()
            const connection = await web3modal.connect()
            const newProvider = new ethers.providers.Web3Provider(connection)
            const signer = newProvider.getSigner()
            const newContract = new ethers.Contract(ADDRESS, ABI, signer)
            setProvider(newProvider)
            setContract(newContract)
        }
        setSmartContractAndProvider()
    }, [])

    // 事件绑定的问题（监听）
    useEffect(() => {
        if (step !== -1 && contract) {
            createEventListeners({
                navigate,
                contract,
                provider,
                walletAddress,
                setShowAlert,
                setUpdateGameData,
                player1Ref,
                player2Ref,
            })
        }
    }, [contract, step])

    // 提示栏触发器
    useEffect(() => {
        if (showAlert?.status) {
            const timer = setTimeout(() => {
                setShowAlert({
                    status: false,
                    type: "info",
                    message: "",
                })
            }, [5000])
            return () => clearTimeout(timer)
        }
    }, [showAlert])

    // 处理错误信息
    useEffect(() => {
        if (errorMessage) {
            const parsedErrorMessage = errorMessage?.reason
                ?.slice("execution reverted: ".length)
                .slice(0, -1)

            if (parsedErrorMessage) {
                setShowAlert({
                    status: true,
                    type: "failure",
                    message: parsedErrorMessage,
                })
            }
        }
    }, [errorMessage])

    // 将游戏相关数据初始化
    useEffect(() => {
        const fetchGameData = async () => {
            const fetchedBattles = await contract.getAllBattles()
            console.log(fetchedBattles)
            const pendingBattles = fetchedBattles.filter(
                (battle) => battle.battleStatus === 0
            )
            let activeBattle = null

            fetchedBattles.forEach((battle) => {
                console.log(battle.players)
                if (
                    battle.players.find(
                        (player) =>
                            player.toLowerCase() === walletAddress.toLowerCase()
                    )
                ) {
                    console.log("battle", battle)
                    if (battle.winner.startsWith("0x00")) {
                        activeBattle = battle
                    }
                }
            })
            console.log("activeBattle", activeBattle)
            setGameData({
                pendingBattles: pendingBattles.slice(1),
                activeBattle,
            })
        }
        if (contract) fetchGameData()
    }, [contract, updateGameData])

    return (
        <GlobalContext.Provider
            value={{
                contract,
                walletAddress,
                showAlert,
                setShowAlert,
                battleName,
                setBattleName,
                gameData,
                updateGameData,
                battleGround,
                setBattleGround,
                player1Ref,
                player2Ref,
                errorMessage,
                setErrorMessage,
                updateCurrentWalletAddress,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
