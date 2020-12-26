import React from 'react'
import icons from '../shared/icons/svg-icons'
import {useHistory} from 'react-router-dom'

export default function Followers() {
const history = useHistory()

    return (
        <div className="followers">
            <header>
            <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <p>Followers</p>
            </header>
        </div>
    )
}
