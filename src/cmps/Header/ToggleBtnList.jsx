import { ToggleBtn } from "./ToggleBtn"


export const ToggleBtnList = (props) => {
    const { toggleDegrees, toggleTheme } = props

    const btns = [
        {
            _id: 1,
            title: 'Degrees toggle',
            cb: toggleDegrees
        },
        {
            _id: 2,
            title: 'Rark/Light toggle',
            cb: toggleTheme
        },
    ]

    return (
        <div className="action-btn-container">
            {btns.map(btn => <ToggleBtn key={btn._id} title={btn.title} cb={btn.cb} />)}
        </div>
    )
}