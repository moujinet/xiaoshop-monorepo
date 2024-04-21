<script lang="ts" setup>
import {
  GOODS_DELIVERY_TYPES,
  GOODS_DELIVERY_TYPE_EXPRESS,
  GOODS_DELIVERY_TYPE_LOCAL,
  GOODS_DELIVERY_TYPE_SELF,
} from '@/goods/constants'

import { GoodsDeliverySettingCard } from '@/goods/components'

defineOptions({
  name: 'GoodsSettingsDeliveryIndexPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(getOptions('shop.goods', {}, ['enableExpress', 'enableSelf', 'enableLocal']))
const { loading, onUpdate } = updateOptions('shop.goods', form)

watch(
  () => [form.enableExpress, form.enableSelf, form.enableLocal],
  () => {
    onUpdate()
  },
)
</script>

<template>
  <CommonContainer>
    <div grid="~ cols-3 gap-4">
      <GoodsDeliverySettingCard
        v-if="GOODS_DELIVERY_TYPES.some(item => item.value === GOODS_DELIVERY_TYPE_EXPRESS)"
        v-model:enable="form.enableExpress"
        title="快递发货"
        icon="ph:truck-trailer-fill"
        desc="启用快递发货后, 买家下单才可以选择快递发货."
        :loading="loading"
      >
        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/express')">
          快递公司
        </a-button>

        <a-button size="small" type="text">
          运费模板
        </a-button>

        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/tracking')">
          物流跟踪
        </a-button>
      </GoodsDeliverySettingCard>

      <GoodsDeliverySettingCard
        v-if="GOODS_DELIVERY_TYPES.some(item => item.value === GOODS_DELIVERY_TYPE_SELF)"
        v-model:enable="form.enableSelf"
        title="到店自提"
        icon="ph:barcode"
        desc="启用到店自提后, 买家下单才可以选择到店自提, 自提时段可自定义."
        :loading="loading"
      >
        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/self-pickup')">
          自提设置
        </a-button>
      </GoodsDeliverySettingCard>

      <GoodsDeliverySettingCard
        v-if="GOODS_DELIVERY_TYPES.some(item => item.value === GOODS_DELIVERY_TYPE_LOCAL)"
        v-model:enable="form.enableLocal"
        title="同城配送"
        icon="ph:sneaker-move-fill"
        desc="启用同城配送后, 在配送范围内的订单才可以使用同城配送."
        :loading="loading"
      >
        <a-button size="small" type="text" @click="$router.push('/goods/settings/delivery/city-heros')">
          配送员
        </a-button>

        <a-button size="small" type="text">
          配送范围
        </a-button>
      </GoodsDeliverySettingCard>
    </div>
  </CommonContainer>
</template>
