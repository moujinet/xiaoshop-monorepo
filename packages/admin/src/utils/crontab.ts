export function useCrontab(interval: number = 5, fn: () => void) {
  const crontab = setInterval(fn, interval * 60000)

  fn()

  function stop() {
    clearInterval(crontab)
  }

  return {
    stop,
  }
}
