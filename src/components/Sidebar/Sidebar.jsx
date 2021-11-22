import React from "react"
import { getAirlinesNamesAndPrice } from "../../utils/selectors"
import "./Sidebar.scss"

const SortOptions = (props) => {
    const {} = props

    return (
        <article class='sidebar__options-block cards-sort'>
            <h2 class='cards-sort__title'>Сортировать</h2>

            <form
                class='cards-sort__options'
                onChange={(event) =>
                    console.log(`event.target.value`, event.target.value)
                }
            >
                <label>
                    <input
                        class='cards-sort__option-item'
                        type='radio'
                        value='1'
                        name='sort'
                    />{" "}
                    - по возрастанию цены
                </label>

                <label>
                    <input
                        class='cards-sort__option-item'
                        type='radio'
                        value='2'
                        name='sort'
                    />{" "}
                    - по убыванию цены
                </label>

                <label>
                    <input
                        class='cards-sort__option-item'
                        type='radio'
                        value='3'
                        name='sort'
                    />{" "}
                    - по времени в пути
                </label>
            </form>
        </article>
    )
}

const FilterOptions = (props) => {
    const {} = props

    return (
        <article class='sidebar__options-block cards-filter'>
            <h2 class='cards-filter__title'>Фильтровать</h2>

            <form
                class='cards-filter__options'
                onChange={(event) =>
                    console.log(`event.target.value`, event.target.value)
                }
            >
                <label>
                    <input
                        class='cards-filter__option-item'
                        type='checkbox'
                        value='1'
                    />{" "}
                    - 1 пересадка
                </label>

                <label>
                    <input
                        class='cards-filter__option-item'
                        type='checkbox'
                        value='2'
                    />{" "}
                    - без пересадок
                </label>
            </form>
        </article>
    )
}

const PriceOptions = (props) => {
    const {} = props

    return (
        <article class='sidebar__options-block cards-price'>
            <h2 class='cards-price__title'>Цена</h2>

            <form
                class='cards-price__options'
                onChange={(event) =>
                    console.log(`event.target.value`, event.target.value)
                }
            >
                <label>
                    От{" "}
                    <input
                        class='cards-price__option-item'
                        type='text'
                        placeholder='руб.'
                        // value='1'
                    />
                </label>

                <label>
                    До{" "}
                    <input
                        class='cards-price__option-item'
                        type='text'
                        placeholder='руб.'
                        // value='2'
                    />
                </label>
            </form>
        </article>
    )
}

const AirlineOptions = (props) => {
    const { airlinesNamesAndPrices } = props

    const tempAirlines = ["LOT Polish", "Аэрофлот"]

    return (
        <article class='sidebar__options-block cards-airlines'>
            <h2 class='cards-airlines__title'>Авиакомпании</h2>

            <form
                class='cards-airlines__options'
                onChange={(event) =>
                    console.log(
                        `event.target.value`,
                        event.target.value,
                        event.target.checked
                    )
                }
            >
                {airlinesNamesAndPrices.map(({ name, price }) => {
                    return (
                        <label class='cards-airlines__option-item'>
                            <input type='checkbox' value={name} />{" "}
                            <div class='cards-airlines__name'>- {name}</div>
                            <span>от {price} р.</span>
                        </label>
                    )
                })}
            </form>
        </article>
    )
}

const Sidebar = (props) => {
    const { flights } = props

    return (
        <div class='sidebar'>
            <div class='sidebar__container'>
                <SortOptions />
                <FilterOptions />
                <PriceOptions />
                <AirlineOptions
                    airlinesNamesAndPrices={getAirlinesNamesAndPrice(flights)}
                />
            </div>
        </div>
    )
}

export { Sidebar }
