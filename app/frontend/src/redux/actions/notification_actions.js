import * as APIUtil from '../../util/api_util'
import { receiveUsers } from './session_actions'
import { receivePosts } from './post_actions'
import { batch } from 'react-redux'

export const RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION'
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS'

export const receiveNotification = (notification) => ({
    type: RECEIVE_NOTIFICATION,
    notification,
})
export const receiveNotifications = (notifications) => ({
    type: RECEIVE_NOTIFICATIONS,
    notifications,
})

export const fetchNotifications = () => (dispatch) =>
    APIUtil.fetchNotifications().then(
        ({ data: { notifications, users, posts } }) => {
            batch(() => {
                dispatch(receiveUsers(users))
                dispatch(receivePosts(posts))
                dispatch(receiveNotifications(notifications))
            })
        }
    )
