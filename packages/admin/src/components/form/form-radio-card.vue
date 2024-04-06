<script lang="ts" setup>
defineOptions({
  name: 'FormRadioCard',
})

defineProps<{
  options: Array<RadioOption>
}>()

const emit = defineEmits(['change'])

const modelValue = defineModel('value', {
  type: String,
  default: '',
})

interface RadioOption {
  label: string
  desc?: string
  value: string | number | boolean
  disabled?: boolean
}
</script>

<template>
  <a-radio-group v-model="modelValue" class="form-radio-card" @change="emit('change', $event)">
    <template v-for="opt in options" :key="opt.value">
      <a-radio :value="opt.value" :disabled="opt.disabled">
        <template #radio="{ checked }">
          <div class="form-radio-card__radio" :class="{ 'is-checked': checked }">
            <span class="form-radio-card__label">
              {{ opt.label }}
            </span>
            <span v-if="opt.desc" class="form-radio-card__desc">
              {{ opt.desc }}
            </span>
          </div>
        </template>
      </a-radio>
    </template>
  </a-radio-group>
</template>

<style lang="less">
.form-radio-card {
  padding: 2px 0;

  &__radio {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-width: 140px;
    border-radius: 3px;
    border: 1px solid var(--color-border-2);
    gap: 4px;

    .form-radio-card__label {
      color: var(--color-text-1);
    }

    .form-radio-card__desc {
      color: var(--color-text-3);
      font-size: 12px;
    }

    &:hover {
      .form-radio-card__label,
      .form-radio-card__desc {
        color: var(--theme-color);
      }
    }

    &.is-checked {
      border-color: var(--theme-color);
      box-shadow: 0 0 0 2px rgb(var(--theme-color-rgb) 0.3);

      .form-radio-card__label,
      .form-radio-card__desc {
        color: var(--theme-color);
      }

      .form-radio-card__label {
        font-weight: 600;
      }
    }
  }
}
</style>
