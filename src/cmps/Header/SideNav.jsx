import { AiOutlineCloseCircle } from "react-icons/ai"
import { NavLink } from "react-router-dom"

export const SideNav = (props) => {
    const { toggleSideNav } = props
    return (
        <div className="side-nav">
            <span onClick={toggleSideNav}><AiOutlineCloseCircle /></span>
            <div className="side-nav-container" onClick={toggleSideNav}>
                <NavLink to="/" className={res => res.isActive ? "selected" : ""}>
                    Main
                </NavLink>
                <NavLink to="/favorite" className={res => res.isActive ? "selected" : ""}>
                    Favorite
                </NavLink>
            </div>
        </div>
    )
}