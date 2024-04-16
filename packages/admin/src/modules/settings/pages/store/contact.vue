<script lang="ts" setup>
defineOptions({
  name: 'StoreContactPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('store'),
    ['contact', 'contactMobile', 'contactPhone', 'area', 'address', 'email'],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="联系方式">
      <a-form :model="form" scroll-to-first-error>
        <a-form-item field="contact" label="联系人" show-colon required>
          <div class="form-item">
            <a-input
              v-model="form.contact"
              class="half-w"
              placeholder="请输入联系人"
            />
          </div>
        </a-form-item>
        <a-form-item field="contactMobile" label="联系人手机" show-colon required>
          <div class="form-item">
            <a-input
              v-model="form.contactMobile"
              placeholder="请输入联系人手机"
            />
          </div>
        </a-form-item>
        <a-form-item field="contactPhone" label="联系电话" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.contactPhone"
              placeholder="请输入联系电话"
            />
          </div>
        </a-form-item>
        <a-form-item field="area" label="联系地址" show-colon>
          <div class="form-item-full">
            <FormAreaSelect v-model="form.area" class="form-item-lg">
              <a-input-search
                v-model="form.address"
                placeholder="请输入详细地址"
              />
            </FormAreaSelect>
            <div class="map" />
          </div>
        </a-form-item>
        <a-form-item field="email" label="电子邮箱" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.email"
              placeholder="请输入电子邮箱"
            />
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>

<style lang="less" scoped>
.map {
  width: 90%;
  height: 400px;
  margin-top: var(--page-padding-sm);
  background-color: var(--color-fill-2);
}
</style>
