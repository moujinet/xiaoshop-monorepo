<script lang="ts" setup>
import type { IAssetSnapshot } from '@/assets/types'
import { AssetsBrowser } from '@/assets/components'
import { fetchAssetDetail } from '@/assets/apis/asset'

defineOptions({
  name: 'AssetsSettingsImagesPage',
})

const positionMap = [
  { value: 'top-left', label: '左上' },
  { value: 'top-center', label: '中上' },
  { value: 'top-right', label: '右上' },
  { value: 'left', label: '左中' },
  { value: 'center', label: '正中' },
  { value: 'right', label: '右中' },
  { value: 'bottom-left', label: '左下' },
  { value: 'bottom-center', label: '中下' },
  { value: 'bottom-right', label: '右下' },
]

const { getOptions, updateOptions } = useSettings()
const form = reactive<IKeyValue>(getOptions('app.assets', {}))
const { loading, onUpdate } = updateOptions('app.assets', form)
const watermarkImage = ref<IAssetSnapshot | undefined>()

if (form.watermarkImage) {
  const { refreshData } = fetchAssetDetail(form.watermarkImage)
  refreshData().then((data) => {
    watermarkImage.value = pick(data, ['id', 'type', 'path'])
  })
}

watch(
  watermarkImage,
  () => {
    if (watermarkImage.value)
      form.watermarkImage = watermarkImage.value.id
  },
)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <a-alert title="温馨提示" class="mb-5">
        1. 所有设置为全局设置，关闭状态下，「分组」中设置的状态将失效<br>
        2. 建议根据实际情况开启所需功能， 并通过「分组」进行设置
      </a-alert>

      <FormGroup title="图片压缩" size="small">
        <a-form-item field="enableImageCompress" label="启用压缩" tooltip="开启图片压缩后, 图片会减小文件大小, 加快显示速度, 同时会增加服务器压力和降低图片质量" show-colon>
          <a-switch v-model="form.enableImageCompress" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item v-if="form.enableImageCompress" field="imageCompressQuality" label="图片质量" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.imageCompressQuality" placeholder="请输入">
              <template #suffix>
                %
              </template>
            </a-input>
          </div>
        </a-form-item>
      </FormGroup>

      <FormGroup title="缩略图" size="small">
        <a-form-item field="enableThumbnail" label="启用缩略图" tooltip="开启图片缩略图后, 会在上传图片时自动生成缩略图" show-colon>
          <a-switch v-model="form.enableThumbnail" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <template v-if="form.enableThumbnail">
          <a-form-item
            label="缩略大图"
            tooltip="单位: 像素(px)"
            show-colon
          >
            <a-input-group>
              <a-input v-model="form.largeThumbnailWidth" placeholder="宽度">
                <template #suffix>
                  px
                </template>
              </a-input>
              <a-input v-model="form.largeThumbnailHeight" placeholder="高度">
                <template #suffix>
                  px
                </template>
              </a-input>
            </a-input-group>
          </a-form-item>

          <a-form-item
            label="缩略中图"
            tooltip="单位: 像素(px)"
            show-colon
          >
            <a-input-group>
              <a-input v-model="form.mediumThumbnailWidth" placeholder="宽度">
                <template #suffix>
                  px
                </template>
              </a-input>
              <a-input v-model="form.mediumThumbnailHeight" placeholder="高度">
                <template #suffix>
                  px
                </template>
              </a-input>
            </a-input-group>
          </a-form-item>

          <a-form-item
            label="缩略小图"
            tooltip="单位: 像素(px)"
            show-colon
          >
            <a-input-group>
              <a-input v-model="form.smallThumbnailWidth" placeholder="宽度">
                <template #suffix>
                  px
                </template>
              </a-input>
              <a-input v-model="form.smallThumbnailHeight" placeholder="高度">
                <template #suffix>
                  px
                </template>
              </a-input>
            </a-input-group>
          </a-form-item>
        </template>
      </FormGroup>

      <FormGroup title="水印设置" size="medium">
        <a-form-item field="enableWatermark" label="启用水印" tooltip="开启水印后, 商品主图会添加水印" show-colon>
          <a-switch v-model="form.enableWatermark" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <template v-if="form.enableWatermark">
          <a-form-item field="watermarkType" label="水印类型" show-colon>
            <a-radio-group v-model="form.watermarkType" type="button">
              <a-radio value="image">
                图片
              </a-radio>
              <a-radio value="text">
                文本
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <template v-if="form.watermarkType === 'image'">
            <a-form-item field="watermarkImage" label="水印图片" tooltip="水印图片大小不能超出200KB, 宽高不能超出 500px * 500px" show-colon>
              <AssetsBrowser v-model:file="watermarkImage" />
            </a-form-item>

            <a-form-item field="watermarkImagePosition" label="水印图片位置" tooltip="水印图片显示在图片上的位置" show-colon>
              <a-radio-group v-model="form.watermarkImagePosition" type="button">
                <a-radio v-for="item in positionMap" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item field="watermarkImageOpacity" label="水印图片透明度" tooltip="水印图片透明度, 用百分数表示, 可为 0-100%, 0 为完全透明" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkImageOpacity" placeholder="请输入">
                  <template #suffix>
                    %
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <a-form-item field="watermarkImageZoom" label="水印图片缩放比例" tooltip="水印图片缩放比率, 用百分数表示, 可为 0-100%" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkImageZoom" placeholder="请输入">
                  <template #suffix>
                    %
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <a-form-item field="watermarkImageX" label="水印横坐标偏移量" tooltip="水印相对于横坐标偏移的距离, 用像素单位表示" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkImageX" placeholder="请输入">
                  <template #suffix>
                    px
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <a-form-item field="watermarkImageY" label="水印纵坐标偏移量" tooltip="水印相对于纵坐标偏移的距离, 用像素单位表示" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkImageY" placeholder="请输入">
                  <template #suffix>
                    px
                  </template>
                </a-input>
              </div>
            </a-form-item>
          </template>

          <template v-if="form.watermarkType === 'text'">
            <a-form-item field="watermarkText" label="水印文字" show-colon>
              <div class="form-item-sm">
                <a-input v-model="form.watermarkText" placeholder="请输入水印文字" />
              </div>
            </a-form-item>

            <a-form-item field="watermarkTextSize" label="水印文字大小" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkTextSize" placeholder="请输入">
                  <template #suffix>
                    px
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <a-form-item field="watermarkTextColor" label="水印文字颜色" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkTextColor" placeholder="请输入" />
              </div>
            </a-form-item>

            <a-form-item field="watermarkTextPosition" label="水印图片位置" tooltip="水印图片显示在图片上的位置" show-colon>
              <a-radio-group v-model="form.watermarkTextPosition" type="button">
                <a-radio v-for="item in positionMap" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item field="watermarkTextX" label="水印横坐标偏移量" tooltip="水印相对于横坐标偏移的距离, 用像素单位表示" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkTextX" placeholder="请输入">
                  <template #suffix>
                    px
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <a-form-item field="watermarkTextY" label="水印纵坐标偏移量" tooltip="水印相对于纵坐标偏移的距离, 用像素单位表示" show-colon>
              <div class="form-item-xs">
                <a-input v-model="form.watermarkTextY" placeholder="请输入">
                  <template #suffix>
                    px
                  </template>
                </a-input>
              </div>
            </a-form-item>
          </template>
        </template>
      </FormGroup>

      <a-form-item>
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
