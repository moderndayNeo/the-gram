export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_UPLOAD_PAGE_TYPE = 'UPDATE_UPLOAD_PAGE_TYPE'

export const updateFilter = (newFilter) => ({
    type: UPDATE_FILTER,
    newFilter,
})

export const updateUploadPageType = (pageType) => ({
    type: UPDATE_UPLOAD_PAGE_TYPE,
    pageType,
})

// updateRotation
// updateCrop
