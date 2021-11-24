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
            sortFunction = (a, b) => {
                const aDuration = a.legs.reduce(
                    (prev, curr) => prev.duration + curr.duration
                )
                const bDuration = b.legs.reduce(
                    (prev, curr) => prev.duration + curr.duration
                )

                return aDuration - bDuration
            }

            break

        default:
            return flightsForCards
    }

    const flightsForCardsCopy = [...flightsForCards]

    return flightsForCardsCopy.sort(sortFunction)
}

export const filterByTransferAmount = (flightsForCards, transfersFlags) => {
    const { zeroTransfer, oneTransfer } = transfersFlags

    console.log("zeroTransfer === oneTransfer", zeroTransfer === oneTransfer)

    if (zeroTransfer === oneTransfer) return flightsForCards
    console.log("zeroTransfer === oneTransfer", zeroTransfer === oneTransfer)

    if (zeroTransfer) {
        return flightsForCards.filter((flight) => {
            const [first, second] = flight.legs
            return first.numberOfTransfers + second.numberOfTransfers === 0
        })
    }

    if (oneTransfer) {
        return flightsForCards.filter((flight) => {
            const [first, second] = flight.legs
            return (
                (first.numberOfTransfers === 1 && second.numberOfTransfers) ===
                1
            )
        })
    }
}

export const filterByPriceFromTo = (flightsForCards, priceFrom, priceTo) => {
    let sortedFlights

    for (let i = 0; i < flightsForCards.length; i++) {
        if (priceFrom === "" || priceFrom === 0) {
            sortedFlights = flightsForCards
            break
        }

        const { price } = flightsForCards[i]

        if (priceFrom <= +price.amount) {
            sortedFlights = flightsForCards.slice(i)
            break
        }
    }

    for (let i = 0; i < sortedFlights.length; i++) {
        if (priceTo === "" || priceTo === 0) {
            break
        }

        const { price } = sortedFlights[i]

        if (priceTo <= +price.amount) {
            sortedFlights = sortedFlights.slice(0, i)
            break
        }
    }

    return sortedFlights
}

export const filterByAirlines = (flightsForCards, airlines) => {
    if (airlines.length === 0) return flightsForCards

    return flightsForCards.filter(({ airline }) =>
        airlines.includes(airline.caption)
    )
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
