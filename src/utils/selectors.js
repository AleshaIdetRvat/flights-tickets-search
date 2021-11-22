const getFlights = (flightsData) => {
    return flightsData.result.flights.map(({ flight, flightToken }) => {
        return { id: flightToken, ...flight }
    })
}

export const getFlightsForCards = (flightsData) => {
    const flights = getFlights(flightsData)
    console.log("flights", flights)

    return flights.map(({ carrier, legs, price, id }, i) => {
        const { total } = price

        const filteredLegs = legs.map(({ duration, segments }) => {
            const startSegment = segments[0]

            let correctAirline =
                startSegment.operatingAirline || startSegment.airline

            if (segments.length > 1) {
                const endSegment = segments[segments.length - 1]

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
            airline: filteredLegs[0].airline,
            carrier,
            legs: filteredLegs,
            price: { ...total },
            id,
        }
    })
}

export const getSortedFlights = (flightsForCards, sortType) => {
    // 1 - sort by price ascending
    // 2 - sort descending price
    // 3 - sort by duration
    let sortFunction

    switch (+sortType) {
        case 1:
            sortFunction = (a, b) => +a.price.amount - +b.price.amount

            break
        case 2:
            sortFunction = (a, b) => +b.price.amount - +a.price.amount

            break
        case 3:
            sortFunction = (a, b) => +b.price.amount - +a.price.amount

            break

        default:
            return flightsForCards
    }

    return flightsForCards.sort(sortFunction)
}

export const getAirlinesNamesAndPrice = (flightsForCards) => {
    const flights = flightsForCards.map(({ airline, price }) => ({
        name: airline.caption,
        price: +price.amount,
    }))

    const airlinesNames = flightsForCards.map(({ airline }) => airline.caption)

    const uniqueAirlinesNames = [...new Set(airlinesNames)]

    return uniqueAirlinesNames.map((uniqueName) => {
        const oneNameAirlines = flights.filter(
            ({ name }) => name === uniqueName
        )

        return oneNameAirlines.sort((a, b) => a.price - b.price)[0]
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
