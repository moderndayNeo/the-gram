import axios from 'axios'

const token = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = token

export default (method, url, data = null) =>
    axios({ method, url, data })

