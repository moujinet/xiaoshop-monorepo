<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'

defineOptions({
  name: 'CommonVideo',
})

const props = defineProps<{
  src: string
}>()

const { getOptions } = useSettings()

const local = getOptions('upload', {}, ['customDomain'])
const storage = getOptions('upload.storage.aliyun', {}, ['enable', 'enableCustomDomain', 'customDomain'])

const videoSrc = computed(() => {
  return `${(storage.enable && storage.enableCustomDomain
    ? storage.customDomain
    : local.customDomain).replace(/\/$/, '')}/${props.src}`
})
</script>

<template>
  <VideoPlayer
    class="video-player vjs-theme-city"
    :sources="[
      {
        src: videoSrc,
        type: 'video/mp4',
      },
    ]"
    :volume="0.6"
    preload="none"
    crossorigin="anonymous"
    playsinline
    controls
  />
</template>

<style lang="less" scoped>
.video-player {
  background-color: black;
  width: 100%;
}
</style>
