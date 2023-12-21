/** 登录用户信息 */
export const loginUserInfo = {
  id: '1610517191113834496',
  username: 'zeta管理员',
  account: 'zetaAdmin',
  sex: 1,
  state: 0,
  avatar: '',
  permissions: [
    'sys:user:view',
    'sys:role:view',
    'sys:menu:view',
    'sys:optLog:view',
    'sys:loginLog:view',
    'sys:file:view',
    'sys:dict:view',
    'sys:user:save',
    'sys:role:save',
    'sys:menu:save',
    'sys:file:save',
    'sys:dict:save',
    'sys:user:update',
    'sys:role:update',
    'sys:menu:update',
    'sys:file:export',
    'sys:dict:update',
    'sys:user:delete',
    'sys:role:delete',
    'sys:menu:delete',
    'sys:file:delete',
    'sys:dict:delete',
    'sys:dictItem:view',
    'sys:dictItem:save',
    'sys:dictItem:update',
    'sys:dictItem:delete',
    'task:view',
    'task:save',
    'task:update',
    'task:delete',
    'task:log:view',
  ],
  roles: [
    'SUPER_ADMIN',
  ],
}

/** 用户菜单 */
export const loginUserMenu = [
  {
    id: '1610517186873393154',
    meta: {
      icon: 'layui-icon-set-fill',
      title: '系统管理',
    },
    name: 'system',
    path: '/system',
    children: [
      {
        id: '1610517186873393155',
        meta: {
          title: '用户管理',
        },
        name: 'system_user',
        path: '/system/user',
        parentId: '1610517186873393154',
        component: 'system/user',
      },
      {
        id: '1610517186873393160',
        meta: {
          title: '角色管理',
        },
        name: 'system_role',
        path: '/system/role',
        parentId: '1610517186873393154',
        component: 'system/role',
      },
      {
        id: '1610517186873393161',
        meta: {
          title: '菜单管理',
        },
        name: 'system_menu',
        path: '/system/menu',
        parentId: '1610517186873393154',
        component: 'system/menu',
      },
      {
        id: '1610517186873393163',
        meta: {
          title: '数据字典',
        },
        name: 'system_dict',
        path: '/system/dict',
        parentId: '1610517186873393154',
        component: 'system/dict',
      },
      {
        id: '1610517186873393164',
        meta: {
          title: '操作日志',
        },
        name: 'system_optLog',
        path: '/system/optRecord',
        parentId: '1610517186873393154',
        component: 'system/optLog',
      },
      {
        id: '1610517186873393165',
        meta: {
          title: '登录日志',
        },
        name: 'system_loginLog',
        path: '/system/loginRecord',
        parentId: '1610517186873393154',
        component: 'system/loginLog',
      },
      {
        id: '1610517186873393166',
        meta: {
          title: '文件管理',
        },
        name: 'system_file',
        path: '/system/file',
        parentId: '1610517186873393154',
        component: 'system/file',
      },
    ],
    redirect: '/system/user',
    parentId: '0',
    component: '',
  },
  {
    id: '1737334253697368064',
    parentId: '0',
    children: [
      {
        id: '1737334253697368065',
        parentId: '1737334253697368064',
        name: 'job_index',
        path: '/job/index',
        component: 'job/job',
        meta: {
          title: '任务列表',
          icon: '',
          hide: false,
          keepAlive: false
        }
      },
      {
        id: '1737334253697368070',
        parentId: '1737334253697368064',
        name: 'job_log',
        path: '/job/log',
        component: 'job/log',
        meta: {
          title: '调度日志',
          icon: '',
          hide: false,
          'keepAlive': false
        }
      }
    ],
    name: 'job',
    path: '/job',
    component: '',
    redirect: '/job/index',
    meta: {
      title: '任务管理',
      icon: 'layui-icon-time',
      hide: false,
      keepAlive: false
    }
  },
  {
    id: '90000',
    parentId: '0',
    path: '/example',
    name: 'example',
    meta: {
      icon: 'layui-icon-template',
      title: '案例',
    },
    component: '',
    children: [
      {
        id: '90001',
        parentId: '90000',
        path: '/example/menu',
        name: 'example_menu',
        meta: {
          icon: 'layui-icon-align-right',
          title: '多级菜单',
        },
        component: '',
        children: [
          {
            id: '90002',
            parentId: '900001',
            path: '/example/menu1',
            name: 'example_menu1',
            meta: {
              title: '菜单1',
              icon: 'layui-icon-align-right',
            },
            component: '',
            children: [
              {
                id: '90003',
                parentId: '90002',
                path: '/example/menu1/menu11',
                name: 'example_menu11',
                meta: {
                  title: '菜单1-1',
                  icon: 'layui-icon-align-right',
                },
                component: 'example/menu/menu1/menu11/index',
              },
              {
                id: '90004',
                parentId: '90002',
                path: '/example/menu1/menu12',
                name: 'example_menu12',
                meta: {
                  title: '菜单1-2',
                  icon: 'layui-icon-align-right',
                },
                component: '',
                children: [
                  {
                    id: '90005',
                    parentId: '90004',
                    path: '/example/menu1/menu121',
                    name: 'example_menu121',
                    meta: {
                      title: '菜单1-2-1',
                      icon: 'layui-icon-align-right',
                    },
                    component: 'example/menu/menu1/menu12/menu121/index',
                  },
                  {
                    id: '90006',
                    parentId: '90004',
                    path: '/example/menu1/menu122',
                    name: 'example_menu122',
                    meta: {
                      title: '菜单1-2-2',
                      icon: 'layui-icon-align-right',
                    },
                    component: 'example/menu/menu1/menu12/menu122/index',
                  },
                ],
              },
              {
                id: '90007',
                parentId: '90002',
                path: '/example/menu1/menu13',
                name: 'example_menu13',
                meta: {
                  title: '菜单1-3',
                  icon: 'layui-icon-align-right',
                },
                component: 'example/menu/menu1/menu13/index',
              },
            ],
          },
          {
            path: '/example/menu2',
            name: 'example_menu2',
            meta: {
              title: '菜单2',
              icon: 'layui-icon-align-right',
            },
            component: 'example/menu/menu2',
          },
        ],
      },
      {
        id: '90020',
        parentId: '90000',
        path: '/example/directive',
        name: 'example_directive',
        meta: {
          title: '内置指令',
        },
        component: '',
        children: [
          {
            id: '90021',
            parentId: '90020',
            path: '/example/directive/permission',
            name: 'example_directive_permission',
            meta: {
              title: '权限指令',
            },
            component: 'example/directive/permission/index',
          },
        ],
      },
      {
        id: '90030',
        parentId: '90000',
        path: '/example/link',
        name: 'example_link',
        meta: {
          title: '内链外链',
        },
        component: '',
        children: [
          {
            id: '90031',
            parentId: '90030',
            path: '/example/link/baidu',
            name: 'example_link_baidu',
            meta: {
              title: '百度一下 (外链)',
              href: 'https://www.baidu.com',
            },
            component: 'BlankLayout',
          },
          {
            id: '90032',
            parentId: '90030',
            path: '/example/link/layui-vue',
            name: 'example_link_layui-vue',
            meta: {
              title: 'layui-vue (内链)',
              frameSrc: 'http://www.layui-vue.com/zh-CN/components',
            },
            component: 'Frame',
          },
        ],
      },
    ],
  },
  {
    id: '99999',
    parentId: '0',
    path: '/about',
    name: 'about',
    meta: {
      icon: 'layui-icon-chat',
      affix: false,
      title: '关于',
    },
    component: 'common/about/index',
  },
]
