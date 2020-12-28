import {
    UPDATE_FILTER,
    UPDATE_UPLOAD_PAGE_TYPE,
} from '../actions/upload_actions'

const _defaultState = {
    originalImage: null,
    editedImage: null,
    pageType: 'edit',
    adjustments: {
        filter: 'Normal',
        rotation: 0,
        crop: 0,
    },
}

export default (state = _defaultState, action) => {
    Object.freeze(state)

    switch (action.type) {
        case UPDATE_FILTER:
            return Object.assign({}, state, {
                adjustments: {
                    ...state.adjustments,
                    filter: action.newFilter,
                },
            })

        case UPDATE_UPLOAD_PAGE_TYPE:
            return Object.assign({}, state, { pageType: action.pageType })

        default:
            return state
    }
}
