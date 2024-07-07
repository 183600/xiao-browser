import { BasicFormProps, BasicFormSchema } from '@/components/BasicForm'
import { BasicColumn } from '@/components/BasicTable'
import { ElTag } from 'element-plus'
import { h } from 'vue'

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 100,
    },
    {
      label: '姓名',
      prop: 'nickname',
      width: 100,
    },
    {
      label: '性别',
      prop: 'sex',
      width: 100,
      filters: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
      // filterMultiple: false,
      customRender: ({ record }) => {
        const color = record.sex === 1 ? 'success' : 'danger'
        const text = record.sex === 1 ? '男' : '女'
        return h(ElTag, { type: color }, () => text)
      },
    },
    {
      label: '编号',
      prop: 'no',
      width: 100,
      sortable: true,
    },
    {
      label: '地址',
      prop: 'address',
    },
    {
      label: '描述',
      prop: 'description',
      align: 'left',
    },
    {
      label: '开始时间',
      width: 180,
      sortable: true,
      prop: 'beginTime',
    },
    {
      label: '结束时间',
      width: 180,
      sortable: true,
      prop: 'endTime',
    },
  ]
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      width: 150,
      prop: 'id',
      sortable: true,
      sortOrder: 'ascend',
    },
    {
      label: '姓名',
      prop: 'name',
      width: 120,
    },
    {
      label: '地址',
      prop: 'address',
    },
    {
      label: '编号',
      prop: 'no',
      width: 80,
    },
  ]
}

export function getCustomCellColumns(): BasicColumn[] {
  return [
    {
      label: 'ID',
      prop: 'id',
      isSlot: true,
    },
    {
      label: '头像',
      prop: 'avatar',
      width: 100,
      isSlot: true,
    },
    {
      label: '分类',
      prop: 'category',
      width: 80,
      defaultHidden: true,
      isSlot: true,
    },
    {
      label: '姓名',
      prop: 'name',
      width: 120,
    },
    {
      label: '图片列表1',
      prop: 'photos',
      helpMessage: ['这是简单模式的图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
      width: 140,
      isSlot: true,
    },
    {
      label: '照片列表2',
      prop: 'imgs',
      width: 160,
      isSlot: true,
    },
    {
      label: '地址',
      helpMessage: ['这是地址'],
      prop: 'address',
    },
    {
      label: '编号',
      prop: 'no',
      isSlot: true,
    },
    {
      label: '开始时间',
      prop: 'beginTime',
    },
    {
      label: '结束时间',
      prop: 'endTime',
    },
  ]
}

export const getAdvanceSchema = (itemNumber = 6): BasicFormSchema[] => {
  const arr: any = []
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'ElInput',
      colProps: {
        lg: 12,
        xl: 8,
      },
    })
  }
  return arr
}

export function getFormConfig(): Partial<BasicFormProps> {
  return {
    labelWidth: 100,
    showAdvancedButton: true,
    alwaysShowLines: 1,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field9`,
        label: `Slot示例9`,
        component: 'ElInput',
        colProps: {
          lg: 12,
          xl: 8,
        },
      },
      {
        field: `field10`,
        label: `Slot示例10`,
        component: 'ElInput',
        slot: 'field10',
        colProps: {
          lg: 12,
          xl: 8,
        },
      },
    ],
  }
}

export function getTotalColumns(): BasicColumn[] {
  return [
    {
      label: '姓名',
      prop: 'nickname',
    },
    {
      label: 'ID',
      prop: 'id',
    },
    {
      label: '性别',
      prop: 'sex',
      filters: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
      customRender: ({ record }) => {
        const color = record.sex === 1 ? 'success' : 'danger'
        const text = record.sex === 1 ? '男' : '女'
        return h(ElTag, { type: color }, () => text)
      },
    },
    {
      label: '年龄',
      prop: 'age',
    },
    {
      label: '编号',
      prop: 'no',
    },
    {
      label: '地址',
      prop: 'address',
    },
  ]
}

export function getAuthColumns(): BasicColumn[] {
  return [
    {
      label: '编号',
      prop: 'no',
      width: 100,
    },
    {
      label: '姓名',
      prop: 'name',
      auth: 'test', // 根据权限控制是否显示: 无权限，不显示
    },
    {
      label: '状态',
      prop: 'status',
    },
    {
      label: '地址',
      prop: 'address',
      auth: 'admin', // 同时根据权限和业务控制是否显示
      ifShow: true,
    },
    {
      label: '开始时间',
      prop: 'beginTime',
    },
    {
      label: '结束时间',
      prop: 'endTime',
    },
  ]
}
