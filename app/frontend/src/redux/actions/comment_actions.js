import * as APIUtil from '../../util/api_util'
import {receivePost} from './post_actions'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export const commentOnPost = (postId, body) => (dispatch) =>
    APIUtil.commentOnPost(postId, body)
        .then(({ data: { post, comment } }) => {
            dispatch(receiveComment(comment))
            dispatch(receivePost(post))
        })
        .catch((errors) => console.log(errors))

export const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment,
})

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments,
})
