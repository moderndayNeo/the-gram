import { RECEIVE_COMMENT, RECEIVE_COMMENTS } from 

export default (state, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_COMMENT:

        case RECEIVE_COMMENTS:

        default:
            return state
    }
}
