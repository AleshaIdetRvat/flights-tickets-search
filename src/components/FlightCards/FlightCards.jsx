import React from "react"
import { prettyDateAndTime } from "../../utils/dateFormater"
import "./FlightCards.scss"

const CardLeg = (props) => {
    const {
        airline,
        arrivalAirport,
        arrivalCity,
        arrivalDate,
        departureAirport,
        departureCity,
        departureDate,
        duration,
        numberOfTransfers,
    } = props

    const minutesToHoursAndMinutes = (minutes) =>
        ((minutes / 60) ^ 0) + " ч " + (minutes % 60) + " мин"

    const endingInTransferWord = (numberOfTransfers) => {
        switch (+numberOfTransfers) {
            case 1:
                return "пересадка"
            case 2:
            case 3:
            case 4:
                return "пересадки"
            default:
                return "пересадок"
        }
    }

    return (
        <div className='flight-card__leg card-leg'>
            <header className='card-leg__header'>
                <div className='card-leg__airport'>
                    <div className='card-leg__airport-name'>
                        {departureCity?.caption}, {departureAirport.caption}
                        <span className='card-leg__airport-short'>
                            {` ${departureAirport.uid}  `}
                        </span>
                    </div>

                    <div className='card-leg__arrow'>→</div>

                    <div className='card-leg__airport-name'>
                        {arrivalCity?.caption}, {arrivalAirport.caption}
                        <span className='card-leg__airport-short'>
                            {" "}
                            ({arrivalAirport.uid})
                        </span>
                    </div>
                </div>
            </header>

            <hr className='card-leg__separator' role='separator' />

            <div className='card-leg__time-info-row'>
                <div className='card-leg__time-block'>
                    <span className='card-leg__time'>
                        {prettyDateAndTime(departureDate).time}
                    </span>
                    <span className='card-leg__date'>
                        {prettyDateAndTime(departureDate).date}
                    </span>{" "}
                </div>

                <div className='card-leg__time-block'>
                    &#128339; {minutesToHoursAndMinutes(duration)}
                </div>

                <div className='card-leg__time-block'>
                    <span className='card-leg__date'>
                        {prettyDateAndTime(arrivalDate).date}
                    </span>{" "}
                    <span className='card-leg__time'>
                        {prettyDateAndTime(arrivalDate).time}
                    </span>
                </div>
            </div>

            <div className='card-leg__transfer-separator'>
                <div className='card-leg__transfer-count'>
                    {numberOfTransfers > 0 &&
                        `${numberOfTransfers} ${endingInTransferWord(
                            numberOfTransfers
                        )}`}
                </div>
            </div>

            <div className='card-leg__airline'>
                Рейс выполняет: {airline.caption}
            </div>
        </div>
    )
}

const Card = (props) => {
    const { legs, carrier, price } = props

    return (
        <li className='cards__item flight-card'>
            <div className='flight-card__container'>
                <header className='flight-card__header'>
                    <div className='flight-card__icon'>{carrier.caption}</div>
                    <div className='flight-card__price'>
                        <h3 className='flight-card__price-title'>
                            {price.amount} ₽
                        </h3>
                        <span className='flight-card__price-bottom'>
                            Стоимость для одного взрослого пассажира
                        </span>
                    </div>
                </header>

                <div className='flight-card__content'>
                    <CardLeg {...legs[0]} />
                    <hr
                        className='flight-card__legs-separator'
                        role='separator'
                    />
                    <CardLeg {...legs[1]} />
                </div>

                <button className='flight-card__select-btn'>ВЫБРАТЬ</button>
            </div>
        </li>
    )
}

const FlightCards = (props) => {
    const { flights, visibleCardsCount, showMore } = props

    return (
        <div className='cards'>
            {flights.length === 0 ? (
                <h2>Not Found</h2>
            ) : (
                <>
                    <ul className='cards__row'>
                        {flights
                            .slice(0, visibleCardsCount)
                            .map((flight, i) => {
                                return <Card {...flight} key={flight.id + i} />
                            })}
                    </ul>
                    {visibleCardsCount < flights.length - 1 && (
                        <button
                            className='cards__show-more-btn'
                            onClick={showMore}
                        >
                            Показать ещё
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export { FlightCards }
