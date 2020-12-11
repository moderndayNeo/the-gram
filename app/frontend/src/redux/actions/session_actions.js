import * as SessionAPIUtil from '../../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'

export const createNewUser = (user) => (dispatch) =>
    SessionAPIUtil.createUser(user).then((user) =>
        dispatch(receiveCurrentUser(user))
    )

// cant create new user, we want these errors to appear on signup form
// we want to capture these errors in state, then display them on the signup page if they exist
// note, errors always comes back from the server as an array

export const loginUser = (user) => (dispatch) =>
    SessionAPIUtil.loginUser(user).then((user) =>
        dispatch(receiveCurrentUser(user))
    )

export const logoutUser = () => (dispatch) => {
    SessionAPIUtil.logoutUser().then(() => dispatch(logoutCurrentUser()))
}

const receiveSessionErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
})

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user,
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
})
