import React, { useState } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { FlightCards } from "./components/FlightCards/FlightCards"
import { getFlightsForCards } from "./utils/selectors"
import "./App.css"

function App({ flightsData }) {
    // console.log("all flights", getFlightsForCards(flightsData).slice(0, 5))
    // const [flights, setFlights] = useState(getFlightsForCards(flightsData))
    const flights = getFlightsForCards(flightsData)
    return (
        <main className='app'>
            <div className='app__container'>
                <aside className='app__sidebar'>
                    <Sidebar />
                </aside>
                <div className='app__cards'>
                    <FlightCards flights={flights} />
                </div>
            </div>
        </main>
    )
}

export default App
