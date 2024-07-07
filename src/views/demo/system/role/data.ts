import { h } from 'vue'
import { setRoleStatus } from '@/api/demo/system'
import { BasicColumn } from '@/components/BasicTable'
import { BasicFormSchema } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'
import { ElSwitch } from 'element-plus'

export const columns: BasicColumn[] = [
  {
    label: '角色名称',
    prop: 'roleName',
    width: 200,
  },
  {
    label: '角色值',
    prop: 'roleValue',
    width: 180,
  },
  {
    label: '排序',
    prop: 'orderNo',
    width: 50,
  },
  {
    label: '状态',
    prop: 'status',
    width: 120,
    customRender: ({ record, scope }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        scope.row.pendingStatus = false
      }
      return h(ElSwitch, {
        modelValue: record?.status === '0',
        activeText: 'Y',
        inactiveText: 'N',
        inlinePrompt: true,
        loading: record?.pendingStatus,
        onChange(checked: boolean) {
          scope.row.pendingStatus = true
          const newStatus = checked ? '0' : '1'
          const { createMessage } = useMessage()
          setRoleStatus(record.id, newStatus)
            .then(() => {
              scope.row.status = newStatus
              createMessage.success(`已成功修改角色状态`)
            })
            .catch(() => {
              createMessage.error('修改角色状态失败')
            })
            .finally(() => {
              scope.row.pendingStatus = false
            })
        },
      })
    },
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
  {
    label: '备注',
    prop: 'remark',
  },
]

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElSelect',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
]

export const formSchema: BasicFormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'ElInput',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'ElInput',
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElRadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'ElInput',
    componentProps: {
      type: 'textarea',
    },
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'ElInput',
  },
]
