const initialState = {
    forecasts: null,
    degreesType: 'F',
    favorite: [],
    theme: 'light'
}

export function forecastReducer(state = initialState, action) {
    var forecasts
    var favorite

    switch (action.type) {
        case 'SET_FORECAST':
            return { ...state, forecasts: action.forecasts }
        case 'REMOVE_FORECAST':
            favorite = state.favorite.filter(favorite => favorite._id !== action.forecastId)
            return { ...state, favorite }
        case 'ADD_FORECAST':
            forecasts = [action.forecast, ...state.forecasts]
            return { ...state, forecasts }
        case 'SET_TYPE':
            return { ...state, degreesType: action.degreeType }
        case 'SET_FAVORITE':
            return { ...state, favorite: action.savedForecasts }
        case 'SET_THEME':
            return { ...state, theme: action.theme }
        default:
            return state
    }
}
