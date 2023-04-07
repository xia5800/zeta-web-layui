/** 分页查询返回结果 */
export const pageResult = [
  {
    code: 0,
    message: '操作成功',
    data: {
      list: [
        {
          id: '1610517192565063681',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          name: '歌手分类',
          code: 'singer_type',
          describe: '',
          sortValue: 1,
        },
        {
          id: '1610517192565063680',
          createTime: '2023-01-04 14:03:15',
          createdBy: '0',
          updateTime: '2023-01-04 14:03:15',
          updatedBy: '0',
          name: '设备状态',
          code: 'device_status',
          describe: '设备运行状态',
          sortValue: 0,
        },
      ],
      count: '1',
    },
    error: null,
    success: true,
  },
]

/** 批量查询返回结果 */
export const queryResult = {
  code: 0,
  message: '操作成功',
  data: [
    {
      id: '1610517192565063681',
      createTime: '2023-01-04 14:03:15',
      createdBy: '0',
      updateTime: '2023-01-04 14:03:15',
      updatedBy: '0',
      name: '音乐类型',
      code: 'music_type',
      describe: '音乐类型',
      sortValue: 1,
    },
    {
      id: '1610517192565063680',
      createTime: '2023-01-04 14:03:15',
      createdBy: '0',
      updateTime: '2023-01-04 14:03:15',
      updatedBy: '0',
      name: '设备状态',
      code: 'device_status',
      describe: '设备运行状态',
      sortValue: 0,
    },
  ],
  error: null,
  success: true,
}
