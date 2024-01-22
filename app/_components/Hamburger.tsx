'use client'

import { useState } from "react"

const Hamburger = () => {

    const [menu, setMenu] = useState(false)

    return (
        <span className="hamburger material-symbols-rounded" onClick={() => setMenu(!menu)}>
            menu
        </span>
    )

}

export default Hamburger