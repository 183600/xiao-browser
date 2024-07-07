import type { getMenuListResultModel } from './model/menuModel'

// import { defHttp } from '@/utils/http/axios'
import { GetApiData } from '@/apidata/index'

enum Api {
  GetMenuList = '/getMenuList',
}

export const getMenuList = () => {
  // return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList })
  return GetApiData<getMenuListResultModel>({ url: Api.GetMenuList })
}
