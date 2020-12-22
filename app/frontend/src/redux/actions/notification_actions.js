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
