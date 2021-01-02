import {
    DISPLAY_POST_MODAL,
    HIDE_POST_MODAL,
    DISPLAY_CLIPBOARD_POPUP,
    HIDE_CLIPBOARD_POPUP,
    DISPLAY_DIRECT_MESSAGE_MODAL,
    HIDE_DIRECT_MESSAGE_MODAL,
    DISPLAY_COMMENT_MODAL,
    HIDE_COMMENT_MODAL,
    DISPLAY_POPUP,
    HIDE_POPUP,
} from '../actions/ui_actions'

import { DELETE_POST } from '../actions/post_actions'

const _defaultState = {
    postModal: null,
    commentModal: null,
    clipboardPopup: false,
    dmModal: false,
    editProfilePopup: false,
    passwordPopup: false,
}

export default (state = _defaultState, action) => {
    Object.freeze(state)

    switch (action.type) {
        case DISPLAY_POST_MODAL:
            return Object.assign({}, state, { postModal: action.postId })

        case HIDE_POST_MODAL:
            return Object.assign({}, state, { postModal: null })

        case DISPLAY_COMMENT_MODAL:
            return Object.assign({}, state, { commentModal: action.postId })

        case HIDE_COMMENT_MODAL:
            return Object.assign({}, state, { commentModal: null })

        case DISPLAY_CLIPBOARD_POPUP:
            return Object.assign({}, state, { clipboardPopup: true })

        case HIDE_CLIPBOARD_POPUP:
            return Object.assign({}, state, { clipboardPopup: false })

        case DISPLAY_DIRECT_MESSAGE_MODAL:
            return Object.assign({}, state, { dmModal: true })

        case HIDE_DIRECT_MESSAGE_MODAL:
            return Object.assign({}, state, { dmModal: false })

        case DISPLAY_POPUP:
            return Object.assign({}, state, { [action.popupType]: true })

        case HIDE_POPUP:
            return Object.assign({}, state, { [action.popupType]: false })

        case DELETE_POST:
            return Object.assign({}, state, { postModal: null })

        default:
            return _defaultState
    }
}
