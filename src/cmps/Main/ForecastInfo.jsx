import { useEffect, useRef } from "react"
import { lottieService } from "../../services/lottie.service"
import { utilService } from "../../services/util.service"


export const ForecastInfo = (props) => {
    const { forecasts, degreesType } = props
    const container = useRef(null)
    const min = forecasts.daily.Temperature.Minimum.Value
    const max = forecasts.daily.Temperature.Maximum.Value

    useEffect(() => {
        const instance = lottieService.loadLottie(container, loadAnimationData())
        return () => instance.destroy()
    }, [forecasts])

    const loadAnimationData = () => {
        return utilService.getRelevantJsonByTemp(
            utilService.avgTemp(min, max, degreesType), degreesType
        );
    }

    return (
        <div className="forecast-location">
            <div className="lottie-header" ref={container}></div>
            <div className="location-details">
                <h1>{forecasts.name}</h1>
                <p className="flex">
                    {utilService.avgTemp(min, max, degreesType)}
                    {utilService.checkDegreesType(degreesType)}</p>
            </div>
        </div>
    )
}