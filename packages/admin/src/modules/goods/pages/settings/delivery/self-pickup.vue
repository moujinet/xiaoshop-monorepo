<script lang="ts" setup>
defineOptions({
  name: 'GoodsSettingsDeliverySelfPickupPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(getOptions('logistics.selfPickup', {}, ['days', 'timeFrames', 'timeStep']))
const { loading, onUpdate } = updateOptions('logistics.selfPickup', form)

const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const steps = [
  { label: '30 分钟', value: '30' },
  { label: '1 小时', value: '60' },
]
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <FormGroup title="自提设置" size="medium">
        <a-form-item field="days" label="自提时间" show-colon>
          <a-checkbox-group v-model="form.days">
            <a-checkbox v-for="(item, index) in weeks" :key="item" :value="index + 1">
              {{ item }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item field="selfPickupTimeFrame" label="允许自提时段" show-colon>
          <div class="flex flex-col flex-gap-2">
            <template v-for="(_, index) in form.timeFrames" :key="index">
              <a-input-group>
                <a-time-picker v-model="form.timeFrames[index]" type="time-range" format="HH:mm" disable-confirm />
                <a-button v-if="index <= 0" type="text" @click="form.timeFrames.push([])">
                  <CommonIcon name="mingcute:add" />
                </a-button>
                <a-button v-else type="text" @click="form.timeFrames.splice(index, 1)">
                  <CommonIcon name="mingcute:minimize" />
                </a-button>
              </a-input-group>
            </template>
          </div>

          <template #extra>
            可以设置多个时段, 避开休息时间<br>
            如: 9:00 - 12:00, 14:00 - 17:00, 19:00 - 21:00
          </template>
        </a-form-item>

        <a-form-item field="selfPickupTimeFrame" label="时段细分" show-colon>
          <a-radio-group v-model="form.timeStep">
            <a-radio v-for="item in steps" :key="item.value" :value="item.value">
              {{ item.label }}
            </a-radio>
          </a-radio-group>

          <template #extra>
            买家下单选择自提时间时, 自提时段会以此时间细分。<br>
            如: 允许自提时间为: 10:00 - 12:00, 按 30 分钟细分为: 10:00 - 10:30, 10:30 - 11:00, 11:00 - 11:30, 11:30 - 12:00
          </template>
        </a-form-item>
      </FormGroup>

      <a-form-item>
        <a-button type="primary" html-type="submit" size="large">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
