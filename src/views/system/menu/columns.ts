export const columns = [
  {
    key: 'label',
    title: '菜单名称',
    width: '300px',
    customSlot: 'label',
  },
  {
    key: 'path',
    title: '路由地址',
    ellipsisTooltip: true,
  },
  {
    key: 'component',
    title: '组件路径',
    ellipsisTooltip: true,
  },
  {
    key: 'authority',
    title: '权限标识',
  },
  {
    key: 'sortValue',
    title: '排序',
    sort: true,
    width: '100px',
    align: 'center',
  },
  {
    key: 'hide',
    title: '是否隐藏',
    width: '100px',
    align: 'center',
    customSlot: 'hide',
  },
  {
    key: 'type',
    title: '类型',
    width: '100px',
    align: 'center',
    customSlot: 'type',
  },
  {
    key: 'createTime',
    title: '创建时间',
    width: '180px',
    align: 'center',
  },
  {
    key: 'operator',
    title: '操作',
    align: 'left',
    width: '180px',
    customSlot: 'operator',
    fixed: 'right',
  },
]
