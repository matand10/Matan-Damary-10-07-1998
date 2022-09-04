import { storageService } from "./async-storage.service"
import { GEOLOCATION, DAILY, WEEKLY, CITY } from '../config/constant'

const STORAGE_KEY = 'forecast'
const FAVORITE_STORAGE_KEY = 'favorite'


const query = async (location, filterBy) => {
    try {
        let res = await storageService.query(STORAGE_KEY, filterBy)
        if (res !== null && JSON.stringify(res) !== '{}' && JSON.stringify(res) !== '[]') {
            return res
        } else {
            return loadWeather(location)
        }
    } catch (err) {
        throw err
    }
}

async function remove(dataId) {
    try {
        return await storageService.remove(FAVORITE_STORAGE_KEY, dataId)
    } catch (err) {
        throw err
    }
}

async function save(data) {
    if (data._id) {
        return await storageService.put(FAVORITE_STORAGE_KEY, data)
    } else {
        return await storageService.post(FAVORITE_STORAGE_KEY, data)
    }
}

async function loadFavorites() {
    let res = await storageService.query(FAVORITE_STORAGE_KEY)
    if (!res) return []
    return res
}

async function loadWeather(location) {
    const weekly = await _getWeekly(location.locationKey)
    const daily = await _getDaily(location.locationKey)
    const forecast = {
        name: location.name,
        locationKey: location.locationKey,
        daily: daily.DailyForecasts[0],
        weekly: weekly.DailyForecasts,
    }
    storageService.save(STORAGE_KEY, forecast)
    return forecast
}



const cityQuery = async (place) => {
    try {
        const res = await _getCity(place)
        if (!res.length) return null
        return {
            locationKey: res[0].Key,
            name: res[0].EnglishName
        }
    } catch (err) {
        throw err
    }
}

function getFavoriteId(favorites, forecast) {
    if (!favorites.length) return null
    return favorites.find(fav => fav.name === forecast.name)
}

function createFavorite(forecasts) {
    return {
        daily: forecasts.daily,
        weekly: forecasts.weekly,
        name: forecasts.name,
        locationKey: forecasts.locationKey
    }
}

async function getByGeolocation(coords) {
    try {
        const baseUrl = GEOLOCATION
        const query = `?apikey=${process.env.REACT_APP_MY_API_KEY}&q=${coords}`
        const respond = await fetch(baseUrl + query)
        return await respond.json()
    } catch (err) {
        throw err
    }
}

async function _getDaily(locationKey = '215854') {
    try {
        const baseUrl = `${DAILY}/${locationKey}`
        const query = `?apikey=${process.env.REACT_APP_MY_API_KEY}`
        const respond = await fetch(baseUrl + query)
        return await respond.json()
    } catch (err) {
        throw err
    }
}

async function _getWeekly(locationKey = '215854') {
    try {
        const baseUrl = `${WEEKLY}/${locationKey}`
        const query = `?apikey=${process.env.REACT_APP_MY_API_KEY}`
        const respond = await fetch(baseUrl + query)
        return await respond.json()
    } catch (err) {
        throw err
    }
}

const _getCity = async (city = 'tel aviv') => {
    try {
        const baseUrl = CITY
        const query = `?apikey=${process.env.REACT_APP_MY_API_KEY}&q=${city}`
        const res = await fetch(baseUrl + query)
        return await res.json()
    } catch (err) {
        throw err
    }
}

export const forecastService = {
    query,
    save,
    remove,
    cityQuery,
    getByGeolocation,
    loadFavorites,
    loadWeather,
    getFavoriteId,
    createFavorite,
}