import type { DirectiveBinding } from 'vue'

/**
 * 检查用户角色
 *
 * @param el HTMLElement
 * @param binding DirectiveBinding
 */
function checkUserRole(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding

  if (value && Array.isArray(value) && value.length > 0) {
    const { hasRole } = usePermission()

    if (!hasRole(value) && el.parentNode)
      el.parentNode.removeChild(el)
  }
  else {
    throw new Error(`need roles! Like v-role="['admin']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkUserRole(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkUserRole(el, binding)
  },
}
