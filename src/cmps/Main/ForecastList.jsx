import { ForecastCard } from "./ForecastCard"


export const ForecastList = (props) => {
    const { forecasts, degreesType } = props

    return (
        <section className="forecast-list-container">
            <div className="forecast-list-wrapper">
                {forecasts.weekly.map((forecast, idx) => <ForecastCard key={idx}
                    forecast={forecast} degreesType={degreesType} />)}
            </div>
        </section>
    )
}