import { Homepage } from './pages/Homepage.jsx'
import { Favorite } from './pages/Favorite.jsx'


export const routes = [
    {
        path: '/',
        component: Homepage,
    },
    {
        path: '/favorite',
        component: Favorite,
    },
]