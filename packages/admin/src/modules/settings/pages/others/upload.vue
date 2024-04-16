<script lang="ts" setup>
defineOptions({
  name: 'RegisterSettingsPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('others'),
    [
      'uploadFileSize',
      'enableImageCompress',
      'largeThumbnailWidth',
      'largeThumbnailHeight',
      'mediumThumbnailWidth',
      'mediumThumbnailHeight',
      'smallThumbnailWidth',
      'smallThumbnailHeight',
      'enableWatermark',
      'watermarkType',
      'watermarkText',
      'watermarkTextSize',
      'watermarkTextColor',
      'watermarkTextPosition',
      'watermarkTextX',
      'watermarkTextY',
      'watermarkImage',
      'watermarkImagePosition',
      'watermarkImageOpacity',
      'watermarkImageZoom',
      'watermarkImageX',
      'watermarkImageY',
    ],
  ),
)

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
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <a-form :model="form" scroll-to-first-error>
        <FormGroup title="文件上传">
          <a-form-item field="uploadFileSize" label="允许上传文件大小" tooltip="允许上传的文件大小, 0 为不限制" show-colon required>
            <div class="form-item-xs">
              <a-input v-model="form.uploadFileSize" placeholder="请输入">
                <template #suffix>
                  KB
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item field="enableImageCompress" label="图片压缩" show-colon>
            <div class="form-item">
              <a-switch v-model="form.enableImageCompress" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="缩略图">
          <a-form-item
            label="缩略大图"
            tooltip="单位: 像素(px)"
            show-colon
          >
            <div class="form-item-sm">
              <a-input-group>
                <a-input v-model="form.largeThumbnailWidth" placeholder="宽度" />
                <a-input v-model="form.largeThumbnailHeight" placeholder="高度" />
              </a-input-group>
            </div>
          </a-form-item>

          <a-form-item
            label="缩略中图"
            tooltip="单位: 像素(px)"
            show-colon
          >
            <div class="form-item-sm">
              <a-input-group>
                <a-input v-model="form.mediumThumbnailWidth" placeholder="宽度" />
                <a-input v-model="form.mediumThumbnailHeight" placeholder="高度" />
              </a-input-group>
            </div>
          </a-form-item>

          <a-form-item
            label="缩略小图"
            tooltip="单位: 像素(px)"
            show-colon
          >
            <div class="form-item-sm">
              <a-input-group>
                <a-input v-model="form.smallThumbnailWidth" placeholder="宽度" />
                <a-input v-model="form.smallThumbnailHeight" placeholder="高度" />
              </a-input-group>
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="水印设置">
          <a-form-item field="enableWatermark" label="启用水印" tooltip="开启水印后, 商品主图会添加水印" show-colon>
            <div class="form-item">
              <a-switch v-model="form.enableWatermark" checked-text="启用" unchecked-text="关闭" />
            </div>
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
                <a-upload action="/" />
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
                <div class="form-item">
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
                  <!-- <a-color-picker v-model="form.watermarkTextColor" show-text disabled-alpha /> -->
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
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
