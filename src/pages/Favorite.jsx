import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";


import { loadFavorites, removeForecast, setForecast } from "../store/forecast/forecast.action";
import { lottieService } from "../services/lottie.service";
import { msgService } from "../services/notify.service";


import { ForecastCard } from "../cmps/Main/ForecastCard";
import NoData from '../assets/lottie/loading/nodata.json'


export const Favorite = () => {
    const { favorite, degreesType, theme } = useSelector((state) => state.forecastModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loader = useRef(null)

    useEffect(() => {
        const instance = lottieService.loadLottie(loader, NoData)
        dispatch(loadFavorites())
        return () => instance.destroy()
    }, [])

    const onFavorite = async (forecast) => {
        dispatch(setForecast(forecast))
    }

    const showFavorite = async (forecast) => {
        await onFavorite(forecast)
        navigate('/')
    }

    const onRemove = (forecast) => {
        dispatch(removeForecast(forecast._id))
        msgService.notify('Removed successfully', theme)
    }

    if (!favorite.length) return (
        <div className="homepage-container">
            <div className="nodata-container" ref={loader}></div>
        </div>
    )
    return (
        <section className="favorite-container">
            <div className="forecast-container">
                {favorite.map(forecast => <ForecastCard key={forecast._id} forecast={forecast.daily} details={forecast}
                    cb={showFavorite} degreesType={degreesType} onRemove={onRemove} />)}
            </div>
        </section>
    )
}