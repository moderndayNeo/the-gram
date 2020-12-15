import * as SessionAPIUtil from '../../util/session_api_util'
import { receivePosts } from './post_actions'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS'

export const createNewUser = (user) => (dispatch) =>
    SessionAPIUtil.createUser(user)
        .then(({ data: { user } }) => dispatch(receiveCurrentUser(user)))
        .catch((errors) => dispatch(receiveSessionErrors(errors)))

export const loginUser = (user) => (dispatch) =>
    SessionAPIUtil.loginUser(user)
        .then(({ data: { user, posts } }) => {
            dispatch(receiveCurrentUser(user))
            dispatch(receivePosts(posts))
        })
        .catch((errors) => dispatch(receiveSessionErrors(errors)))

export const logoutUser = () => (dispatch) =>
    SessionAPIUtil.logoutUser().then(() => dispatch(logoutCurrentUser()))

export const updateUser = (userId, formData) => (dispatch) =>
    SessionAPIUtil.updateUser(userId, formData)
        .then((user) => dispatch(receiveCurrentUser(user)))
        .catch((errors) => dispatch(receiveUserErrors(errors)))

// update this

const receiveSessionErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
})

const receiveUserErrors = (errors) => ({
    type: RECEIVE_USER_ERRORS,
    errors,
})

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user,
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
})
