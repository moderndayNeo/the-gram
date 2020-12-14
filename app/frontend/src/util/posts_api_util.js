import {
    axiosGetRequest,
    axiosPostRequest,
    axiosPutRequest,
    axiosDeleteRequest,
} from './axios_requests'

export const createPost = (post) => axiosPostRequest(`/api/posts`, post)

export const getPosts = () => axiosGetRequest(`/api/posts`)
// export const getFeedPosts = () => axiosGetRequest(`/api/posts`, { type: 'feed'})
// export const getDiscoverPosts = () => axiosGetRequest(`/api/posts`, { type: 'discover'})

export const updatePost = (postId, formData) =>
    axiosPutRequest(`/api/posts/${postId}`, formData)

export const deletePost = (postId) => axiosDeleteRequest(`/api/posts/${postId}`)
