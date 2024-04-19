export function usePermission() {
  function hasPermission(permissions: string[]) {
    return permissions.length > 0
  }

  function hasRole(roles: string[]) {
    return roles.length > 0
  }

  function checkPermission(permissions: string[], actionName?: string) {
    if (!hasPermission(permissions)) {
      AModal.warning({
        title: '没有权限',
        content: `您没有权限操作${actionName}`,
        width: 320,
        bodyStyle: { textAlign: 'center', fontSize: '15px' },
        onClose: () => {
          history.back()
        },
      })
    }
  }

  return {
    hasPermission,
    hasRole,
    checkPermission,
  }
}
