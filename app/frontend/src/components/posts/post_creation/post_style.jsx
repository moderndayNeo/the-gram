import React from 'react'
import {useLocation, Link} from 'react-router-dom'

export default function PostStyle() {
const location = useLocation()
console.log(location)

    return (
        <div>
            {/* <img src={location.state.photoUrl} alt=""/> */}
            Post Style
        <Link to='/'>Back Home</Link>
        </div>
    )
}
