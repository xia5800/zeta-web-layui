export const dictColumns = [
  {
    title: '',
    type: 'radio',
    width: '50px',
    fixed: 'left',
  },
  {
    key: 'name',
    title: '字典名',
    align: 'center',
  },
  {
    key: 'code',
    title: '字典编码',
    align: 'center',
  },
]

export const dictItemColumns = [
  {
    title: '',
    type: 'checkbox',
    width: '50px',
    fixed: 'left',
  },
  {
    key: 'name',
    title: '字典项',
    align: 'center',
  },
  {
    key: 'value',
    title: '值',
    align: 'center',
  },
  {
    key: 'describe',
    title: '描述',
    align: 'left',
  },
  {
    key: 'sortValue',
    title: '排序',
    align: 'center',
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
