import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context"
import { CustomButton, PageHOC } from "../components"
import styles from "../styles"

const JoinBattle = () => {
    const {
        contract,
        walletAddress,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        gameData,
        setErrorMessage,
    } = useGlobalContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (gameData?.activeBattle?.battleStatus === 1) {
            console.log("gameData", gameData.activeBattle.battleStatus)
            navigate(`/battle/${gameData.activeBattle.name}`)
        }
    }, [gameData])

    // // 当玩家已有战斗时，做处理 无法加入其他战斗
    // useEffect(() => {
    //     if (gameData?.activeBattle?.battleStatus === 0) {
    //         navigate(`/battle/${gameData.activeBattle.name}`)
    //     }
    // }, [gameData])

    const handleClick = async (battleName) => {
        console.log("battleName", battleName)
        setBattleName(battleName)
        try {
            let result = await contract.joinBattle(battleName)
            console.log("result", result)
            setShowAlert({
                status: true,
                type: "success",
                message: `Joining ${battleName} battle`,
            })
        } catch (error) {
            setErrorMessage(error)
        }
    }
    return (
        <div>
            <h2 className={styles.joinHeadText}>可加入战局</h2>

            {gameData.pendingBattles.length ? (
                gameData.pendingBattles
                    .filter(
                        (battle) =>
                            !battle.players.includes(walletAddress) &&
                            battle.battleStatus !== 1
                    )
                    .map((battle, index) => (
                        <div
                            key={battle.name + index}
                            className={styles.flexBetween}
                        >
                            <p className={styles.joinBattleTitle}>
                                {index + 1}. {battle.name}
                            </p>
                            <CustomButton
                                title="Join"
                                handleClick={() => handleClick(battle.name)}
                            />
                        </div>
                    ))
            ) : (
                <p className={styles.joinLoading}>刷新页面查看新的战局</p>
            )}
            <p
                className={styles.infoText}
                onClick={() => {
                    navigate("/createBattle")
                }}
            >
                或者创建一场新的战局
            </p>
        </div>
    )
}
export default PageHOC(
    JoinBattle,
    <div>
        加入 <br /> 一场战局
    </div>,
    <div>加入一场已经存在的战局</div>
)
