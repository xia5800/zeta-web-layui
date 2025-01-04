import { request } from '~/utils/request'
import type { ExportExcelParam } from '~/types/global'
import dayjs from 'dayjs'

/**
 * 获取excel导入模板
 *
 * @param url 获取导入模板的url地址
 * @param filename 文件名，不包含文件后缀 例如：'用户数据'
 * @returns 最终得到'用户数据.xlsx'
 */
export async function useDownloadExcelTemplate(url: string, filename: string) {
  try {
    // 请求接口
    const response = await request.get<Blob>(url, {
      params: {
        fileName: filename,
        type: 'XSSF'
      },
      responseType: 'blob',
    })

    if (response.size === 0) return

    if (response.type === 'application/json') {
      const text = await response.text()
      const { message } = JSON.parse(text)
      layer.msg(message, { icon: 2 })
      return
    }

    // 创建一个 Blob 对象
    const blob = new Blob([response], { type: 'application/octet-stream' })

    // 创建一个 URL 对象
    const urlObject = window.URL.createObjectURL(blob)
    // 创建一个 <a> 元素
    const link = document.createElement('a')
    link.href = urlObject
    link.download = `${filename}.xlsx` // 设置下载的文件名
    link.click()

    // 释放 URL 对象
    window.URL.revokeObjectURL(urlObject)
  } catch (error) {
    console.error('下载文件时出错:', error)
  }
}

/**
 * 获取excel导出数据
 *
 * @param url 获取导出数据的url地址
 * @param param 获取导出数据的请求参数
 * @returns
 */
export async function useExportExcel<T>(url: string, param: ExportExcelParam<T>) {
  try {
    // 处理文件名
    const fileName = param.fileName || '导出数据'
    param.fileName = fileName
    // 处理文件类型
    param.type = param.type || 'XSSF'

    // 请求接口
    const response = await request.post<Blob>(url, {
      data: param,
      responseType: 'blob',
    })

    if (response.size === 0) return

    if (response.type === 'application/json') {
      const text = await response.text()
      const { message } = JSON.parse(text)
      layer.msg(message, { icon: 2 })
      return
    }

    // 创建一个 Blob 对象
    const blob = new Blob([response], { type: 'application/octet-stream' })

    // 创建一个 URL 对象
    const urlObject = window.URL.createObjectURL(blob)
    // 获取当前时间 格式为 yyyyMMddHHmmss
    const currentTime = dayjs().format('YYYYMMDDHHmmss')
    // 创建一个 <a> 元素
    const link = document.createElement('a')
    link.href = urlObject
    link.download = `${fileName}-${currentTime}.xlsx` // 设置下载的文件名
    link.click()

    // 释放 URL 对象
    window.URL.revokeObjectURL(urlObject)
  } catch (err) {
    console.error(err)
  }
}
