import type { UploadFileParams } from '#/axios'
import type { UploadApiResult } from './model/uploadModel'

import { defHttp } from '@/utils/http/axios'
import { useGlobSetting } from '@/hooks/setting'

const { uploadUrl = '' } = useGlobSetting()

export function uploadApi(params: UploadFileParams, onUploadProgress?: (progressEvent: ProgressEvent) => void) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  )
}
