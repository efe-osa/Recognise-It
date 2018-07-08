import React from "react"
import Tilt from "react-tilt"
import brain from "./brain4.png"
import "./logo.css"

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br-pill shadow-3' options={{ max: 55 , reverse: false}} style={{ height: 120, width: 120 }}>
                <div className='Tilt-inner pa3'>
                    <img style={{paddingTop: "5px"}} alt='Logo' src={brain} />
                </div>
            </Tilt>
        </div>
    )
}
export default Logo
