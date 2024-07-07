import type { AppRouteModule, MenuTag } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'

const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    orderNo: 2,
    icon: 'ep:coin',
    title: '组件',
    tag: {
      type: 'success',
      content: 'New',
      dot: false,
    } as MenuTag,
  },

  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () => import('@/views/demo/comp/button/index.vue'),
      meta: {
        icon: 'ep:coin',
        title: '基础组件',
      },
    },

    {
      path: 'form',
      name: 'FormDemo',
      redirect: '/comp/form/basic',
      component: getParentLayout('FormDemo'),
      meta: {
        title: 'Form',
        tag: {
          type: 'error',
          content: 'Hot',
          dot: false,
        } as MenuTag,
      },
      children: [
        {
          path: 'basic',
          name: 'FormBasicDemo',
          component: () => import('@/views/demo/form/index.vue'),
          meta: {
            title: '基础表单',
          },
        },
        {
          path: 'useForm',
          name: 'UseFormDemo',
          component: () => import('@/views/demo/form/UseForm.vue'),
          meta: {
            title: 'useForm',
          },
        },
        {
          path: 'refForm',
          name: 'RefFormDemo',
          component: () => import('@/views/demo/form/RefForm.vue'),
          meta: {
            title: 'RefForm',
          },
        },
        {
          path: 'advancedForm',
          name: 'AdvancedFormDemo',
          component: () => import('@/views/demo/form/AdvancedForm.vue'),
          meta: {
            title: '可收缩表单',
          },
        },
        {
          path: 'ruleForm',
          name: 'RuleFormDemo',
          component: () => import('@/views/demo/form/RuleForm.vue'),
          meta: {
            title: '表单验证',
          },
        },
        {
          path: 'dynamicForm',
          name: 'DynamicFormDemo',
          component: () => import('@/views/demo/form/DynamicForm.vue'),
          meta: {
            title: '动态表单',
          },
        },
        {
          path: 'customerForm',
          name: 'CustomerFormDemo',
          component: () => import('@/views/demo/form/CustomerForm.vue'),
          meta: {
            title: '自定义组件',
          },
        },
        {
          path: 'appendForm',
          name: 'appendFormDemo',
          component: () => import('@/views/demo/form/AppendForm.vue'),
          meta: {
            title: '表单增删示例',
          },
        },
      ],
    },
    {
      path: 'table',
      name: 'TableDemo',
      redirect: '/comp/table/basic',
      component: getParentLayout('TableDemo'),
      meta: {
        title: 'Table',
        tag: {
          type: 'error',
          content: 'Hot',
          dot: false,
        } as MenuTag,
      },

      children: [
        {
          path: 'basic',
          name: 'TableBasicDemo',
          component: () => import('@/views/demo/table/Basic.vue'),
          meta: {
            title: '基础表格',
          },
        },
        {
          path: 'treeTable',
          name: 'TreeTableDemo',
          component: () => import('@/views/demo/table/TreeTable.vue'),
          meta: {
            title: '树形表格',
          },
        },
        {
          path: 'fetchTable',
          name: 'FetchTableDemo',
          component: () => import('@/views/demo/table/FetchTable.vue'),
          meta: {
            title: '远程加载示例',
          },
        },
        {
          path: 'fixedColumn',
          name: 'FixedColumnDemo',
          component: () => import('@/views/demo/table/FixedColumn.vue'),
          meta: {
            title: '固定列',
          },
        },
        {
          path: 'customerCell',
          name: 'CustomerCellDemo',
          component: () => import('@/views/demo/table/CustomerCell.vue'),
          meta: {
            title: '自定义列',
          },
        },
        {
          path: 'formTable',
          name: 'FormTableDemo',
          component: () => import('@/views/demo/table/FormTable.vue'),
          meta: {
            title: '开启搜索区域',
          },
        },
        {
          path: 'useTable',
          name: 'UseTableDemo',
          component: () => import('@/views/demo/table/UseTable.vue'),
          meta: {
            title: 'UseTable',
          },
        },
        {
          path: 'refTable',
          name: 'RefTableDemo',
          component: () => import('@/views/demo/table/RefTable.vue'),
          meta: {
            title: 'RefTable',
          },
        },
        {
          path: 'footerTable',
          name: 'FooterTableDemo',
          component: () => import('@/views/demo/table/FooterTable.vue'),
          meta: {
            title: '表尾行合计',
          },
        },
        {
          path: 'authColumn',
          name: 'AuthColumnDemo',
          component: () => import('@/views/demo/table/AuthColumn.vue'),
          meta: {
            title: '权限列',
          },
        },
      ],
    },
    {
      path: 'transition',
      name: 'transitionDemo',
      component: () => import('@/views/demo/comp/transition/index.vue'),
      meta: {
        title: '动画组件',
      },
    },
    {
      path: 'timestamp',
      name: 'TimeDemo',
      component: () => import('@/views/demo/comp/time/index.vue'),
      meta: {
        title: '相对时间',
      },
    },
    {
      path: 'countTo',
      name: 'CountTo',
      component: () => import('@/views/demo/comp/count-to/index.vue'),
      meta: {
        title: '数字动画',
      },
    },
    {
      path: 'tree',
      name: 'TreeDemo',
      redirect: '/comp/tree/basic',
      component: getParentLayout('TreeDemo'),
      meta: {
        title: 'Tree',
      },
      children: [
        {
          path: 'basic',
          name: 'BasicTreeDemo',
          component: () => import('@/views/demo/tree/index.vue'),
          meta: {
            title: '基础树',
          },
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () => import('@/views/demo/tree/EditTree.vue'),
          meta: {
            title: '操作示例',
          },
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () => import('@/views/demo/tree/ActionTree.vue'),
          meta: {
            title: '函数示例',
          },
        },
      ],
    },
    {
      path: 'scroll',
      name: 'ScrollDemo',
      redirect: '/comp/scroll/basic',
      component: getParentLayout('ScrollDemo'),
      meta: {
        title: '滚动组件',
      },
      children: [
        {
          path: 'basic',
          name: 'BasicScrollDemo',
          component: () => import('@/views/demo/comp/scroll/index.vue'),
          meta: {
            title: '基础滚动',
          },
        },
        {
          path: 'action',
          name: 'ActionScrollDemo',
          component: () => import('@/views/demo/comp/scroll/Action.vue'),
          meta: {
            title: '滚动函数',
          },
        },
        {
          path: 'virtualScroll',
          name: 'VirtualScrollDemo',
          component: () => import('@/views/demo/comp/scroll/VirtualScroll.vue'),
          meta: {
            title: '虚拟滚动',
          },
        },
      ],
    },

    {
      path: 'modal',
      name: 'ModalDemo',
      component: () => import('@/views/demo/comp/modal/index.vue'),
      meta: {
        title: '弹窗扩展',
        tag: {
          type: 'warn',
          content: 'Hot',
          dot: true,
        } as MenuTag,
      },
    },
    {
      path: 'drawer',
      name: 'DrawerDemo',
      component: () => import('@/views/demo/comp/drawer/index.vue'),
      meta: {
        title: '抽屉扩展',
        tag: {
          type: 'primary',
          content: 'Hot',
          dot: true,
        } as MenuTag,
      },
    },
    {
      path: 'desc',
      name: 'DescDemo',
      component: () => import('@/views/demo/comp/desc/index.vue'),
      meta: {
        title: '详情组件',
      },
    },

    {
      path: 'lazy',
      name: 'LazyDemo',
      component: getParentLayout('LazyDemo'),
      redirect: '/comp/lazy/basic',
      meta: {
        title: '懒加载组件',
      },
      children: [
        {
          path: 'basic',
          name: 'BasicLazyDemo',
          component: () => import('@/views/demo/comp/lazy/index.vue'),
          meta: {
            title: '基础示例',
          },
        },
        {
          path: 'transition',
          name: 'BasicTransitionDemo',
          component: () => import('@/views/demo/comp/lazy/Transition.vue'),
          meta: {
            title: '动画效果',
          },
        },
      ],
    },
    {
      path: 'verify',
      name: 'VerifyDemo',
      component: getParentLayout('VerifyDemo'),
      redirect: '/comp/verify/drag',
      meta: {
        title: '验证组件',
      },
      children: [
        {
          path: 'drag',
          name: 'VerifyDragDemo',
          component: () => import('@/views/demo/comp/verify/index.vue'),
          meta: {
            title: '拖拽校验',
          },
        },
        {
          path: 'rotate',
          name: 'VerifyRotateDemo',
          component: () => import('@/views/demo/comp/verify/Rotate.vue'),
          meta: {
            title: '图片还原',
          },
        },
      ],
    },
    {
      path: 'strength-meter',
      name: 'StrengthMeterDemo',
      component: () => import('@/views/demo/comp/strength-meter/index.vue'),
      meta: {
        title: '密码强度组件',
      },
    },
    {
      path: 'upload',
      name: 'UploadDemo',
      component: () => import('@/views/demo/comp/upload/index.vue'),
      meta: {
        title: '上传组件',
      },
    },
    {
      path: 'loading',
      name: 'LoadingDemo',
      component: () => import('@/views/demo/comp/loading/index.vue'),
      meta: {
        title: 'Loading',
      },
    },
  ],
}

export default comp
