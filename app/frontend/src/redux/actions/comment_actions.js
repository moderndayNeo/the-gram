import { batch } from 'react-redux'
import * as APIUtil from '../../util/api_util'
import { receivePost } from './post_actions'
import { receiveCurrentUser } from './session_actions'
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

export const likeComment = (postId, commentId) => (dispatch) =>
    APIUtil.likeComment(postId, commentId)
        .then(({ data: { user, comment } }) => {
            batch(() => {
                dispatch(receiveCurrentUser(user))
                dispatch(receiveComment(comment))
            })
        })
        .catch((errors) => console.log(errors))

export const unlikeComment = (postId, commentId) => (dispatch) =>
    APIUtil.unlikeComment(postId, commentId)
        .then(({ data: { user, comment } }) => {
            batch(() => {
                dispatch(receiveCurrentUser(user))
                dispatch(receiveComment(comment))
            })
        })
        .catch((errors) => console.log(errors))
