import type { DemoOptionsItem, selectParams } from './model/optionsModel'

// import { defHttp } from '@/utils/http/axios'
import { GetApiData } from '@/apidata/index'

enum Api {
  OPTIONS_LIST = '/select/getDemoOptions',
}

export const optionsListApi = (params?: selectParams) => {
  // return defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params })
  return GetApiData<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params })
}
