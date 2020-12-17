import { axiosGetRequest, axiosPostRequest, axiosPutRequest, axiosDeleteRequest } from './axios_requests';

export const createUser = (user) => axiosPostRequest('/api/users', {user})
export const loginUser = (user) => axiosPostRequest('/api/session', user)
export const logoutUser = () => axiosDeleteRequest('/api/session')
export const updateUser = (userId, formData) => axiosPutRequest(`/api/users/${userId}`, formData)

