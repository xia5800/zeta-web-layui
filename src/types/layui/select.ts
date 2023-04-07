/**
 * select选项
 */
export interface SelectOption {
  /** 标签 */
  label: string
  /** 值 */
  value: string | number
  /** string */
  keyword?: string
  /** 是否禁用 */
  disabled?: boolean
}
