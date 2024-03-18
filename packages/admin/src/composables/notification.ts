export const useNotification = defineStore('notification', () => {
  const unread = ref(0)

  interface INotificationCount {
    notification: number
    message: number
  }

  async function countUnread() {
    return new Promise<INotificationCount>((resolve) => {
      const count: INotificationCount = {
        notification: 1,
        message: 0,
      }

      unread.value = count.notification + count.message

      return resolve(count)
    })
  }

  async function fetchUnread() {
  }

  async function markAllAsRead() {
    unread.value = 0
  }

  return {
    unread,
    countUnread,
    fetchUnread,
    markAllAsRead,
  }
})
