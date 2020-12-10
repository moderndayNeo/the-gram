import { RECEIVE_ERRORS } from '../actions/errors'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_ERRORS:
            return Object.assign({}, action.errors)

        default:
            return state
    }
}