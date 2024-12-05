import axios from 'axios'
import { message  } from "antd";
import { getStorage } from '../utils/storage'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

// 请求前拦截
const requestInterceptor = (config) => {
  const token = getStorage('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
}

// 响应拦截
const responseInterceptor = (response) => {
  const result = response.data
  const { data, status, code, message: msg  } = result
  if(!status) {
    message.error(msg)
    return Promise.reject({
      message: msg,
      code
    })
  }
  return data
}

request.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error)
})
request.interceptors.response.use(responseInterceptor, (error) => {
  return Promise.reject(error)
})

export default request
