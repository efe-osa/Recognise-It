import React from "react"

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange("Signout")} className='f3 link dim black underline pa3 pointer'> Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange("Signup")} className='f3 link dim black underline pa3 pointer'> Register</p>
                <p onClick={() => onRouteChange("Signin")} className='f3 link dim black underline pa3 pointer'> Sign In</p>
            </nav>
        )
    }


}

export default Navigation   