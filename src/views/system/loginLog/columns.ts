export const columns = [
  {
    title: '',
    type: 'checkbox',
    width: '50px',
    fixed: 'left',
  },
  // {
  //   title: '#',
  //   type: 'number',
  //   width: '50px',
  //   fixed: 'left',
  // },
  {
    key: 'state',
    title: '状态',
    sort: true,
    align: 'center',
    width: '140px',
    customSlot: 'state',
  },
  {
    key: 'account',
    title: '账号',
    align: 'center',
    width: '140px',
  },
  {
    key: 'createTime',
    title: '登录时间',
    align: 'center',
    sort: true,
    width: '180px',
  },
  {
    key: 'comments',
    title: '备注',
  },
  {
    key: 'os',
    title: '操作系统',
    align: 'center',
  },
  {
    key: 'device',
    title: '设备名称',
    align: 'center',
    width: '180px',
    ellipsisTooltip: true,
  },
  {
    key: 'browser',
    title: '浏览器类型',
    align: 'center',
  },
  {
    key: 'ip',
    title: 'ip地址',
    align: 'center',
  },
]
