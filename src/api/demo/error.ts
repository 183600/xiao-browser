import { defHttp } from '@/utils/http/axios'

enum Api {
  Error = '/error',
}

export const fireErrorApi = () => defHttp.get({ url: Api.Error })
