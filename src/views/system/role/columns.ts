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
    key: 'name',
    title: '角色名',
    align: 'center',
  },
  {
    key: 'code',
    title: '角色编码',
    align: 'center',
  },
  {
    key: 'describe',
    title: '描述',
    align: 'left',
  },
  {
    key: 'createTime',
    title: '创建时间',
    sort: true,
    align: 'center',
    width: '180px',
  },
  {
    key: 'updateTime',
    title: '修改时间',
    sort: true,
    align: 'center',
    width: '180px',
  },
  {
    key: 'operator',
    title: '操作',
    align: 'center',
    width: '180px',
    customSlot: 'operator',
    fixed: 'right',
  },
]
