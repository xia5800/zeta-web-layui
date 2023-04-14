/**
 * 将 source 中属性的值赋给 target, 排除 target 中不存在的属性
 * @param source 源对象
 * @param target 目标对象
 */
export function assignObj<S extends object, T extends object>(source: S, target: T): void {
  Object.entries(source).forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      target[key as keyof T] = value
    }
  })
}
