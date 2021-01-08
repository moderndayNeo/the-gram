import { batch } from 'react-redux'
import * as APIUtil from '../../util/api_util'
import { receiveUsers, receiveCurrentUser } from './session_actions'
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS'
export const RECEIVE_USER = 'RECEIVE_USER'

export const fetchFollowers = () => (dispatch) =>
    APIUtil.fetchFollowers().then(({ data: { users, current_user } }) => {
        batch(() => {
            dispatch(receiveCurrentUser(current_user))
            dispatch(receiveUsers(users))
        })
    })

export const fetchSuggestedUsers = () => (dispatch) =>
    APIUtil.fetchUsersNotFollowed().then(
        ({ data: { users, current_user } }) => {
            batch(() => {
                dispatch(receiveUsers(users))
                dispatch(receiveCurrentUser(current_user))
            })
        }
    )

export const updateUser = (userId, formData) => (dispatch) =>
    APIUtil.updateUser(userId, formData)
        .then(({ data: { current_user } }) =>
            dispatch(receiveCurrentUser(current_user))
        )
        .catch((errors) => dispatch(receiveUserErrors(errors)))

export const updatePassword = (userId, passwords) => (dispatch) =>
    APIUtil.updatePassword(userId, passwords)
        .then(({ data: { current_user } }) =>
            dispatch(receiveCurrentUser(current_user))
        )
        .catch((errors) => dispatch(receiveUserErrors(errors)))

const receiveUserErrors = (errors) => ({
    type: RECEIVE_USER_ERRORS,
    errors,
})
