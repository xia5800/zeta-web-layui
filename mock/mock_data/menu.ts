/**
 * 特别说明：
 * 此文件是后端“菜单管理”接口返回的数据。
 * 如果想要修改系统左侧菜单栏数据
 * 请前往`mock/_data/login.ts`文件
 * 找到`loginUserMenu`进行修改
 */

/** 菜单树 */
export const menuTree = {
  code: 0,
  message: '操作成功',
  data: [
    {
      id: '1610517186873393154',
      createTime: '2023-01-04 14:03:14',
      createdBy: '0',
      updateTime: '2023-01-04 14:03:14',
      updatedBy: '0',
      label: '系统管理',
      parentId: '0',
      sortValue: 2,
      children: [
        {
          id: '1610517186873393155',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '用户管理',
          parentId: '1610517186873393154',
          sortValue: 1,
          children: [
            {
              id: '1610517186873393156',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '查看用户',
              parentId: '1610517186873393155',
              sortValue: 1,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:user:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393157',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '新增用户',
              parentId: '1610517186873393155',
              sortValue: 2,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:user:save',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393158',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '修改用户',
              parentId: '1610517186873393155',
              sortValue: 3,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:user:update',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393159',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '删除用户',
              parentId: '1610517186873393155',
              sortValue: 4,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:user:delete',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
          ],
          name: 'system_user',
          path: '/system/user',
          component: 'system/user/index',
          redirect: null,
          icon: null,
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          checked: null,
        },
        {
          id: '1610517186873393160',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '角色管理',
          parentId: '1610517186873393154',
          sortValue: 2,
          children: [
            {
              id: '1610517186873393161',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '查看角色',
              parentId: '1610517186873393160',
              sortValue: 1,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:role:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393162',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '新增角色',
              parentId: '1610517186873393160',
              sortValue: 2,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:role:save',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393163',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '修改角色',
              parentId: '1610517186873393160',
              sortValue: 3,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:role:update',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393164',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '删除角色',
              parentId: '1610517186873393160',
              sortValue: 4,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:role:delete',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
          ],
          name: 'system_role',
          path: '/system/role',
          component: 'system/role/index',
          redirect: null,
          icon: 'carbon:user-role',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          checked: null,
        },
        {
          id: '1610517186873393165',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '菜单管理',
          parentId: '1610517186873393154',
          sortValue: 3,
          children: [
            {
              id: '1610517186873393166',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '查看菜单',
              parentId: '1610517186873393165',
              sortValue: 1,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:menu:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393167',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '新增菜单',
              parentId: '1610517186873393165',
              sortValue: 2,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:menu:save',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393168',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '修改菜单',
              parentId: '1610517186873393165',
              sortValue: 3,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:menu:update',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393169',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '删除菜单',
              parentId: '1610517186873393165',
              sortValue: 4,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:menu:delete',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
          ],
          name: 'system_menu',
          path: '/system/menu',
          component: 'system/menu/index',
          redirect: null,
          icon: 'ic:sharp-menu',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          checked: null,
        },
        {
          id: '1610517186873393170',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '操作日志',
          parentId: '1610517186873393154',
          sortValue: 4,
          children: [
            {
              id: '1610517186873393171',
              createTime: '2023-01-04 14:03:14',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:14',
              updatedBy: '0',
              label: '查看操作日志',
              parentId: '1610517186873393170',
              sortValue: 1,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:optLog:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
          ],
          name: 'system_optLog',
          path: '/system/optLog',
          component: 'system/optLog/index',
          redirect: null,
          icon: null,
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          checked: null,
        },
        {
          id: '1610517186873393172',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          label: '登录日志',
          parentId: '1610517186873393154',
          sortValue: 5,
          children: [
            {
              id: '1610517186873393173',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '查看登录日志',
              parentId: '1610517186873393172',
              sortValue: 1,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:loginLog:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
          ],
          name: 'system_loginLog',
          path: '/system/loginLog',
          component: 'system/loginLog/index',
          redirect: null,
          icon: null,
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          checked: null,
        },
        {
          id: '1610517186873393174',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          label: '文件管理',
          parentId: '1610517186873393154',
          sortValue: 6,
          children: [
            {
              id: '1610517186873393175',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '查看文件',
              parentId: '1610517186873393174',
              sortValue: 1,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:file:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393176',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '上传文件',
              parentId: '1610517186873393174',
              sortValue: 2,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:file:save',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393177',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '下载文件',
              parentId: '1610517186873393174',
              sortValue: 3,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:file:export',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393178',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '删除文件',
              parentId: '1610517186873393174',
              sortValue: 4,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:file:delete',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
          ],
          name: 'system_file',
          path: '/system/file',
          component: 'system/file/index',
          redirect: null,
          icon: null,
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          checked: null,
        },
        {
          id: '1610517186873393179',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          label: '数据字典',
          parentId: '1610517186873393154',
          sortValue: 7,
          children: [
            {
              id: '1610517186873393180',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '查看字典',
              parentId: '1610517186873393179',
              sortValue: 1,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dict:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393181',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '新增字典',
              parentId: '1610517186873393179',
              sortValue: 2,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dict:save',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393182',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '修改字典',
              parentId: '1610517186873393179',
              sortValue: 3,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dict:update',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393183',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '删除字典',
              parentId: '1610517186873393179',
              sortValue: 4,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dict:delete',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393184',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '查看字典项',
              parentId: '1610517186873393179',
              sortValue: 5,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dictItem:view',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393185',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '新增字典项',
              parentId: '1610517186873393179',
              sortValue: 6,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dictItem:save',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393186',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '修改字典项',
              parentId: '1610517186873393179',
              sortValue: 7,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dictItem:update',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
            {
              id: '1610517186873393187',
              createTime: '2023-01-04 14:03:15',
              createdBy: '0',
              updateTime: '2023-01-04 14:03:15',
              updatedBy: '0',
              label: '删除字典项',
              parentId: '1610517186873393179',
              sortValue: 8,
              children: null,
              name: null,
              path: null,
              component: null,
              redirect: null,
              icon: null,
              authority: 'sys:dictItem:delete',
              type: 'RESOURCE',
              deleted: false,
              hide: false,
              keepAlive: false,
              href: null,
              checked: null,
            },
          ],
          name: 'system_dict',
          path: '/system/dict',
          component: 'system/dict/index',
          redirect: null,
          icon: null,
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          checked: null,
        },
      ],
      name: 'system',
      path: '/system',
      component: null,
      redirect: null,
      icon: 'layui-icon-app',
      authority: '',
      type: 'MENU',
      deleted: false,
      hide: false,
      keepAlive: false,
      href: null,
      checked: null,
    },
  ],
  error: null,
  success: true,
}

/** 菜单树 不包含按钮 */
export const menuTreeNoButton = {
  code: 0,
  message: '操作成功',
  data: [
    {
      id: '1610517186869198848',
      createTime: '2023-01-04 14:03:14',
      createdBy: '0',
      updateTime: '2023-01-04 14:03:14',
      updatedBy: '0',
      label: 'dashboard',
      parentId: '0',
      sortValue: 1,
      children: [
        {
          id: '1610517186873393152',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '分析页',
          parentId: '1610517186869198848',
          sortValue: 2,
          children: null,
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'dashboard/analysis/index',
          redirect: null,
          icon: 'layui-icon-chart-screen',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
        {
          id: '1610517186873393153',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '工作台',
          parentId: '1610517186869198848',
          sortValue: 1,
          children: null,
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'dashboard/workbench/index',
          redirect: null,
          icon: 'layui-icon-engine',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
      ],
      name: 'dashboard',
      path: '/dashboard',
      component: null,
      redirect: '/dashboard/analysis',
      icon: 'layui-icon-component',
      authority: '',
      type: 'MENU',
      deleted: false,
      hide: false,
      keepAlive: false,
      href: null,
      frameSrc: null,
      checked: null,
    },
    {
      id: '1610517186873393154',
      createTime: '2023-01-04 14:03:14',
      createdBy: '0',
      updateTime: '2023-01-04 14:03:14',
      updatedBy: '0',
      label: '系统管理',
      parentId: '0',
      sortValue: 2,
      children: [
        {
          id: '1610517186873393155',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '用户管理',
          parentId: '1610517186873393154',
          sortValue: 1,
          children: null,
          name: 'system_user',
          path: '/system/user',
          component: 'system/user/index',
          redirect: null,
          icon: 'ph:user-duotone',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
        {
          id: '1610517186873393160',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '角色管理',
          parentId: '1610517186873393154',
          sortValue: 2,
          children: null,
          name: 'system_role',
          path: '/system/role',
          component: 'system/role/index',
          redirect: null,
          icon: 'carbon:user-role',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
        {
          id: '1610517186873393165',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '菜单管理',
          parentId: '1610517186873393154',
          sortValue: 3,
          children: null,
          name: 'system_menu',
          path: '/system/menu',
          component: 'system/menu/index',
          redirect: null,
          icon: 'ic:sharp-menu',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
        {
          id: '1610517186873393170',
          createTime: '2023-01-04 14:03:14',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:14',
          updatedBy: '0',
          label: '操作日志',
          parentId: '1610517186873393154',
          sortValue: 4,
          children: null,
          name: 'system_optLog',
          path: '/system/optLog',
          component: 'system/optLog/index',
          redirect: null,
          icon: 'carbon:flow-logs-vpc',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
        {
          id: '1610517186873393172',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          label: '登录日志',
          parentId: '1610517186873393154',
          sortValue: 5,
          children: null,
          name: 'system_loginLog',
          path: '/system/loginLog',
          component: 'system/loginLog/index',
          redirect: null,
          icon: 'carbon:flow-logs-vpc',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
        {
          id: '1610517186873393174',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          label: '文件管理',
          parentId: '1610517186873393154',
          sortValue: 6,
          children: null,
          name: 'system_file',
          path: '/system/file',
          component: 'system/file/index',
          redirect: null,
          icon: 'ic:baseline-file-copy',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
        {
          id: '1610517186873393179',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          label: '数据字典',
          parentId: '1610517186873393154',
          sortValue: 7,
          children: null,
          name: 'system_dict',
          path: '/system/dict',
          component: 'system/dict/index',
          redirect: null,
          icon: 'arcticons:colordict',
          authority: '',
          type: 'MENU',
          deleted: false,
          hide: false,
          keepAlive: false,
          href: null,
          frameSrc: null,
          checked: null,
        },
      ],
      name: 'system',
      path: '/system',
      component: null,
      redirect: null,
      icon: 'system-uicons:grid',
      authority: '',
      type: 'MENU',
      deleted: false,
      hide: false,
      keepAlive: false,
      href: null,
      frameSrc: null,
      checked: null,
    },
  ],
  error: null,
  success: true,
}