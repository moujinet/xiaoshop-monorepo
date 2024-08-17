export function useAsset() {
  const { getOption, getOptions } = useSettings()

  const local = getOption('upload.customDomain', '') as string
  const storage = getOptions('upload.storage.aliyun', {}, ['enable', 'enableCustomDomain', 'customDomain'])

  function getFullUrl(path: string) {
    return `${(storage.enable && storage.enableCustomDomain
      ? storage.customDomain
      : local).replace(/\/$/, '')}/${path}`
  }

  return {
    getFullUrl,
  }
}
