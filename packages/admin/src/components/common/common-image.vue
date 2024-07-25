<script lang="ts" setup>
defineOptions({
  name: 'CommonImage',
})

const props = defineProps<{
  src: string
  isLocal?: boolean
}>()

const { getOptions } = useSettings()

const local = getOptions('upload', {}, ['customDomain'])
const storage = getOptions('upload.storage.aliyun', {}, ['enable', 'enableCustomDomain', 'customDomain'])

const imageSrc = computed(() => {
  if (props.isLocal)
    return props.src

  return `${(storage.enable && storage.enableCustomDomain
    ? storage.customDomain
    : local.customDomain).replace(/\/$/, '')}/${props.src}`
})
</script>

<template>
  <a-image :src="imageSrc">
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>

    <template #loader>
      <div class="flex-(~ center) w-full h-full">
        <a-spin />
      </div>
    </template>
  </a-image>
</template>
