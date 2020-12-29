export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_UPLOAD_PAGE_TYPE = 'UPDATE_UPLOAD_PAGE_TYPE'
export const SET_ORIGINAL_IMAGE = 'SET_ORIGINAL_IMAGE'

export const updateFilter = (newFilter) => ({
    type: UPDATE_FILTER,
    newFilter,
})

export const updateUploadPageType = (pageType) => ({
    type: UPDATE_UPLOAD_PAGE_TYPE,
    pageType,
})

export const setOriginalImage = (img) => ({
    type: SET_ORIGINAL_IMAGE,
    img,
})

// updateRotation
// updateCrop
