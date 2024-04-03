export function usePermission() {
  return {
    hasPermission: (permissions: string[]) => permissions.length > 0,
    hasRole: (roles: string[]) => roles.length > 0,
  }
}
