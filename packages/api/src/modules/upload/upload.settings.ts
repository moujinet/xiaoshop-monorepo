import type { ISettingOptionMap } from '@xiaoshop/shared'

export const UploadSettings: ISettingOptionMap = {
  // 上传限制 (KB)
  'maxFileSizeImage': '2500',
  'maxFileSizeVideo': '10000',

  // 本地存储(自定义域名)
  'customDomain': '',

  // 云存储 - 阿里云 OSS
  'storage.aliyun.enable': '0',
  'storage.aliyun.accessKeyID': '',
  'storage.aliyun.accessKeySecret': '',
  'storage.aliyun.bucket': '',
  'storage.aliyun.endpoint': '',
  'storage.aliyun.enableCustomDomain': '0',
  'storage.aliyun.customDomain': '',
}
