import React from 'react';
import BottomNav from '../shared/bottom_nav';
import stateSelectors from '../../util/state_selectors';
import {useSelector} from 'react-redux'

export default function Activity() {
    const notifications = useSelector(stateSelectors.allNotifications());
    

    return (
        <div className="activity">
            <header><h3>Activity</h3></header>

            <ul>
                {
                    notifications.map(notification => (
                        <li key={notification.id}>
                            <p>{notification.message}</p>
                        </li>
                    ))
                }
            </ul>

            <BottomNav />
        </div>
    );
}
