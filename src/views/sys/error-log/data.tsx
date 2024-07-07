import { ElTag } from 'element-plus'
import { BasicColumn } from '@/components/BasicTable'
import { ErrorTypeEnum } from '@/enums/exceptionEnum'

export function getLogColumns(): BasicColumn[] {
  return [
    {
      prop: 'type',
      label: '类型',
      width: 80,
      customRender: ({ text }) => {
        const color =
          text === ErrorTypeEnum.VUE ? 'success' : text === ErrorTypeEnum.RESOURCE ? 'warning' : text === ErrorTypeEnum.PROMISE ? 'primary' : ErrorTypeEnum.AJAX ? 'danger' : 'info'

        return <ElTag type={color}>{() => text}</ElTag>
      },
    },
    {
      prop: 'url',
      label: 'URL',
      width: 200,
    },
    {
      prop: 'time',
      label: '时间',
      width: 160,
    },
    {
      prop: 'file',
      label: '文件',
      width: 200,
    },
    {
      prop: 'name',
      label: 'Name',
      width: 200,
    },
    {
      prop: 'message',
      label: '错误信息',
      width: 300,
    },
    {
      prop: 'stack',
      label: 'stack信息',
    },
  ]
}

export function getDescSchema(): any {
  return getLogColumns().map((column) => {
    return {
      field: column.prop!,
      label: column.label,
    }
  })
}
