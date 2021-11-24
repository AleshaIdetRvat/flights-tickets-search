import React, { useState } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { FlightCards } from "./components/FlightCards/FlightCards"
import {
    getFlightsForCards,
    getSortedFlights,
    getAirlinesNamesAndPrice,
    filterByTransferAmount,
    filterByPriceFromTo,
    filterByAirlines,
} from "./utils/selectors"
import "./App.css"

function App({ flightsData }) {
    const [flights, setFlights] = useState(getFlightsForCards(flightsData))
    const [filteredFlights, setFilteredFlights] = useState(flights)

    const [visibleCardsCount, setVisibleCardsCount] = useState(2)

    const [filterParams, setFilterParams] = React.useState({
        sortType: -1,
        transferAmount: {
            zeroTransfer: false,
            oneTransfer: false,
        },
        price: {
            from: "",
            to: "",
        },
        airlines: [],
    })

    console.log(`filterParams`, filterParams)

    const onChangeSidebar = () => {
        const { sortType, transferAmount, price, airlines } = filterParams

        console.log(filterParams)

        let sortedFl = getSortedFlights(flights, sortType)

        let filteredFromTo = sortedFl

        if (price.from !== "" || price.to !== "") {
            switch (sortType) {
                case 2:
                    filteredFromTo = filterByPriceFromTo(
                        sortedFl,
                        price.to,
                        price.from
                    )
                    break

                case 3:
                    filteredFromTo = filterByPriceFromTo(
                        sortedFl,
                        price.from,
                        price.to
                    )
                    break

                default:
                    sortedFl = getSortedFlights(flights, 1)

                    filteredFromTo = filterByPriceFromTo(
                        sortedFl,
                        price.from,
                        price.to
                    )
                    break
            }
        }

        const filteredFl = filterByTransferAmount(
            filteredFromTo,
            transferAmount
        )

        const filteredByAirline = filterByAirlines(filteredFl, airlines)
        console.log(`filteredByAirline`, filteredByAirline)
        setFilteredFlights(filteredByAirline)
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
