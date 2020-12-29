import {
    UPDATE_FILTER,
    UPDATE_UPLOAD_PAGE_TYPE,
    SET_ORIGINAL_IMAGE,
    SET_EDITED_IMAGE,
    SET_IMAGE_FOR,
    ROTATE_UPLOADED_IMAGE,
} from '../actions/upload_actions'

const _defaultState = {
    originalImage: null,
    editedImage: null,
    pageType: 'edit',
    imageFor: null,
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

        case ROTATE_UPLOADED_IMAGE:
            return Object.assign({}, state, {
                adjustments: {
                    ...state.adjustments,
                    rotation: state.adjustments.rotation + 90,
                },
            })

        case UPDATE_UPLOAD_PAGE_TYPE:
            return Object.assign({}, state, { pageType: action.pageType })

        case SET_ORIGINAL_IMAGE:
            return Object.assign({}, state, { originalImage: action.img })

        case SET_EDITED_IMAGE:
            return Object.assign({}, state, { editedImage: action.img })

        case SET_IMAGE_FOR:
            return Object.assign({}, state, { imageFor: action.imageFor })

        default:
            return state
    }
}
