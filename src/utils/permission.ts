/* 判断数组是否有某些值 */
function arrayHas(
  array: (string | undefined)[],
  value: string | string[],
): boolean {
  if (!value) {
    return true
  }
  if (!array) {
    return false
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (!array.includes(value[i])) {
        return false
      }
    }
    return true
  }
  return array.includes(value)
}

/* 判断数组是否有任意值 */
function arrayHasAny(
  array: (string | undefined)[],
  value: string | string[],
): boolean {
  if (!value) {
    return true
  }
  if (!array) {
    return false
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (array.includes(value[i])) {
        return true
      }
    }
    return false
  }
  return array.includes(value)
}

/**
 * 是否有某些角色
 * @param value 角色字符或字符数组
 */
export function hasRole(value: string | string[]): boolean {
  const userStore = useUserStore()
  return arrayHas(userStore?.roles, value)
}

/**
 * 是否有任意角色
 * @param value 角色字符或字符数组
 */
export function hasAnyRole(value: string | string[]): boolean {
  const userStore = useUserStore()
  return arrayHasAny(userStore?.roles, value)
}

/**
 * 是否有某些权限
 * @param value 权限字符或字符数组
 */
export function hasPermission(value: string | string[]): boolean {
  const userStore = useUserStore()
  return arrayHas(userStore?.permissions, value)
}

/**
 * 是否有任意权限
 * @param value 权限字符或字符数组
 */
export function hasAnyPermission(value: string | string[]): boolean {
  const userStore = useUserStore()
  return arrayHasAny(userStore?.permissions, value)
}
