import {
    DISPLAY_POST_MODAL,
    HIDE_POST_MODAL,
    DISPLAY_CLIPBOARD_POPUP,
    HIDE_CLIPBOARD_POPUP,
    DISPLAY_DIRECT_MESSAGE_MODAL,
    HIDE_DIRECT_MESSAGE_MODAL,
} from '../actions/ui_actions'

const _defaultState = {
    postModal: null,
    clipboardPopup: false,
    dmModal: false,
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

        case DISPLAY_DIRECT_MESSAGE_MODAL:
            return Object.assign({}, state, { dmModal: true })

        case HIDE_DIRECT_MESSAGE_MODAL:
            return Object.assign({}, state, { dmModal: false })

        default:
            return _defaultState
    }
}
