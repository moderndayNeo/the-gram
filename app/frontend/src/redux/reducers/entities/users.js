import { RECEIVE_CURRENT_USER } from '../../actions/session'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, {
                [action.user.data.id]: action.user.data,
            })
        // check this

        default:
            return state
    }
}
