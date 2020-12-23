import React, { useEffect } from 'react';
import BottomNav from '../shared/bottom_nav';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import { getFeed } from '../../redux/actions/post_actions';
import LoadingPlaceholder from '../shared/loading_placeholder'


export default function Activity() {
    const dispatch = useDispatch();
    const notifications = useSelector(stateSelectors.allNotifications());

    useEffect(() => {
        if (!notifications.length)
            dispatch(getFeed());
    }, []);

    return (
        <div className="activity">
            <header><h3>Activity</h3></header>

            {
                !notifications.length ?
                    <LoadingPlaceholder /> :
                    <ul>
                        {
                            notifications.map(notification => (
                                <li key={notification.id}>
                                    <p>{notification.message}</p>
                                </li>
                            ))
                        }
                    </ul>
            }

            <BottomNav />
        </div>
    );
}
