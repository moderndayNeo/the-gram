import {
    RECEIVE_POSTS,
    RECEIVE_POST,
    DELETE_POST,
} from '../actions/post_actions'

export default (state = {}, action) => {
    Object.freeze(state)
    let nextState

    switch (action.type) {
        case RECEIVE_POSTS:
            nextState = { ...state, ...action.posts }
            return nextState

        case RECEIVE_POST:
            return Object.assign({}, state, { [action.post.id]: action.post })

        case DELETE_POST:
            nextState = Object.assign({}, state)
            delete nextState[action.postId]
            return nextState

        default:
            return state
    }
}
