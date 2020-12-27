import * as APIUtil from '../../util/api_util'
import { receiveUsers, receiveCurrentUser } from './session_actions'
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS'
export const RECEIVE_USER = 'RECEIVE_USER'

export const fetchFollowers = () => (dispatch) =>
    APIUtil.fetchFollowers()
        .then(({ data: { users } }) => dispatch(receiveUsers(users)))
        .catch((errors) => console.log(errors))

export const fetchSuggestedUsers = () => (dispatch) =>
    APIUtil.fetchUsersNotFollowed()
        .then(({ data: { users } }) => {
            dispatch(receiveUsers(users))
        })
        .catch((errors) => console.log(errors))

export const updateUser = (userId, formData) => (dispatch) =>
    APIUtil.updateUser(userId, formData)
    .then(({ data: { user } }) => dispatch(receiveCurrentUser(user)))
        .catch((errors) => dispatch(receiveUserErrors(errors)))

const receiveUserErrors = (errors) => ({
    type: RECEIVE_USER_ERRORS,
    errors,
})

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user,
})
