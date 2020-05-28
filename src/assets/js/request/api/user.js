/**
 * 登录模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@/assets/js/request/http' // 导入http中创建的axios实例

const user = {
  // get请求
  // articleDetail (id, params) {
  //   return axios.get(`${base.sq}/topic/${id}`, {
  //     params: params
  //   })
  // },
  // post提交
  signUp (params) {
    return axios.post(`${base.dev}/user/addUser`, params)
  },
  login (params) {
    return axios.post(`${base.dev}/user/login`, params)
  }
}

export default user
