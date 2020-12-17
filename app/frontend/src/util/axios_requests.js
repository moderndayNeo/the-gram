import axios from 'axios'

const token = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = token

export const axiosGetRequest = (url, data = null) =>
    axios({ method: 'get', url, params: data })

export const axiosPostRequest = (url, data = null) =>
    axios({ method: 'post', url, data })

export const axiosPutRequest = (url, data = null) =>
    axios({ method: 'put', url, data })

export const axiosDeleteRequest = (url, data = null) =>
    axios({ method: 'delete', url, data })

/*
Example GET request:
axiosGetRequest('/api/users', { min_id: 3 }).then(res => console.log(res))
    
Example POST request:
axiosPostRequest('/api/users', {
    user: {
        name: 'omar',
        username: 'omarlittle',
        email: 'omar@example.com',
        password: 'thewire',
    },
}).then(res => console.log(res))

Example PUT request:
axiosPutRequest(`/api/users/${10}`, { user: { name: 'ANOTHER NAME' }}).then(res => console.log(res))

Example DELETE request:
axiosDeleteRequest(`/api/users/${11}`).then(res => console.log(res))
*/



// axiosGetRequest(`/api/posts`, { type: 'feed' })