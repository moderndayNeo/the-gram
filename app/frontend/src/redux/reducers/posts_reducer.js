import {
    RECEIVE_POSTS,
    RECEIVE_POST,
    DELETE_POST,
} from '../actions/post_actions'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_POSTS:
            return Object.assign({}, state, action.posts)

        case RECEIVE_POST:
            return Object.assign({}, state, action.post)

        default:
            return state
    }
}
