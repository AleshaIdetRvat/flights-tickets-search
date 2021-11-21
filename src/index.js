import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { flightsData } from "./flightsData/flights"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <App flightsData={flightsData} />
    </React.StrictMode>,
    document.getElementById("root")
)
