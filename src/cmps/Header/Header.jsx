import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


import { ToggleBtnList } from "./ToggleBtnList"
import { HeaderNav } from "./HeaderNav"
import { SideNav } from "./SideNav"


import { changeDegreeType, setTheme } from "../../store/forecast/forecast.action"


export const Header = () => {
    const dispatch = useDispatch()
    const { degreesType, theme } = useSelector((state) => state.forecastModule)
    const [isSideNav, setIsSideNav] = useState(false)

    useEffect(() => {
        const elBody = document.querySelector('body')
        elBody.classList.add(theme)

        return () => {
            elBody.classList.remove(theme)
        }
    }, [theme])

    const toggleDegrees = () => {
        if (degreesType === 'F') return dispatch(changeDegreeType(''))
        else return dispatch(changeDegreeType('F'))
    }

    const toggleTheme = () => {
        const toggledTheme = theme === 'light' ? 'dark' : 'light'
        dispatch(setTheme(toggledTheme))
    }

    const toggleSideNav = () => {
        const elMenu = document.querySelector('.side-nav')
        if (!isSideNav) elMenu.style.display = 'block'
        else elMenu.style.display = 'none'
        setIsSideNav(!isSideNav)
    }

    return (
        <section className="header-container">
            <ToggleBtnList toggleDegrees={toggleDegrees} toggleTheme={toggleTheme} />
            <HeaderNav toggleSideNav={toggleSideNav} />
            <SideNav toggleSideNav={toggleSideNav} />
        </section>
    )
}






