import axiosRequest from './axios_request'

export const createUser = (user) => axiosRequest('post', '/api/users', {user})

export const loginUser = (user) => axiosRequest('post', '/api/session', user)

export const logoutUser = () => axiosRequest('delete', '/api/session')
