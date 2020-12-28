import { UPDATE_FILTER } from '../actions/upload_actions'

const _defaultState = {
    originalImage: null,
    editedImage: null,
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

        default:
            return state
    }
}
