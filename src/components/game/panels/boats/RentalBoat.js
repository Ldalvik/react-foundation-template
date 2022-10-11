import React, { useState, useEffect, useRef } from 'react';
import { getItem, getChance } from '../../config/LootTable';

const FISHING_TIME = 10
const PURCHASE_PRICE = 50
const STORAGE = 8

const TABLE = [
    {
        name: "Carp",
        weight: 100,
        price: 1,
        accumulatedWeight: null
    },
    {
        name: "Cod",
        weight: 100,
        price: 1,
        accumulatedWeight: null
    },
    {
        name: "Sunfish",
        weight: 90,
        price: 2,
        accumulatedWeight: null
    },
    {
        name: "Trout",
        weight: 80,
        price: 3,
        accumulatedWeight: null
    },
    // {
    //     name: "Smallmouth Bass",
    //     weight: 80,
    //     price: 3,
    //     accumulatedWeight: null
    // },
    // {
    //     name: "Largemouth Bass",
    //     weight: 60,
    //     price: 4,
    //     accumulatedWeight: null
    // },
    // {
    //     name: "Catfish",
    //     weight: 50,
    //     price: 5,
    //     accumulatedWeight: null
    // },
]

const RentalBoat = ({ makeToast, saveGame, setSaveGame }) => {
    const [secondsRemaining, setSecondsRemaining] = useState(0)
    const [status, setStatus] = useState("Fish")
    const [onFishingTrip, setOnFishingTrip] = useState(false)
    const [statsEnabled, setStatsEnabled] = useState(false)

    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60
    const twoDigits = (num) => String(num).padStart(2, '0')

    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
                setStatus(
                    `${twoDigits(hoursToDisplay)}:${twoDigits(minutesToDisplay)}:${twoDigits(secondsToDisplay)}`
                )
            } else {
                const fishCaught = Math.round(Math.random() * (saveGame.rentalBoat.upgrades.storage + STORAGE))
                let all = []
                for (var i = 0; i < fishCaught; i++) all.push(getItem(TABLE))
                const totalEarned = (all.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0))

                const bonusCash = Math.ceil(
                    totalEarned * ((saveGame.starterBoat.level + saveGame.starterBoat.upgrades.sellRate) * 0.1))
                const collection = all.map(({ name, price }) => `${name} ($${price})\n`)

                setSaveGame({ ...saveGame, cash: saveGame.cash + (totalEarned + bonusCash) })

                setOnFishingTrip(false)
                setStatus("Fish")
                makeToast(`You caught:\n${(collection != null) ? collection : "Nothing"} and sold it for $${totalEarned} + $${bonusCash} from bonuses.`)

            }
        }, onFishingTrip ? 1000 : null
    )

    function useInterval(callback, delay) {
        const savedCallback = useRef()
        useEffect(() => {
            savedCallback.current = callback
        }, [callback])

        useEffect(() => {
            function tick() {
                savedCallback.current()
            }
            if (delay !== null) {
                let id = setInterval(tick, delay)
                return () => clearInterval(id)
            }
        }, [delay])
    }

    const handleStart = (time) => {
        const secondsToDisplay = time % 60
        const minutesRemaining = (time - secondsToDisplay) / 60
        const minutesToDisplay = minutesRemaining % 60
        const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60
        setStatus(
            `${twoDigits(hoursToDisplay)}:${twoDigits(minutesToDisplay)}:${twoDigits(secondsToDisplay)}`
        )
        setSecondsRemaining(time - 1)
        setOnFishingTrip(true)
    }

    const purchaseBoat = () => {
        setSaveGame({
            ...saveGame,
            ownsRentalBoat: true,
            cash: saveGame.cash - PURCHASE_PRICE
        })
    }

    const canPurchase = saveGame.cash >= PURCHASE_PRICE

    let currentButton =
        <button onClick={purchaseBoat} class="button fish-btn" disabled={!canPurchase}>
            Purchase (${PURCHASE_PRICE})
        </button>

    if (saveGame.ownsRentalBoat) {
        currentButton =
            <button onClick={() => handleStart(FISHING_TIME)} class="button fish-btn" disabled={onFishingTrip}>
                {status}
            </button>
    }

    const statsButtonHandler = () => setStatsEnabled(!statsEnabled)

    const catchableFishData = TABLE.map((item) => {
        const percent = (getChance(TABLE, item.name) * 100).toFixed(1)
        return (
            <li>
                {`${item.name} ($${item.price}): `}
                <span className="green">{`${percent}%`}</span>
            </li>
        )
    })

    let stats
    if (statsEnabled) {
        stats =
            <>
                <div class="boat-stats">Fishing speed: {FISHING_TIME} seconds</div>
                <div class="boat-stats">Storage: {saveGame.rentalBoat.upgrades.storage + STORAGE}</div>
                <div class="boat-stats">Can catch: <ul>{catchableFishData}</ul></div>
                <div class="boat-stats">Sell Rate: {saveGame.rentalBoat.upgrades.sellRate * 0.1}x</div>
                <div class="boat-stats">Level: 1 (0/150xp)</div>
            </>
    }

    return (
        <div className="cell medium-2 large-2">
            <div className="card boat-card">
                <div className="card-section">
                    <div className="text-center">
                        <h5>Rental Boat</h5>
                        <a onClick={statsButtonHandler}>{statsEnabled ? "Hide Stats" : "Show Stats"}</a>
                    </div>
                    <div className="divider" />
                    {stats}
                    {currentButton}
                </div>
            </div>
        </div>
    )

}

export default RentalBoat