<script lang="ts" setup>
defineOptions({
  name: 'MemberAvatar',
})

const props = defineProps<{
  avatar: string
}>()

const { getOption } = useSettings()
const { getFullUrl } = useAsset()

const defaultAvatar = getOption('member.register.defaultAvatar', '') as string

const avatarUrl = ref<string>(
  props.avatar
    ? getFullUrl(props.avatar)
    : getFullUrl(defaultAvatar),
)

function onError() {
  avatarUrl.value = getFullUrl(defaultAvatar)
}
</script>

<template>
  <a-avatar
    class="member-avatar"
    shape="square"
    object-fit="none"
    :size="50"
    :image-url="avatarUrl"
    :auto-fix-font-size="false"
    @error="onError"
  />
</template>

<style lang="less">
.member-avatar {
  background-color: #fff !important;
}
</style>
