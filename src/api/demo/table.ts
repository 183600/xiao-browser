import type { DemoParams, DemoListGetResultModel } from './model/tableModel'

// import { defHttp } from '@/utils/http/axios'
import { GetApiData } from '@/apidata/index'

enum Api {
  DEMO_LIST = '/table/getDemoList',
}

export const demoListApi = (params: DemoParams) => {
  // return defHttp.get<DemoListGetResultModel>({
  return GetApiData<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  })
}
