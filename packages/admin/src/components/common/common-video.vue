<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'

defineOptions({
  name: 'CommonVideo',
})

const props = defineProps<{
  src: string
}>()

const { getFullUrl } = useAsset()

const video = getFullUrl(props.src)
</script>

<template>
  <VideoPlayer
    class="video-player vjs-theme-city"
    :sources="[
      {
        src: video,
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
