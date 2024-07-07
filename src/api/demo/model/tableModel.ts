import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'

export type DemoParams = BasicPageParams

export interface DemoListItem {
  id: string
  beginTime: string
  endTime: string
  address: string
  name: string
  no: number
  type: number
  status: number
}

export type DemoListGetResultModel = BasicFetchResult<DemoListItem>
