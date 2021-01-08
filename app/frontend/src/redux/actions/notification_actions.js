import * as APIUtil from '../../util/api_util'
import { receiveCurrentUser, receiveUsers } from './session_actions'
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
        ({ data: { notifications, users, posts, current_user } }) => {
            batch(() => {
                dispatch(receiveUsers(users))
                dispatch(receiveCurrentUser(current_user))
                dispatch(receivePosts(posts))
                dispatch(receiveNotifications(notifications))
            })
        }
    )
