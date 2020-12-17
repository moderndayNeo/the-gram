import Post from '../../components/posts/post'
import * as PostsAPIUtil from '../../util/api_util'
import { receiveUsers } from './session_actions'
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

export const createPost = (post) => (dispatch) =>
    PostsAPIUtil.createPost(post)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const fetchPosts = () => (dispatch) =>
    PostsAPIUtil.fetchPosts()
        .then(({ data: { posts } }) => dispatch(receivePosts(posts)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const getFeed = () => (dispatch) =>
    PostsAPIUtil.getFeed()
        .then(({ data: { posts, users } }) => {
            dispatch(receiveUsers(users))
            dispatch(receivePosts(posts))
        })
        .catch((errors) => console.log(errors))

export const likePost = (postId) => (dispatch) =>
    PostsAPIUtil.likePost(postId)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => console.log(errors))
