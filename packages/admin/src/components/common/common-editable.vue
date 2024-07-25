<script lang="ts" setup>
defineOptions({
  name: 'CommonEditable',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  type?: 'string' | 'number'
  editable?: boolean
  defaultValue?: string | number
}>(), {
  type: 'string',
  editable: true,
  defaultValue: '',
})

const emit = defineEmits(['change'])

const isEdit = ref(false)
const value = ref<string>('')

value.value = props.defaultValue.toString()

function handleValueChange(val: string) {
  isEdit.value = false

  if (
    value.value !== val
    && (
      (props.type === 'number' && Number.isInteger(Number(val)))
      || props.type === 'string'
    )
  ) {
    value.value = val
    emit('change', props.type === 'string' ? val : Number(val))
  }
}
</script>

<template>
  <span>
    <span v-if="!isEdit" class="flex-(inline v-center) gap-1">
      {{ value }}

      <CommonIcon
        name="mingcute:edit"
        class="text-$color-text-3 hover:text-$color-text-2 cursor-pointer"
        @click="isEdit = true"
      />
    </span>

    <a-input
      v-else
      :default-value="value"
      @blur="handleValueChange(value)"
      @change="handleValueChange"
    />
  </span>
</template>
