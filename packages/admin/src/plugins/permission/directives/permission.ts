import type { DirectiveBinding } from 'vue'

/**
 * 检查用户权限
 *
 * @param el HTMLElement
 * @param binding DirectiveBinding
 */
function checkPermissions(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding

  if (value && Array.isArray(value) && value.length > 0) {
    const { hasPermission } = usePermission()

    if (!hasPermission(value) && el.parentNode)
      el.parentNode.removeChild(el)
  }
  else {
    throw new Error(`need roles! Like v-permission="['space.module.page']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermissions(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermissions(el, binding)
  },
}
