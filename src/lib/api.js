import axios from 'axios'

const { NODE_ENV } = process.env
const host = 'localhost'
const port = '3000'

export const api = () => axios.create({
  baseURL: `http${NODE_ENV === 'production' ? 's' : ''}://${host}${port ? ':' : ''}${port}/`,
  headers: {
    common: {
      'x-access-token': localStorage.getItem('token') !== null ? localStorage.getItem('token') : null,
    },
  },
})

export const whoami = cb => api()
  .get('/auth/me')
  .then(response => cb(null, response.data))
  .catch(error => cb(error))

export const login = (credentials, cb) => api()
  .post('/auth/login', credentials)
  .then(response => cb(null, response.data))
  .catch(error => cb(error.response))
