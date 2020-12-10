import { RECEIVE_SESSION_ERRORS } from '../actions/errors'

const defaultState = {
    session: [],
    login: [],
}

export default (state = defaultState, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return Object.assign({}, action.errors)

        default:
            return state
    }
}
