import axios from 'axios'

const { NODE_ENV } = process.env
const host = '192.168.1.186'
const port = '3000'

const api = () => axios.create({
  baseURL: `http${NODE_ENV === 'production' ? 's' : ''}://${host}${port ? ':' : ''}${port}/`,
  headers: { 'x-access-token': localStorage.getItem('token') },
})

export const whoami = cb => api()
  .get('/auth/me')
  .then(response => cb(null, response.data))
  .catch((error) => {
    localStorage.removeItem('token') // just in case
    cb(error)
  })

export const login = (credentials, cb) => api()
  .post('/auth/login', credentials)
  .then(response => cb(null, response.data))
  .catch(error => cb(error.response))
