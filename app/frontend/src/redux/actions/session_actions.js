import { batch } from 'react-redux'
import * as APIUtil from '../../util/api_util'
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

export const createNewUser = (user) => (dispatch) =>
    APIUtil.createUser(user)
        .then(({ data: { user } }) => dispatch(receiveCurrentUser(user)))
        .catch((errors) => dispatch(receiveSessionErrors(errors)))

export const loginUser = (user) => (dispatch) =>
    APIUtil.loginUser(user)
        .then(({ data: { current_user } }) => {
            dispatch(receiveCurrentUser(current_user))
        })
        .catch((errors) => dispatch(receiveSessionErrors(errors)))

export const logoutUser = () => (dispatch) =>
    APIUtil.logoutUser().then(() => dispatch(logoutCurrentUser()))

export const followUser = (userId) => (dispatch) =>
    APIUtil.followUser(userId).then(({ data: { current_user } }) => {
        dispatch(receiveCurrentUser(current_user))
    })

export const unfollowUser = (userId) => (dispatch) =>
    APIUtil.unfollowUser(userId).then(({ data: { current_user } }) => {
        dispatch(receiveCurrentUser(current_user))
    })

export const fetchUsersNotFollowed = () => (dispatch) =>
    APIUtil.fetchUsersNotFollowed().then(
        ({ data: { users, current_user } }) => {
            batch(() => {
                dispatch(receiveCurrentUser(current_user))
                dispatch(receiveUsers(users))
            })
        }
    )

const receiveSessionErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
})

export const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user,
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
})

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users,
})
