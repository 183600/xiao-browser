import { BasicFetchResult } from '@/api/model/baseModel'

export interface DemoOptionsItem {
  label: string
  value: string
}

export interface selectParams {
  id: number | string
}

export type DemoOptionsGetResultModel = BasicFetchResult<DemoOptionsItem>
