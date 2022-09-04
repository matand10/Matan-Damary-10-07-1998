import { AiOutlineMenu } from "react-icons/ai"
import { NavLink } from "react-router-dom"

export const HeaderNav = (props) => {
    const { toggleSideNav } = props

    return (
        <div className="header-nav">
            <div onClick={toggleSideNav}><AiOutlineMenu /></div>
            <NavLink to="/" className={res => res.isActive ? "selected" : ""}>
                Main
            </NavLink>
            <NavLink to="/favorite" className={res => res.isActive ? "selected" : ""}>
                Favorite
            </NavLink>
        </div>
    )
}