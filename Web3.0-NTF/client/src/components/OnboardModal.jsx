import { useState, useEffect } from "react"
import Modal from "react-modal"

import styles from "../styles"
import { CustomButton } from "."
import { useGlobalContext } from "../context"
import { GetParams, SwitchNetwork } from "../utils/onboard.js"

const OnboardModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const { updateCurrentWalletAddress } = useGlobalContext()
    const [step, setStep] = useState(-1)

    async function resetParams() {
        const currentStep = await GetParams()
        console.log("nativeCurrency", currentStep)
        setStep(currentStep.step)
        setIsOpen(currentStep.step !== -1)
    }

    useEffect(() => {
        resetParams()

        window?.ethereum?.on("chainChanged", () => {
            resetParams()
        })

        window?.ethereum?.on("accountsChanged", () => {
            resetParams()
        })
    }, [])

    const generateStep = (st) => {
        switch (st) {
            case 0:
                return (
                    <>
                        <p className={styles.modalText}>
                            You don't have MetaMask Wallet installed!
                        </p>
                        <CustomButton
                            title="Download MetaMask"
                            handleClick={() =>
                                window.open("https://metamask.io/", "_blank")
                            }
                            //  window.open 这个函数的作用是打开一个新的窗口 参数1：url 参数2：窗口的名字
                            // 这里的_blank是指的是打开一个新的窗口
                        />
                    </>
                )

            case 1:
                return (
                    <>
                        <p className={styles.modalText}>
                            You haven't connected your account to MetaMask
                            Wallet!
                        </p>
                        <CustomButton
                            title="Connect Account"
                            handleClick={updateCurrentWalletAddress}
                        />
                    </>
                )

            case 2:
                return (
                    <>
                        <p className={styles.modalText}>
                            You're on a different network. Switch to Sepolia
                            C-Chain.
                        </p>
                        <CustomButton
                            title="Switch"
                            handleClick={SwitchNetwork}
                        />
                    </>
                )

            case 3:
                return (
                    <>
                        <p className={styles.modalText}>
                            Oops, you don't have Sepolia tokens in your account
                        </p>
                        <CustomButton
                            title="Grab some test tokens"
                            handleClick={() =>
                                window.open(
                                    "https://sepoliafaucet.com/",
                                    "_blank"
                                )
                            }
                        />
                    </>
                )

            default:
                return <p className={styles.modalText}>Good to go!</p>
        }
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
            overlayClassName="Overlay"
        >
            {generateStep(step)}
        </Modal>
    )
}

export default OnboardModal
