import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session'

const _nullSession = {}

export default (state = _nullSession, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, Object.values(action.user.data)[0] )

        case LOGOUT_CURRENT_USER:
            return _nullSession

        default:
            return state
    }
}
