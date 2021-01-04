import * as APIUtil from '../../util/api_util'
import { receiveUsers, receiveCurrentUser } from './session_actions'
import { receiveComments } from './comment_actions'
import { batch } from 'react-redux'
import {
    receiveNotification,
    receiveNotifications,
} from './notification_actions'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS'

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts,
})
export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post,
})

export const receivePostErrors = (errors) => ({
    type: RECEIVE_POST_ERRORS,
    errors,
})

export const removePost = (postId) => ({
    type: DELETE_POST,
    postId,
})

export const createPost = (post) => (dispatch) =>
    APIUtil.createPost(post)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const fetchPosts = () => (dispatch) =>
    APIUtil.fetchPosts()
        .then(({ data: { posts } }) => dispatch(receivePosts(posts)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const getFeed = () => (dispatch) =>
    APIUtil.getFeed()
        .then(({ data: { posts, users, comments, notifications } }) => {
            batch(() => {
                dispatch(receiveUsers(users))
                dispatch(receivePosts(posts))
                dispatch(receiveComments(comments))
                dispatch(receiveNotifications(notifications))
            })
        })
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const likePost = (postId) => (dispatch) =>
    APIUtil.likePost(postId)
        .then(({ data: { user, post, notification } }) => {
            batch(() => {
                dispatch(receiveCurrentUser(user))
                dispatch(receivePost(post))
                if (notification) dispatch(receiveNotification(notification))
            })
        })
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const unlikePost = (postId) => (dispatch) =>
    APIUtil.unlikePost(postId)
        .then(({ data: { user, post } }) => {
            batch(() => {
                dispatch(receiveCurrentUser(user))
                dispatch(receivePost(post))
            })
        })
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const savePost = (postId) =>
    APIUtil.savePost(postId)
        .then(({ data: { user } }) => dispatch(receiveCurrentUser(user)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const unsavePost = (postId) =>
    APIUtil.unsavePost(postId)
        .then(({ data: { user } }) => dispatch(receiveCurrentUser(user)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const deletePost = (postId) => (dispatch) =>
    APIUtil.deletePost(postId)
        .then(() => dispatch(removePost(postId)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const getPost = (postId) => (dispatch) =>
    APIUtil.fetchPost(postId)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => dispatch(receivePostErrors(errors)))
