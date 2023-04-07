/**
 * 文件
 */
export interface SysFile {
  /** id */
  id?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  createdBy?: string
  /** 修改时间 */
  updateTime?: string
  /** 修改人 */
  updatedBy?: string
  /** 业务类型 */
  bizType?: string
  /** 桶 */
  bucket?: string
  /** 存储类型 */
  storageType?: string
  /** 文件相对地址 */
  path?: string
  /** 文件访问地址 */
  url?: string
  /** 唯一文件名 */
  uniqueFileName?: string
  /** 原始文件名 */
  originalFileName?: string
  /** 文件类型 */
  fileType?: string
  /** 内容类型 */
  contentType?: string
  /** 后缀 */
  suffix?: string
  /** 文件大小 */
  size?: string
}

/** 文件上传参数 */
export interface SysFileUploadParam {
  /** 业务类型 */
  bizType?: string
  /** 要上传的文件 */
  file: any
}
