<script lang="ts" setup>
defineOptions({
  name: 'AssetsPreviewerImage',
})

defineProps<{
  index: number
  src: string
}>()

const emit = defineEmits(['reUpload', 'delete'])

const preview = ref(false)
</script>

<template>
  <div
    class="assets-uploader-previewer__image"
  >
    <a-image
      width="60"
      :src="src"
      :preview-visible="preview"
      :preview-props="{
        actionsLayout: ['zoomIn', 'zoomOut', 'originalSize'],
      }"
      @preview-visible-change="() => (preview = false)"
    >
      <template #extra>
        <div class="actions">
          <span class="action" @click="preview = true">
            <a-tooltip content="预览" mini>
              <CommonIcon name="ph:eye" />
            </a-tooltip>
          </span>

          <span class="action" @click="emit('reUpload', index)">
            <a-tooltip content="重新选择" mini>
              <CommonIcon name="ph:arrows-clockwise" />
            </a-tooltip>
          </span>

          <a-popconfirm content="确定要删除吗?" @ok="emit('delete', index)">
            <span class="action">
              <a-tooltip content="删除" mini>
                <CommonIcon name="ph:trash" />
              </a-tooltip>
            </span>
          </a-popconfirm>
        </div>
      </template>
    </a-image>
  </div>
</template>

<style lang="less">
.assets-uploader-previewer__image {
  .arco-image-footer {
      padding: 0;

      &-extra {
        width: 100%;
        padding: 0 5px 5px;

        .actions {
          display: flex;
          justify-content: space-between;

          .action {
            cursor: pointer;
            border-radius: 2px;

            &:hover {
              background-color: rgb(0 0 0 / 25%);
            }
          }
        }
      }
    }
}
</style>
