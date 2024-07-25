<script lang="ts" setup>
import type { IMenu } from '~/types'

defineOptions({
  name: 'RoleAuthForm',
})

const modelValue = defineModel<string[]>('modelValue', {
  type: Array as PropType<string[]>,
  default: () => [],
})

const selectedKeys = ref<string[]>([])
const flat: Ref<string[]> = ref([])

const {
  spaces,
  modules,
  getModuleMenus,
} = useApp()

watch(
  modelValue,
  (val) => {
    selectedKeys.value = val
  },
)

// TODO: 临时方案, 未实现通配符
function handleChecked(checked: string[], id: string) {
  const isWildcard = id.endsWith('.*')

  const children = flat.value.filter(
    item => item.startsWith(isWildcard ? id.replace(/\.\*$/, '') : id),
  ) || []

  if (checked.includes(id)) {
    selectedKeys.value = children.length > 0
      ? selectedKeys.value.concat(children)
      : selectedKeys.value.concat(id)
  }
  else {
    selectedKeys.value = children.length > 0
      ? selectedKeys.value.filter(item => !children.includes(item))
      : selectedKeys.value.filter(item => item !== id)
  }

  modelValue.value = selectedKeys.value
}

function init() {
  spaces.value.forEach((space) => {
    flat.value.push(space.id)
  })

  function loadModuleMenus(menus: IMenu[]) {
    menus.forEach((menu) => {
      flat.value.push(menu.id)

      if (menu.children && menu.children.length > 0)
        loadModuleMenus(menu.children)
    })
  }

  modules.value.forEach((mod) => {
    flat.value.push(mod.id)

    const menus = getModuleMenus(mod.id).value || []
    loadModuleMenus(menus)
  })
}

init()
</script>

<template>
  <div class="b-(solid $color-border-1) rounded">
    <template v-for="space in spaces" :key="space.id">
      <div class="flex items-stretch [&:not(:last-child)]:b-b-(dotted $color-border-1)">
        <div class="font-bold text-$color-text-1 py-4 px-5 b-r-(dotted $color-border-1)">
          <!-- 空间 -->
          <a-checkbox
            v-model="selectedKeys"
            :value="space.id"
            @change="(checked) => handleChecked(checked as string[], space.id)"
          >
            {{ space.desc }}
          </a-checkbox>
        </div>

        <div class="flex-(~ 1 col)">
          <template v-for="mod in modules.filter(m => m.space === space.id)" :key="mod.id">
            <div class="flex [&:not(:last-child)]:b-b-(dotted $color-border-1)">
              <div class="font-bold py-4 px-5 b-r-(dotted $color-border-1)">
                <!-- 模块 -->
                <a-checkbox
                  v-model="selectedKeys"
                  :value="mod.id"
                  @change="(checked) => handleChecked(checked as string[], mod.id)"
                >
                  {{ mod.desc }}
                </a-checkbox>
              </div>

              <div class="flex-(~ 1 col)">
                <template v-for="menu in getModuleMenus(mod.id).value || []" :key="menu.id">
                  <div class="[&:not(:last-child)]:b-b-(dotted $color-border-1)">
                    <div class="flex-(~ v-center between) py-4 px-4 b-b-(dotted $color-border-1)">
                      <!-- 主菜单 -->
                      <div class="flex-(~ v-center)">
                        <CommonBadge :icon="menu.icon" color="arcoblue" class="mr-2" rounded />
                        <span class="font-bold">
                          {{ menu.name }}
                        </span>
                      </div>

                      <a-checkbox
                        v-model="selectedKeys"
                        :value="menu.id"
                        @change="(checked) => handleChecked(checked as string[], menu.id)"
                      >
                        选择
                      </a-checkbox>
                    </div>

                    <div v-if="menu.children && menu.children.length > 0" class="flex-(~ wrap)">
                      <template v-for="child in menu.children || []" :key="child.id">
                        <div class="py-4 px-6">
                          <!-- 子菜单 -->
                          <a-checkbox
                            v-model="selectedKeys"
                            :value="child.id"
                            @change="(checked) => handleChecked(checked as string[], child.id)"
                          >
                            <strong>
                              {{ child.name }}
                            </strong>
                          </a-checkbox>

                          <div v-if="child.children && child.children.length > 0" class="flex-(~ col gap-4 wrap) mt-4">
                            <template v-for="act in child.children || []" :key="act.id">
                              <a-checkbox
                                v-model="selectedKeys"
                                :value="act.id"
                                @change="(checked) => handleChecked(checked as string[], act.id)"
                              >
                                {{ act.name }}
                              </a-checkbox>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
