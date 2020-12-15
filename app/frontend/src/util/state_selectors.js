import React from 'react'
import { useSelector } from 'react-redux'

export default ({userProp}) => {
    const currentUserId = useSelector((state) => state.session.id)
    const currentUser = useSelector(
        (state) => state.entities.users[currentUserId]
    )

    return <p>{currentUser[userProp]}</p>
}
