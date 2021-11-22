import React, { useState } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { FlightCards } from "./components/FlightCards/FlightCards"
import {
    getFlightsForCards,
    getSortedFlights,
    getAirlinesNamesAndPrice,
} from "./utils/selectors"
import "./App.css"

function App({ flightsData }) {
    const [flights, setFlights] = useState(getFlightsForCards(flightsData))

    const [visibleCardsCount, setVisibleCardsCount] = useState(2)

    const showMore = () => setVisibleCardsCount(visibleCardsCount + 2)

    // React.useEffect(() => {}, [])
    // console.log(`getSortedFlights`, getSortedFlights(flights.slice(0, 20), 3))

    const onSortFlights = (e) => {
        const sortType = +e.target.value

        console.log(sortType)

        const sortedFl = getSortedFlights(flights, sortType)
        console.log(`sortedFl`, sortedFl)
        setFlights(sortedFl)
    }

    window.setFlights = setFlights

    const airlineOptions = React.useMemo(
        () => getAirlinesNamesAndPrice(flights),
        [flightsData]
    )

    return (
        <main className='app'>
            <div className='app__container'>
                <aside className='app__sidebar'>
                    <Sidebar
                        airlineOptions={[]}
                        airlineOptions={airlineOptions}
                        onSortFlights={onSortFlights}
                    />
                </aside>

                <div className='app__cards'>
                    <FlightCards
                        flights={flights}
                        visibleCardsCount={visibleCardsCount}
                        showMore={showMore}
                    />
                </div>
            </div>
        </main>
    )
}

export default App
