import * as APIUtil from '../../util/api_util'

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'


export const commentOnPost = (postId, body) => (dispatch) =>
    APIUtil.commentOnPost(postId, body).then((res) => console.log(res))

export const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment,
})

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments,
})
