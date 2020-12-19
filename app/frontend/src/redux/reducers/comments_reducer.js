import { RECEIVE_COMMENT, RECEIVE_COMMENTS } from '../actions/comment_actions'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {
                [action.comment.id]: action.comment,
            })
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, action.comments)

        default:
            return state
    }
}
