import React, { useState, useEffect } from "react"
import { CustomButton, CustomInput, PageHOC, GameLoad } from "../components"

import styles from "../styles"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context"

const CreateBattle = () => {
    const { contract, battleName, setBattleName, gameData } = useGlobalContext()
    const navigate = useNavigate()
    const [waitBattle, setWaitBattle] = useState(false) // 等待用户加入的标志

    useEffect(() => {
        if (gameData?.activeBattle?.battleStatus === 1) {
            navigate(`/battle/${gameData.activeBattle.name}`)
        }

        if (gameData?.activeBattle?.battleStatus === 0) {
            setWaitBattle(true)
        }
    }, [gameData])

    const handleClick = async () => {
        if (!battleName || !battleName.trim()) {
            alert("Please enter a battle name")
            return null
        }
        try {
            await contract.createBattle(battleName)

            setWaitBattle(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {waitBattle && <GameLoad />}
            <div className="flex flex-col mb-5">
                <CustomInput
                    label="Battle"
                    placeholder="Enter battle name"
                    value={battleName}
                    handleValueChange={setBattleName}
                />
                <CustomButton
                    title="Create Battle"
                    handleClick={handleClick}
                    restStyles="mt-6"
                ></CustomButton>
            </div>
            <p
                className={styles.infoText}
                onClick={() => navigate("/join-battle")}
            >
                或者加入一个已有的房间
            </p>
            <p
                className={styles.infoTextWhite}
                onClick={() => navigate("/join-battle")}
            >
                Or join an existing battle
            </p>
        </>
    )
}

export default PageHOC(
    CreateBattle,
    <div>
        Create <br />a New Battles
    </div>,
    <div>Create your own battle and wait for other players to join you</div>
)
