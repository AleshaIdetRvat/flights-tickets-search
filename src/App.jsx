import React, { useState } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { FlightCards } from "./components/FlightCards/FlightCards"
import { getFlightsForCards, getSortedFlights } from "./utils/selectors"
import "./App.css"

function App({ flightsData }) {
    const [flights, setFlights] = useState(getFlightsForCards(flightsData))

    console.log(`getSortedFlights`, getSortedFlights(flights.slice(0, 20)))

    return (
        <main className='app'>
            <div className='app__container'>
                <aside className='app__sidebar'>
                    <Sidebar flights={flights.slice(0, 20)} />
                </aside>

                <div className='app__cards'>
                    <FlightCards flights={flights.slice(0, 20)} />
                </div>
            </div>
        </main>
    )
}

export default App
