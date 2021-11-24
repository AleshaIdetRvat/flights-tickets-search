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
        console.log(`sortedFl 1`, sortedFl)
        let filteredFromTo = sortedFl

        if (
            price.from !== "" ||
            price.to !== "" ||
            price.from !== 0 ||
            price.to !== 0
        ) {
            switch (sortType) {
                case 2:
                    filteredFromTo = filterByPriceFromTo(
                        sortedFl.reverse(),
                        price.from,
                        price.to
                    ).reverse()
                    console.log("filteredFromTo in switch", filteredFromTo)
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

        console.log(`sortedFl 2`, filteredFromTo)

        const filteredFl = filterByTransferAmount(
            filteredFromTo,
            transferAmount
        )

        console.log(`sortedFl 3`, filteredFl)

        const filteredByAirline = filterByAirlines(filteredFl, airlines)

        console.log(`sortedFl 4`, filteredByAirline)

        setFilteredFlights(filteredByAirline)

        // console.log(`filteredFlights`, filteredFlights)
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
