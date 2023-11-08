import React from "react"

import styles from "../styles"

const ActionButton = ({ imgUrl, handleClick, restStyles, action }) => {
    return (
        <div
            className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restStyles}`}
            onClick={handleClick}
        >
            <img
                src={imgUrl}
                alt="action_img"
                className={styles.gameMoveIcon}
                // 悬停显示信息
                title={action === "attack" ? "Attack" : "Defense"}
            />
        </div>
    )
}

export default ActionButton
