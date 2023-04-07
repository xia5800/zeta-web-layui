/**
 * 树
 */
export interface TreeData {
  /** 树id */
  id: string
  /** 树标题 */
  title: string
  /** 图标 */
  field: string
  /** 是否展开 */
  spread: boolean
  /** 子树 */
  children?: TreeData[]
  /** 是否禁用 */
  disabled?: boolean
}
