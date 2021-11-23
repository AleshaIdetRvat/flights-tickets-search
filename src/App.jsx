import React, { useState } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { FlightCards } from "./components/FlightCards/FlightCards"
import {
    getFlightsForCards,
    getSortedFlights,
    getAirlinesNamesAndPrice,
    filterByTransferAmount,
    filterByPriceFromTo,
} from "./utils/selectors"
import "./App.css"

function App({ flightsData }) {
    const [flights, setFlights] = useState(getFlightsForCards(flightsData))
    const [filteredFlights, setFilteredFlights] = useState(flights)
    console.log(`filteredFlights`, filteredFlights.length)

    const [visibleCardsCount, setVisibleCardsCount] = useState(2)

    const [filterParams, setFilterParams] = React.useState({
        sortType: -1,
        transferAmount: {
            zeroTransfer: false,
            oneTransfer: false,
        },
        price: {
            from: -1,
            to: -1,
        },
    })

    console.log(`filterParams`, filterParams)

    const onChangeSidebar = () => {
        const { sortType, transferAmount, price } = filterParams

        console.log(filterParams)

        const sortedFl = getSortedFlights(flights, sortType)

        let filteredFromTo = sortedFl

        if (sortType === 1) {
            filteredFromTo = filterByPriceFromTo(sortedFl, price.from, price.to)
        } else if (sortType === 2) {
            filteredFromTo = filterByPriceFromTo(sortedFl, price.to, price.from)
        }

        const filteredFl = filterByTransferAmount(
            filteredFromTo,
            transferAmount
        )

        setFilteredFlights(filteredFl)
    }

    React.useEffect(() => {
        onChangeSidebar()
    }, [filterParams])

    const airlineOptions = React.useMemo(
        () => getAirlinesNamesAndPrice(flights),
        [flightsData]
    )

    return (
        <main className='app'>
            <div className='app__container'>
                <aside className='app__sidebar'>
                    <Sidebar
                        filterParams={filterParams}
                        setFilterParams={setFilterParams}
                        airlineOptions={airlineOptions}
                        onChangeSidebar={onChangeSidebar}
                    />
                </aside>

                <div className='app__cards'>
                    <FlightCards
                        flights={filteredFlights}
                        visibleCardsCount={visibleCardsCount}
                        showMore={() =>
                            setVisibleCardsCount(visibleCardsCount + 2)
                        }
                    />
                </div>
            </div>
        </main>
    )
}

export default App
