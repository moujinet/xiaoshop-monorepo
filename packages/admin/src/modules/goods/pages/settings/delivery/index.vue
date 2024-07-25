<script lang="ts" setup>
import {
  LOGISTICS_DELIVERY_MODES,
  LogisticsDeliveryModeEnum,
} from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsSettingsDeliveryIndexPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(getOptions('logistics.deliveryMode', {}, ['enableExpress', 'enableSelf', 'enableLocal']))
const { loading, onUpdate } = updateOptions('logistics.deliveryMode', form)
</script>

<template>
  <CommonContainer>
    <CommonGrid>
      <CommonSwitchCard
        v-if="LOGISTICS_DELIVERY_MODES.some(item => item.value === LogisticsDeliveryModeEnum.EXPRESS)"
        v-model:enable="form.enableExpress"
        title="快递发货"
        icon="mingcute:truck"
        desc="启用快递发货后, 买家下单才可以选择快递发货."
        :loading="loading"
        @change="onUpdate"
      >
        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/company')">
          快递公司
        </a-button>

        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/template')">
          运费模板
        </a-button>

        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/tracking')">
          物流跟踪
        </a-button>
      </CommonSwitchCard>

      <CommonSwitchCard
        v-if="LOGISTICS_DELIVERY_MODES.some(item => item.value === LogisticsDeliveryModeEnum.SELF)"
        v-model:enable="form.enableSelf"
        title="到店自提"
        icon="mingcute:barcode"
        desc="启用到店自提后, 买家下单才可以选择到店自提, 自提时段可自定义."
        :loading="loading"
        @change="onUpdate"
      >
        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/self-pickup')">
          自提设置
        </a-button>
      </CommonSwitchCard>
    </CommonGrid>
  </CommonContainer>
</template>
