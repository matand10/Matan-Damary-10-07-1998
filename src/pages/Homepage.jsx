import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"


import { Forecast } from "../cmps/Main/Forecast"
import { getForecasts, loadFavorites, loadForecasts, removeForecast, saveForecast } from "../store/forecast/forecast.action"
import skeleton from '../assets/lottie/loading/skeleton.json'


import { forecastService } from "../services/forecast.service"
import { lottieService } from "../services/lottie.service"
import { msgService } from "../services/notify.service"


export const Homepage = () => {
    const dispatch = useDispatch()
    const { forecasts, degreesType, favorite, theme } = useSelector((state) => state.forecastModule)
    const loader = useRef(null)

    useEffect(() => {
        loadForecastWithGeolocation()
        const instance = lottieService.loadLottie(loader, skeleton)

        return () => instance.destroy()
    }, [])

    const loadForecastWithGeolocation = () => {
        navigator.geolocation.getCurrentPosition(async (positions) => {
            const coords = `${positions.coords.latitude},${positions.coords.longitude}`
            const res = await forecastService.getByGeolocation(coords)
            const location = {
                locationKey: res.Key,
                name: res.EnglishName,
            }
            if (!forecasts) {
                dispatch(loadForecasts(location))
                dispatch(loadFavorites())
            }
        })
    }

    const onSearch = async (place) => {
        const location = await forecastService.cityQuery(place)
        if (!location) return msgService.notify('No location found', theme)
        dispatch(getForecasts(location))
    }

    const onFavorite = () => {
        const newForecast = forecastService.createFavorite(forecasts)
        dispatch(saveForecast(newForecast))
    }

    const onRemoveFavorite = (forecast) => {
        dispatch(removeForecast(forecast._id))
    }


    if (!forecasts) return (
        <div className="homepage-container">
            <div className="loader-container" ref={loader}></div>
        </div>
    )

    return <section className="homepage-container">
        <Forecast forecasts={forecasts} onFavorite={onFavorite} onRemoveFavorite={onRemoveFavorite}
            degreesType={degreesType} onSearch={onSearch} favorite={favorite} theme={theme} />
    </section>

}