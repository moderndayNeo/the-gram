import * as SessionAPIUtil from '../../util/session'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user,
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
})

export const createNewUser = (formUser) => (dispatch) => {
    SessionAPIUtil.createUser(formUser)
        .then((user) => dispatch(receiveCurrentUser(user)))
        .fail((errors) => console.log(errors))
}

export const loginUser = (user) => (dispatch) => {
    SessionAPIUtil.loginUser(user).then((user) =>
        dispatch(receiveCurrentUser(user))
    )
}

export const logoutUser = () => (dispatch) => {
    SessionAPIUtil.logoutUser().then(() => dispatch(logoutCurrentUser()))
}
