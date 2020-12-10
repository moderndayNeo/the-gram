// import { RECEIVE_SESSION_ERRORS } from '../actions/session_actions'

const defaultState = []

export default (state = defaultState, action) => {
    Object.freeze(state)

    switch (action.type) {
        // case RECEIVE_SESSION_ERRORS:
            // return Object.assign({}, action.errors)

        default:
            return state
    }
}
