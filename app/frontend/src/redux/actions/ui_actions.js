export const DISPLAY_POST_MODAL = 'DISPLAY_POST_MODAL'
export const HIDE_POST_MODAL = 'HIDE_POST_MODAL'
export const DISPLAY_CLIPBOARD_POPUP = 'DISPLAY_CLIPBOARD_POPUP'
export const HIDE_CLIPBOARD_POPUP = 'HIDE_CLIPBOARD_POPUP'

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

export const showClipboardPopup = () => (dispatch) => {
    dispatch(displayClipboardPopup())
    console.log('showing cb')
    setTimeout(() => {
        dispatch(hideClipboardPopup())
        console.log('hiding cb')
    }, 4000)
}
