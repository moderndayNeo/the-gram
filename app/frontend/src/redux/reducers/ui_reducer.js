import {
    DISPLAY_POST_MODAL,
    HIDE_POST_MODAL,
    DISPLAY_CLIPBOARD_POPUP,
    HIDE_CLIPBOARD_POPUP,
} from '../actions/ui_actions'

const _defaultState = {
    postModal: null,
    clipboardPopup: false,
}

export default (state = _defaultState, action) => {
    Object.freeze(state)

    switch (action.type) {
        case DISPLAY_POST_MODAL:
            return Object.assign({}, state, { postModal: action.postId })

        case HIDE_POST_MODAL:
            return Object.assign({}, state, { postModal: null })

        case DISPLAY_CLIPBOARD_POPUP:
            return Object.assign({}, state, { clipboardPopup: true })

        case HIDE_CLIPBOARD_POPUP:
            return Object.assign({}, state, { clipboardPopup: false })

        default:
            return _defaultState
    }
}

// ui : {
//     postModal: 12,
//     clipboardPopup: false
// }

// ui : {
//     postModal: null,
//     clipboardPopup: true
// }
