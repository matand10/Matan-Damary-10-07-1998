import { forecastService } from "../../services/forecast.service"

export function loadForecasts(location) {
    return async dispatch => {
        try {
            const forecasts = await forecastService.query(location)
            dispatch({ type: 'SET_FORECAST', forecasts })
        } catch (err) {
            throw err
        }
    }
}

export function getForecasts(location) {
    return async dispatch => {
        try {
            const forecasts = await forecastService.loadWeather(location)
            dispatch({ type: 'SET_FORECAST', forecasts })
        } catch (err) {
            throw err
        }
    }
}

export function setForecast(forecasts) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_FORECAST', forecasts })
        } catch (err) {
            throw err
        }
    }
}

export function loadFavorites() {
    return async dispatch => {
        try {
            const savedForecasts = await forecastService.loadFavorites()
            dispatch({ type: 'SET_FAVORITE', savedForecasts })
        } catch (err) {
            throw err
        }
    }
}

export function changeDegreeType(degreeType) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_TYPE', degreeType })
        } catch (err) {
            throw err
        }
    }
}

export function removeForecast(forecastId) {
    return async dispatch => {
        try {
            await forecastService.remove(forecastId)
            dispatch({ type: 'REMOVE_FORECAST', forecastId })
        } catch (err) {
            throw err
        }
    }
}

export function saveForecast(forecast) {
    return async dispatch => {
        try {
            const savedForecasts = await forecastService.save(forecast)
            dispatch({ type: 'SET_FAVORITE', savedForecasts })
        } catch (err) {
            throw err
        }
    }
}

export function setTheme(theme) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_THEME', theme })
        } catch (err) {
            throw err
        }
    }
}

