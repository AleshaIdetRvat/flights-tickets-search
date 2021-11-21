const getFlights = (flightsData) => {
    return flightsData.result.flights.map(({ flight, flightToken }) => {
        return { id: flightToken, ...flight }
    })
}

export const getFlightsForCards = (flightsData) => {
    const flights = getFlights(flightsData)

    return flights.map(({ carrier, legs, price, id }, i) => {
        const { total } = price

        const filteredLegs = legs.map(({ duration, segments }) => {
            const startSegment = segments[0]

            let correctAirline =
                startSegment.operatingAirline || startSegment.airline

            // if (typeof correctAirline !== "string") {
            //     correctAirline = correctAirline.caption
            // }

            if (segments.length > 1) {
                const endSegment = segments[segments.length - 1]

                if (i === 114) {
                    console.log("startSegment", startSegment)
                    console.log("endSegment", endSegment)
                }

                return {
                    numberOfTransfers: segments.length - 1,
                    duration,

                    airline: correctAirline,

                    departureAirport: startSegment.departureAirport,
                    departureCity: startSegment.departureCity,
                    departureDate: startSegment.departureDate,

                    arrivalAirport: endSegment.arrivalAirport,
                    arrivalCity: endSegment.arrivalCity,
                    arrivalDate: endSegment.arrivalDate,
                }
            }

            return {
                numberOfTransfers: 0,
                duration,

                airline: correctAirline,

                arrivalAirport: startSegment.arrivalAirport,
                arrivalCity: startSegment.arrivalCity,
                arrivalDate: startSegment.arrivalDate,

                departureAirport: startSegment.departureAirport,
                departureCity: startSegment.departureCity,
                departureDate: startSegment.departureDate,
            }
        })

        return {
            carrier,
            legs: filteredLegs,
            price: { ...total },
            id,
        }
    })
}

/*
 segment Object properties: 
    aircraft,
    airline,
    arrivalAirport,
    arrivalCity,
    arrivalDate,
    classOfService,
    classOfServiceCode,
    departureAirport,
    departureCity,
    departureDate,
    flightNumber,
    servicesDetails,
    starting,
    stops,
    techStopInfos,
    travelDuration,
*/

/* flight Object properties:
    carrier,
    exchange,
    international,
    isTripartiteContractDiscountApplied,
    legs,
    price,
    refund,
    seats,
    servicesStatuses,
*/
