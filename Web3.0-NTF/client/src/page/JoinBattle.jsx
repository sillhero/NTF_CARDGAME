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
            await contract.joinBattle(battleName)
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
            <h2 className={styles.joinHeadText}>Available Battles</h2>

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
                <p className={styles.joinLoading}>
                    Reload the page to see new battles
                </p>
            )}
            <p
                className={styles.infoText}
                onClick={() => {
                    navigate("/createBattle")
                }}
            >
                Or create a new Battle
            </p>
        </div>
    )
}
export default PageHOC(
    JoinBattle,
    <div>
        Join <br /> a Battle
    </div>,
    <div>Join an existing battle and start playing</div>
)
