export const DISPLAY_POST_MODAL = 'DISPLAY_POST_MODAL'
export const HIDE_POST_MODAL = 'HIDE_POST_MODAL'
export const DISPLAY_CLIPBOARD_POPUP = 'DISPLAY_CLIPBOARD_POPUP'
export const HIDE_CLIPBOARD_POPUP = 'HIDE_CLIPBOARD_POPUP'
export const DISPLAY_DIRECT_MESSAGE_MODAL = 'DISPLAY_DIRECT_MESSAGE_MODAL'
export const HIDE_DIRECT_MESSAGE_MODAL = 'HIDE_DIRECT_MESSAGE_MODAL'
export const DISPLAY_POPUP = 'DISPLAY_POPUP'
export const HIDE_POPUP = 'HIDE_POPUP'

export const displayPostModal = (postId) => ({
    type: DISPLAY_POST_MODAL,
    postId,
})

export const hidePostModal = () => ({
    type: HIDE_POST_MODAL,
})

export const displayClipboardPopup = () => ({
    type: DISPLAY_CLIPBOARD_POPUP,
})

export const hideClipboardPopup = () => ({
    type: HIDE_CLIPBOARD_POPUP,
})

export const displayDirectMessageModal = () => ({
    type: DISPLAY_DIRECT_MESSAGE_MODAL,
})

export const hideDirectMessageModal = () => ({
    type: HIDE_DIRECT_MESSAGE_MODAL,
})

export const displayPopup = (popupType) => ({
    type: DISPLAY_POPUP,
    popupType,
})

export const hidePopup = (popupType) => ({
    type: HIDE_POPUP,
    popupType,
})

export const showEditProfilePopup = () => (dispatch) => {
    dispatch(displayPopup('editProfilePopup'))
    setTimeout(() => {
        dispatch(hidePopup('editProfilePopup'))
    }, 4000)
}

export const showClipboardPopup = () => (dispatch) => {
    dispatch(displayClipboardPopup())
    setTimeout(() => {
        dispatch(hideClipboardPopup())
    }, 4000)
}
