export const DISPLAY_POST_MODAL = 'DISPLAY_POST_MODAL'
export const HIDE_POST_MODAL = 'HIDE_POST_MODAL'

export const displayPostModal = (postId) => ({
    type: DISPLAY_POST_MODAL,
    postId,
})

export const hidePostModal = () => ({
    type: HIDE_POST_MODAL,
})
