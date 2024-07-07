import { createFailMsg, createFakeUserList, createSuccessMsg, getFakeUserToken } from '../util'

// single
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    title: '仪表盘',
    hideChildrenInMenu: true,
    icon: 'ep:data-line',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: '分析页',
        currentActiveMenu: '/dashboard',
        icon: 'ep:data-line',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: '工作台',
        currentActiveMenu: '/dashboard',
        icon: 'ep:cpu',
      },
    },
  ],
}

const backRoute = {
  path: 'back',
  name: 'PermissionBackDemo',
  meta: {
    title: '基于后台权限',
  },

  children: [
    {
      path: 'page',
      name: 'BackAuthPage',
      component: '/demo/permission/back/index',
      meta: {
        title: '页面权限',
      },
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/demo/permission/back/Btn',
      meta: {
        title: '按钮权限',
      },
    },
  ],
}

const authRoute = {
  path: '/permission',
  name: 'Permission',
  component: 'LAYOUT',
  redirect: '/permission/front/page',
  meta: {
    icon: 'ep:key',
    title: '权限管理',
  },
  children: [backRoute],
}

const levelRoute = {
  path: '/level',
  name: 'Level',
  component: 'LAYOUT',
  redirect: '/level/menu1/menu1-1',
  meta: {
    icon: 'ep:finished',
    title: '多级菜单',
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      meta: {
        title: 'Menu1',
      },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          meta: {
            title: 'Menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: '/demo/level/Menu111',
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: '/demo/level/Menu12',
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: '/demo/level/Menu2',
      meta: {
        title: 'Menu2',
      },
    },
  ],
}

const sysRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  redirect: '/system/account',
  meta: {
    icon: 'ep:setting',
    title: '系统管理',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: '账号管理',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/account/index',
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: '账号详情',
        ignoreKeepAlive: true,
        currentActiveMenu: '/system/account',
      },
      component: '/demo/system/account/AccountDetail',
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: '角色管理',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/role/index',
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: '菜单管理',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/menu/index',
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: '部门管理',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/dept/index',
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: '修改密码',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/password/index',
    },
  ],
}

const linkRoute = {
  path: '/link',
  name: 'Link',
  component: 'LAYOUT',
  meta: {
    icon: 'ep:top-right',
    title: '外部页面',
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      meta: {
        title: '项目文档(内嵌)',
        frameSrc: 'http://tony.crlang.com/doc/',
      },
    },
    {
      path: 'http://tony.crlang.com/doc/',
      name: 'DocExternal',
      component: 'LAYOUT',
      meta: {
        title: '项目文档(外链)',
      },
    },
  ],
}

export default [
  {
    url: '/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (_params) => {
      return new Promise((resolve, reject) => {
        const checkUser = createFakeUserList().find((item) => item.token === getFakeUserToken())
        if (!checkUser) {
          return reject(createFailMsg('用户信息错误或不存在'))
        }

        const id = checkUser.userId
        let menu: Object[]
        switch (id) {
        case '1':
          dashboardRoute.redirect = `${dashboardRoute.path}/${dashboardRoute.children[0].path}`
          menu = [dashboardRoute, authRoute, levelRoute, sysRoute, linkRoute]
          break
        case '2':
          dashboardRoute.redirect = `${dashboardRoute.path}/${dashboardRoute.children[1].path}`
          menu = [dashboardRoute, authRoute, levelRoute, linkRoute]
          break
        default:
          menu = []
        }
        return resolve(createSuccessMsg(menu))
      })
    },
  },
]
