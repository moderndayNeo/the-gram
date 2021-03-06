export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_UPLOAD_PAGE_TYPE = 'UPDATE_UPLOAD_PAGE_TYPE'
export const SET_ORIGINAL_IMAGE = 'SET_ORIGINAL_IMAGE'
export const SET_EDITED_IMAGE = 'SET_EDITED_IMAGE'
export const SET_IMAGE_FOR = 'SET_IMAGE_FOR'
export const ROTATE_UPLOADED_IMAGE = 'ROTATE_UPLOADED_IMAGE'
export const FIT_TO_SQUARE = 'FIT_TO_SQUARE'
export const RESET_UPLOAD_STATE = 'RESET_UPLOAD_STATE'
export const BEGIN_UPLOAD = 'BEGIN_UPLOAD'

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

export const setEditedImage = (img) => ({
    type: SET_EDITED_IMAGE,
    img,
})

export const setImageFor = (imageFor) => ({
    type: SET_IMAGE_FOR,
    imageFor,
})

export const rotateUploadedImage = () => ({
    type: ROTATE_UPLOADED_IMAGE,
})

export const fitToSquare = (boolean) => ({
    type: FIT_TO_SQUARE,
    boolean,
})

export const resetUploadState = () => ({
    type: RESET_UPLOAD_STATE,
})

export const beginUpload = () => ({
    type: BEGIN_UPLOAD,
})
