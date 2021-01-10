import {
    axiosGetRequest,
    axiosPostRequest,
    axiosPutRequest,
    axiosDeleteRequest,
} from './axios_requests'

export const createUser = (user) => axiosPostRequest('/api/users', { user })
export const loginUser = (user) => axiosPostRequest('/api/session', user)
export const logoutUser = () => axiosDeleteRequest('/api/session')

export const fetchUserProfileData = (userId) =>
    axiosGetRequest(`/api/users/${userId}`)

export const updateUser = (userId, formData) =>
    axiosPutRequest(`/api/users/${userId}`, formData)

export const updatePassword = (userId, passwords) =>
    axiosPutRequest(`/api/users/${userId}?type=password`, {
        old_password: passwords.oldPassword,
        new_password: passwords.newPassword,
    })

export const createPost = (post) => axiosPostRequest(`/api/posts`, post)
export const fetchPosts = () => axiosGetRequest(`/api/posts`)
export const fetchPost = (postId) => axiosGetRequest(`/api/posts/${postId}`)
export const deletePost = (postId) => axiosDeleteRequest(`/api/posts/${postId}`)
export const updatePost = (postId, formData) =>
    axiosPutRequest(`/api/posts/${postId}`, formData)

export const getFeed = () => axiosGetRequest(`/api/posts`, { type: 'feed' })
export const getNewUserFeed = () =>
    axiosGetRequest(`/api/posts`, { type: 'new_user' })

export const likePost = (postId) =>
    axiosPostRequest(`/api/posts/${postId}/likes`)

export const unlikePost = (postId) =>
    axiosDeleteRequest(`/api/posts/${postId}/likes/1`)

export const commentOnPost = (postId, body) =>
    axiosPostRequest(`/api/posts/${postId}/comments`, body)

export const followUser = (userId) =>
    axiosPostRequest(`/api/users/${userId}/follows`)

export const unfollowUser = (userId) =>
    axiosDeleteRequest(`/api/users/${userId}/follows/1`)

export const savePost = (postId) =>
    axiosPostRequest(`/api/posts/${postId}/saves`)

export const unsavePost = (postId) =>
    axiosDeleteRequest(`/api/posts/${postId}/saves/1`)

export const fetchUsersNotFollowed = () =>
    axiosGetRequest(`/api/users?type=explore`)

export const likeComment = (postId, commentId) =>
    axiosPostRequest(`/api/posts/${postId}/comments/${commentId}/likes`)

export const unlikeComment = (postId, commentId) =>
    axiosDeleteRequest(`/api/posts/${postId}/comments/${commentId}/likes/1`)

export const fetchFollowers = () =>
    axiosGetRequest(`/api/users`, { type: 'followers' })

export const fetchNotifications = () => axiosGetRequest(`/api/notifications`)
