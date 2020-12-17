import { axiosGetRequest, axiosPostRequest, axiosPutRequest, axiosDeleteRequest } from './axios_requests';

export const createUser = (user) => axiosPostRequest('/api/users', {user})
export const loginUser = (user) => axiosPostRequest('/api/session', user)
export const logoutUser = () => axiosDeleteRequest('/api/session')
export const updateUser = (userId, formData) => axiosPutRequest(`/api/users/${userId}`, formData)

export const createPost = (post) => axiosPostRequest(`/api/posts`, post)
export const fetchPosts = () => axiosGetRequest(`/api/posts`)
export const updatePost = (postId, formData) =>
axiosPutRequest(`/api/posts/${postId}`, formData)

export const deletePost = (postId) => axiosDeleteRequest(`/api/posts/${postId}`)
export const getFeed = () => axiosGetRequest(`/api/posts`, { type: 'feed' })
// export const getDiscoverPosts = () => axiosGetRequest(`/api/posts`, { type: 'discover'})
