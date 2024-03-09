<script lang="ts" setup>
import LayoutHeader from './header/index.vue'
import LayoutSider from './sider/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'

defineOptions({
  name: 'LayoutDefault',
})

withDefaults(defineProps<{
  withSider?: boolean
}>(), {
  withSider: true,
})

const { visible } = storeToRefs(useLayout())
</script>

<template>
  <TLayout direction="horizontal" class="layout">
    <LayoutHeader />
    <TLayout direction="vertical" :class="{ 't-layout--with-sider': withSider && visible.sider }">
      <slot v-if="visible.sider" name="sider">
        <LayoutSider />
      </slot>
      <TLayout direction="horizontal" class="layout-inner">
        <slot name="default">
          <LayoutContent />
        </slot>
        <LayoutFooter v-if="visible.footer" />
      </TLayout>
    </TLayout>
  </TLayout>
</template>

<style lang="less">
@import '~/styles/layout.less';
</style>
