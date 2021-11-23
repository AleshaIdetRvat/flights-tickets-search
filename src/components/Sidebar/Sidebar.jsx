import React from "react"
import "./Sidebar.scss"

const SortOptions = (props) => {
    const { onChange } = props

    return (
        <article className='sidebar__options-block cards-sort'>
            <h2 className='cards-sort__title'>Сортировать</h2>

            <form className='cards-sort__options' onChange={onChange}>
                <label>
                    <input
                        className='cards-sort__option-item'
                        type='radio'
                        value='1'
                        name='sort'
                    />{" "}
                    - по возрастанию цены
                </label>

                <label>
                    <input
                        className='cards-sort__option-item'
                        type='radio'
                        value='2'
                        name='sort'
                    />{" "}
                    - по убыванию цены
                </label>

                <label>
                    <input
                        className='cards-sort__option-item'
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
    const { onChange } = props

    return (
        <article className='sidebar__options-block cards-filter'>
            <h2 className='cards-filter__title'>Фильтровать</h2>

            <form className='cards-filter__options' onChange={onChange}>
                <label>
                    <input
                        className='cards-filter__option-item'
                        type='checkbox'
                        value='oneTransfer'
                    />{" "}
                    - 1 пересадка
                </label>

                <label>
                    <input
                        className='cards-filter__option-item'
                        type='checkbox'
                        value='zeroTransfer'
                    />{" "}
                    - без пересадок
                </label>
            </form>
        </article>
    )
}

const PriceOptions = (props) => {
    const { onChange } = props

    return (
        <article
            onChange={onChange}
            className='sidebar__options-block cards-price'
        >
            <h2 className='cards-price__title'>Цена</h2>

            <form
                className='cards-price__options'
                onChange={(event) =>
                    console.log(`event.target.value`, event.target.value)
                }
            >
                <label>
                    От{" "}
                    <input
                        className='cards-price__option-item'
                        type='number'
                        name='from'
                        placeholder='руб.'
                    />
                </label>

                <label>
                    До{" "}
                    <input
                        className='cards-price__option-item'
                        type='number'
                        name='to'
                        placeholder='руб.'
                    />
                </label>
            </form>
        </article>
    )
}

const AirlineOptions = (props) => {
    const { airlinesNamesAndPrices } = props

    return (
        <article className='sidebar__options-block cards-airlines'>
            <h2 className='cards-airlines__title'>Авиакомпании</h2>

            <form
                className='cards-airlines__options'
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
                        <label
                            className='cards-airlines__option-item'
                            key={name}
                        >
                            <input type='checkbox' value={name} />{" "}
                            <div className='cards-airlines__name'>- {name}</div>
                            <span>от {price} р.</span>
                        </label>
                    )
                })}
            </form>
        </article>
    )
}

const Sidebar = (props) => {
    const { airlineOptions, filterParams, setFilterParams } = props

    const onChangeSortOptions = ({ target }) => {
        console.log(target.value)
        setFilterParams({ ...filterParams, sortType: +target.value })
    }

    const onChangeFilterOptions = ({ target }) => {
        const { checked, value } = target

        setFilterParams({
            ...filterParams,
            transferAmount: {
                ...filterParams.transferAmount,
                [value]: checked,
            },
        })
    }
    const onChangePriceOptions = ({ target }) => {
        const { name, value } = target

        setFilterParams({
            ...filterParams,
            price: {
                ...filterParams.price,
                [name]: +value,
            },
        })
    }

    return (
        <div className='sidebar'>
            <div className='sidebar__container'>
                <SortOptions onChange={onChangeSortOptions} />
                <FilterOptions onChange={onChangeFilterOptions} />
                <PriceOptions onChange={onChangePriceOptions} />
                <AirlineOptions airlinesNamesAndPrices={airlineOptions} />
            </div>
        </div>
    )
}

export { Sidebar }
