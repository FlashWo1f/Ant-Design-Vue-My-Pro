import axios from 'axios'
import { notification } from 'ant-design-vue'

function request(options) {
  return axios(options).then(res => {
    return res
  }).catch(error => {
    const { response: { status, statusText } } = error
    notification.error({
      message: status || '服务异常',
      description: statusText || '您没有权限访问，请联系管理员。'
    })
    // reject 避免走 resolve => 被.then
    return Promise.reject()
  })
}

export default request