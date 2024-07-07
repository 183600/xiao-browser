import type { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'

// import { defHttp } from '@/utils/http/axios'
import { GetApiData } from '@/apidata/index'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

export function loginApi(params: LoginParams) {
  // return defHttp.post<LoginResultModel>({ url: Api.Login, params })
  return GetApiData<LoginResultModel>({ url: Api.Login, params })
}

export function getUserInfo() {
  // return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo })
  return GetApiData<GetUserInfoModel>({ url: Api.GetUserInfo })
}

export function getPermCode() {
  // return defHttp.get<string[]>({ url: Api.GetPermCode })
  return GetApiData<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  // return defHttp.get({ url: Api.Logout })
  return GetApiData({ url: Api.Logout })
}
