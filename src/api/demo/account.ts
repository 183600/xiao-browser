import type { GetAccountInfoModel } from './model/accountModel'

// import { defHttp } from '@/utils/http/axios'
import { GetApiData } from '@/apidata/index'

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
}

export const accountInfoApi = () => {
  // return defHttp.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO })
  return GetApiData<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO })
}

export const sessionTimeoutApi = () => {
  // return defHttp.post<void>({ url: Api.SESSION_TIMEOUT })
  return GetApiData<void>({ url: Api.SESSION_TIMEOUT })
}

export const tokenExpiredApi = () => {
  // return defHttp.post<void>({ url: Api.TOKEN_EXPIRED })
  return GetApiData<void>({ url: Api.TOKEN_EXPIRED })
}
