

export const ToggleBtn = (props) => {
    const { title, cb } = props

    return (
        <label className="switch" title={title}>
            <input type="checkbox" onChange={cb} />
            <span className="slider"></span>
        </label>
    )
}