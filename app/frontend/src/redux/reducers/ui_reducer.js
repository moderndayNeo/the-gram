import { DISPLAY_POST_MODAL, HIDE_POST_MODAL } from '../actions/ui_actions'

const _defaultState = {
    postModal: false,
}

export default (state = _defaultState, action) => {
    Object.freeze(state)

    switch (action.type) {
        case DISPLAY_POST_MODAL:
            return Object.assign({}, state, { postModal: true })

        case HIDE_POST_MODAL:
            return Object.assign({}, state, { postModal: false })

        default:
            return _defaultState
    }
}
