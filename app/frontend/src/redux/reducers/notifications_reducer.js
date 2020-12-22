import { RECEIVE_NOTIFICATION, RECEIVE_NOTIFICATIONS } from '../actions/notification_actions'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_NOTIFICATION:
            return Object.assign({}, state, {
                [action.notification.id]: action.notification,
            })

        case RECEIVE_NOTIFICATIONS:
            return Object.assign({}, state, action.notifications)

        default:
            return state
    }
}
