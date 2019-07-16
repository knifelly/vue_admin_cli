import AxiosInstance from 'axios'
import router from '@router/index'
import { Loading, Message } from 'element-ui'
import { getStorage } from '../utils/index'
const qs = require('qs')

const ERRORS = {}
const AUTH_ERRORS = {}

let loadingInstance // loading对象
// 显示loading
const showLoading = () => {
  loadingInstance = Loading.service({ fullscreen: true })
}
// 隐藏loading
const hideLoading = () => {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

// 错误处理
const handlerError = (error) => {
  if (ERRORS[error.code]) {
    return Message({
      message: error.message,
      type: 'error',
      center: true,
      onClose: () => {}
    })
  }
  // 权限错误
  if (AUTH_ERRORS[error.code]) {
    router.replace('login')
  }
}

// token拦截器
const tokenInterceptor = (config) => {
  const token = getStorage()
  if (token) {
    config.headers = {
      ...config,
      Authorization: `Bearer ${token}`
    }
  }
  return config
}

// 格式化参数拦截器
const paramsInterceptor = (config) => {
  config.paramsSerializer = (params) => {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false
    })
  }
  return config
}

// 显示loading拦截器
const loadingInterceptor = (config) => {
  showLoading()
  return config
}

// 创建axios实例
const createInstance = (
  options = { showLoading: false, hideLoading: true },
  config = {}
) => {
  // 默认配置
  const defaultConfig = {
    baseURL: process.env.BASE_URL || '/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      // 'X-Requested-With': 'XMLHttpRequest',
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
      // post: {
      //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      // }
    },
    ...config
  }

  const httpClient = AxiosInstance.create(defaultConfig)

  httpClient.interceptors.request.use(tokenInterceptor)
  httpClient.interceptors.request.use(paramsInterceptor)

  if (options.showLoading) {
    httpClient.interceptors.request.use(loadingInterceptor)
  }

  httpClient.interceptors.response.use(
    (res) => {
      if (options.hideLoading) {
        hideLoading()
      }
      if (!res.data) {
        return res
      }
      return res.data.data ? res.data.data : res.data
    },
    (err) => {
      if (options.hideLoading) {
        hideLoading()
      }

      if (AxiosInstance.isCancel(err)) {
        return Promise.reject('REQUEST_CANCELED')
      }
      const { status, statusText, data, headers, request } = err.response
      handlerError(data)
      return Promise.reject(err.response)
    }
  )

  return httpClient
}

// 无loading实例
export const axios = createInstance()
// 有Loading实例
export const axiosLoading = createInstance({
  showLoading: true,
  hideLoading: true
})
// 获取实例方法
export const getAxios = createInstance
export default axios
