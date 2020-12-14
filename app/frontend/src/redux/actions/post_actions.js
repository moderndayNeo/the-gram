import * as PostsAPIUtil from '../../util/posts_api_util'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS'

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts,
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId,
})

export const fetchPosts = () => (dispatch) =>
    PostsAPIUtil.fetchPosts()
        .then((posts) => dispatch(receivePosts(posts)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const deletePost = (postId) => (dispatch) =>
    PostsAPIUtil.deletePost(postId)
        .then((postId) => dispatch(deletePost(postId)))
        .catch((errors) => receivePostErrors(errors))

const receivePostErrors = (errors) => ({
    type: RECEIVE_POST_ERRORS,
    errors,
})
