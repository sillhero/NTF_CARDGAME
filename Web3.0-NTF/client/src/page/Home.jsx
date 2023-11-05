import React, { useEffect, useState } from "react"
import { PageHOC, CustomInput, CustomButton } from "../components"
import { useGlobalContext } from "../context"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const { contract, walletAddress, setShowAlert, gameData, setErrorMessage } =
        useGlobalContext()
    const [playerName, setPlayerName] = useState("")
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            // 验证是否有账户
            console.log("walletAddress:", walletAddress) // 这里的问题是获取不到钱包地址
            const playerExists = await contract.isPlayer(walletAddress)
            console.log("playerExists", playerExists)
            if (!playerExists) {
                await contract.registerPlayer(playerName, playerName, {
                    gasLimit: 200000,
                })
                setShowAlert({
                    status: true,
                    type: "info",
                    message: "Player registered successfully",
                })
            }
        } catch (error) {
            setErrorMessage(error)
        }
    }

    useEffect(() => {
        // 这里是检验用户是否已经注册
        const checkForPlayerToken = async () => {
            const playerExists = await contract.isPlayer(walletAddress)
            const playerTokenExists = await contract.isPlayerToken(
                walletAddress
            )

            console.log({
                playerExists,
                playerTokenExists,
            })

            if (playerExists && playerTokenExists) {
                navigate("/createBattle")
            }
        }

        if (contract) checkForPlayerToken()
    }, [contract])

    useEffect(() => {
        if (gameData.activeBattle) {
            navigate(`/battle/${gameData.activeBattle.name}`)
        }
    }, [gameData])

    return (
        <div className="flex flex-col">
            <h1>{walletAddress}</h1>
            <CustomInput
                label="Name"
                placeholder="Enter your player"
                value={playerName}
                handleValueChange={setPlayerName}
            ></CustomInput>

            <CustomButton
                title="Register"
                handleClick={handleClick}
                restStyles="mt-6"
            ></CustomButton>
        </div>
    )
}

export default PageHOC(
    Home,
    <div>
        Welcome to sepolia Gods <br />a Web3 NFT Card Game
    </div>,
    <div>
        Connect your wallet to start playing <br />
        the ultimate battle-style card game
    </div>
)
