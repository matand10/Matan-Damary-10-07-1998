import { useEffect, useState } from 'react'
import { forecastService } from '../../services/forecast.service'
import { FiHeart } from 'react-icons/fi'
import { ForecastInfo } from '../Main/ForecastInfo'
import { msgService } from '../../services/notify.service'


export const ForecastHeader = (props) => {
    const { forecasts, degreesType, onFavorite, favorite, onRemoveFavorite, theme } = props
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        checkFavorite()
    }, [favorite, forecasts])

    const checkFavorite = () => {
        const res = forecastService.getFavoriteId(favorite, forecasts)
        if (res) setIsFavorite(true)
        else setIsFavorite(false)
    }

    const handleFavorite = () => {
        const res = forecastService.getFavoriteId(favorite, forecasts)
        if (res) {
            onRemoveFavorite(res)
            return msgService.notify('Removed from favorites', theme)
        } else {
            onFavorite()
            return msgService.notify('Added to favorites', theme)
        }
    }


    return (
        <section className="forecast-header-container">
            <ForecastInfo degreesType={degreesType} forecasts={forecasts} />

            <div className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleFavorite} title="Add to favorites">
                <button><FiHeart /></button>
            </div>
        </section>
    )
}