import { layer } from '@layui/layer-vue'

export function useConfirm(msg: string, callback: Function) {
  const layerId = layer.confirm(msg, {
    title: '提示',
    icon: 3,
    btn: [
      {
        text: '确定',
        callback: async () => {
          callback(layerId)
        },
      },
      { text: '取消', callback: () => { layer.close(layerId) } },
    ],
  })
}
