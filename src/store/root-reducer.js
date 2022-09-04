import { configureStore } from '@reduxjs/toolkit';
import { forecastReducer } from './forecast/forecast-reducer';


export const rootReducer = configureStore({
  reducer: {
    forecastModule: forecastReducer
  },
});
