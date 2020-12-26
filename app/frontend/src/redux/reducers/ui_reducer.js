import { DISPLAY_POST_MODAL, HIDE_POST_MODAL } from '../actions/ui_actions'

const _defaultState = {
    postModal: null,
}

export default (state = _defaultState, action) => {
    Object.freeze(state)

    switch (action.type) {
        case DISPLAY_POST_MODAL:
            return Object.assign({}, state, { postModal: action.postId })

        case HIDE_POST_MODAL:
            return Object.assign({}, state, { postModal: null })

        default:
            return _defaultState
    }
}

// ui : {
//     postModal: 12
// }

// ui : {
//     postModal: null
// }
