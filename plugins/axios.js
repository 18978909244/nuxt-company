/* eslint-disable prefer-const */
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: '/api',
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    config.headers.token = localStorage.getItem('token') || ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(response)
    if (res.code !== 200) {
      Message.error(res.msg)
      console.log(res)
      return Promise.reject(res.msg)
    }
    return res.data
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '遇到错误了',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const fetch = (url, data,headers) => {
  return service({
    url,
    method: 'post',
    data,
    headers
  })
}

export default fetch
