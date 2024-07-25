<script lang="ts" setup>
import {
  GOODS_ATTRIBUTE_OPTION_TYPES,
  GoodsAttributeOptionTypeEnum,
  type IGoodsAttributeTemplateOption,
} from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsAttributeTemplateOptionsModal',
})

const props = defineProps<{
  index?: number
  option?: IGoodsAttributeTemplateOption
}>()
const emit = defineEmits(['success'])
const formRef = ref()
const visible = ref(false)
const form = reactive<IGoodsAttributeTemplateOption>({
  name: '',
  type: GoodsAttributeOptionTypeEnum.INPUT,
  options: [],
  defaultValue: [],
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入参数名称',
    },
  ],
}

watch(
  visible,
  (val) => {
    if (val && props.option) {
      form.name = props.option.name
      form.type = props.option.type
      form.options = props.option.options || []
      form.defaultValue = props.option.defaultValue || []
    }
    else {
      form.name = ''
      form.type = GoodsAttributeOptionTypeEnum.INPUT
      form.options = []
      form.defaultValue = []
    }
  },
  { immediate: true },
)

function handleTypeChange(type: any) {
  if (type !== GoodsAttributeOptionTypeEnum.INPUT) {
    form.options = form.options.length === 0 ? [''] : form.options
  }
}

function handleAddOption() {
  const removeRepeated = [...new Set(form.options)]

  if (removeRepeated.length !== form.options.length)
    return formRef.value.setFields({ options: { status: 'error', message: '参数项重复' } })

  form.options.push('')
}

function handleRemoveOption(index: number) {
  form.options.splice(index, 1)
}

async function handleSubmit(done: any) {
  const errors = await formRef.value.validate()

  if (errors)
    return done(false)

  form.options = form.options.filter(it => it)
  form.defaultValue = form.defaultValue.filter(it => it)

  emit('success', { ...form }, props.index)

  return done()
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :title="option ? '编辑模板参数' : '添加模板参数'"
    ok-text="保存"
    @before-ok="handleSubmit"
  >
    <slot />

    <template #modal>
      <a-form ref="formRef" :model="form" :rules="rules" scroll-to-first-error>
        <a-form-item field="name" label="参数名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入参数名称" />
          </div>
        </a-form-item>

        <a-form-item field="type" label="参数类型" show-colon>
          <div class="form-item">
            <a-radio-group v-model="form.type" type="button" @change="handleTypeChange">
              <a-radio v-for="item in GOODS_ATTRIBUTE_OPTION_TYPES" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </div>
        </a-form-item>

        <template v-if="form.type !== 'input'">
          <a-form-item field="options" label="参数项" show-colon>
            <a-space direction="vertical">
              <div
                v-for="(_, idx) in form.options"
                :key="idx"
                flex="~ v-center gap-2"
              >
                <a-input v-model="form.options[idx]" placeholder="参数项" class="flex-1" allow-clear />

                <a-button v-if="form.options.length === 1 || form.options.length - idx === 1" shape="square" type="text" @click="handleAddOption">
                  <template #icon>
                    <CommonIcon name="mingcute:add" />
                  </template>
                </a-button>

                <a-button v-else status="danger" shape="square" type="text" @click="handleRemoveOption(idx)">
                  <template #icon>
                    <CommonIcon name="mingcute:delete-2" />
                  </template>
                </a-button>
              </div>
            </a-space>
          </a-form-item>
        </template>

        <a-form-item field="defaultValue" label="默认值" show-colon>
          <div class="form-item">
            <a-input v-if="form.type === 'input'" v-model="form.defaultValue[0]" placeholder="默认值" />
            <a-radio-group v-if="form.type === 'radio'" v-model="form.defaultValue[0]" :options="form.options.filter(it => it)" />
            <a-checkbox-group v-if="form.type === 'checkbox'" v-model="form.defaultValue" :options="form.options.filter(it => it)" />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
