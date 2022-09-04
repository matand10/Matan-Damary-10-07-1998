import { ForecastHeader } from "./ForecastHeader"
import { Search } from "./Search"
import { ForecastList } from "./ForecastList"


export const Forecast = (props) => {
    const { forecasts, degreesType, onSearch, onFavorite, favorite, loading, onRemoveFavorite, theme } = props

    return (
        <section className="forecast-container">
            <ForecastHeader forecasts={forecasts} degreesType={degreesType} onRemoveFavorite={onRemoveFavorite}
                onFavorite={onFavorite} favorite={favorite} theme={theme} />
            <Search cb={onSearch} theme={theme} />
            <ForecastList forecasts={forecasts} degreesType={degreesType} loading={loading} />
        </section>
    )
}