import {
    RECEIVE_POSTS,
    DELETE_POST,
} from '../actions/post_actions'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_POSTS:
            return Object.assign({}, state, action.posts)

        default:
            return state
    }
}
