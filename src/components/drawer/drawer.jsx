import React from 'react'
import './drawer.css';

function Drawer(props) {
    const {drawerShow, setDrawerShow, drawerConent} = props

    let drawerClass = drawerShow ? 'side-drawer open': 'side-drawer';

    return (
        <div className={drawerClass} onClick={() => setDrawerShow(!drawerShow)}>
            {/* <button>Toggle</button>/ */}
            <h1>Slidinggg</h1>
            <h1>{drawerConent}</h1>
            <h1>ee</h1>

        </div>
    )
}

export default Drawer
