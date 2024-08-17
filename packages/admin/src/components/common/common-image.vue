<script lang="ts" setup>
defineOptions({
  name: 'CommonImage',
})

const props = defineProps<{
  src: string
  isLocal?: boolean
}>()

const { getFullUrl } = useAsset()

const url = getFullUrl(props.src)

const imageSrc = computed(() => {
  if (props.isLocal)
    return props.src

  return url
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
