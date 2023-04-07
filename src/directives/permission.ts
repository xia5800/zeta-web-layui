import type { App, Directive, DirectiveBinding } from 'vue'
import { hasAnyPermission, hasAnyRole, hasPermission, hasRole } from '~/utils/permission'

/**
 * role指令
 */
const roleDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    if (!hasRole(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

/**
 * any-role指令
 */
const anyRoleDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    if (!hasAnyRole(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

/**
 * permission指令
 */
const permissionDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    if (!hasPermission(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

/**
 * any-permission指令
 */
const anyPermissionDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    if (!hasAnyPermission(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

/**
 * 设置权限指令
 * @param app
 */
export function setupPermissionDirective(app: App) {
  app.directive('role', roleDirective)
  app.directive('any-role', anyRoleDirective)

  app.directive('permission', permissionDirective)
  app.directive('any-permission', anyPermissionDirective)
}
