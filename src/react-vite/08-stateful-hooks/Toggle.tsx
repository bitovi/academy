import React from "react";
import { useToggle } from "./useToggle";

const Toggle: React.FC = () => {
    const [on, toggle] = useToggle(true);

    return (
        <form>
            <label className="toggle">
                <input
                    className="toggle-checkbox"
                    checked={on}
                    onChange={toggle}
                    type="checkbox"
                />
                <div className="toggle-switch"></div>
                <span className="toggle-label">
                    {on ? "On" : "Off"}
                </span>
            </label>
        </form>
    )
}

export default Toggle