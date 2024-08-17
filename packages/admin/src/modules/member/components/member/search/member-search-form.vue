<script lang="ts" setup>
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

import {
  MemberCardSelector,
  MemberGenderSelector,
  MemberGroupSelector,
  MemberSourceSelector,
  MemberStatusSelector,
  MemberTagSelector,
} from '@/member/components'

defineOptions({
  name: 'MemberSearchForm',
})

const emit = defineEmits(['reset'])

const form = defineModel('form', {
  type: Object,
  default: () => ({
    keywordType: 'username',
    keyword: '',
    cardNo: '',
    gender: '',
    source: '',
    status: '',
    tagId: 0,
    cardId: 0,
    groupId: 0,
    exp: [],
    points: [],
    orders: [],
    orderAmount: [],
    createTime: [],
    lastLoginTime: [],
    page: 1,
    size: DEFAULT_PAGE_SIZE,
  }),
})

function handleReset() {
  form.value.exp = []
  form.value.points = []
  form.value.orders = []
  form.value.orderAmount = []
  form.value.createTime = []
  form.value.lastLoginTime = []

  emit('reset')
}
</script>

<template>
  <FormSearch :form="form" default-collapsed @reset="handleReset">
    <a-form-item field="keyword" label="会员账号" show-colon>
      <a-input-group class="flex-auto">
        <a-select v-model="form.keywordType" class="w-110px!">
          <a-option value="username">
            用户名
          </a-option>
          <a-option value="nickname">
            昵称
          </a-option>
          <a-option value="mobile">
            手机号
          </a-option>
        </a-select>

        <a-input v-model="form.keyword" :placeholder="form.keywordType === 'username' ? '请输入用户名' : form.keywordType === 'mobile' ? '请输入手机号' : '请输入昵称'" allow-clear />
      </a-input-group>
    </a-form-item>

    <a-form-item field="cardNo" label="会员卡号" show-colon>
      <a-input v-model="form.cardNo" allow-clear />
    </a-form-item>

    <a-form-item field="cardId" label="会员等级" show-colon>
      <MemberCardSelector v-model="form.cardId" />
    </a-form-item>

    <a-form-item field="tagId" label="会员标签" show-colon>
      <MemberTagSelector v-model="form.tagId" />
    </a-form-item>

    <a-form-item field="status" label="会员状态" show-colon>
      <MemberStatusSelector v-model="form.status" />
    </a-form-item>

    <a-form-item field="groupId" label="会员群体" show-colon>
      <MemberGroupSelector v-model="form.groupId" />
    </a-form-item>

    <template #more>
      <a-form-item field="source" label="注册来源" show-colon>
        <MemberSourceSelector v-model="form.source" />
      </a-form-item>

      <a-form-item field="gender" label="会员性别" show-colon>
        <MemberGenderSelector v-model="form.gender" />
      </a-form-item>

      <a-form-item field="points" label="会员积分" show-colon>
        <a-input-group>
          <a-input v-model="form.points[0]" placeholder="最小值" allow-clear>
            <template #suffix>
              点
            </template>
          </a-input>
          <a-input v-model="form.points[1]" placeholder="最大值" allow-clear>
            <template #suffix>
              点
            </template>
          </a-input>
        </a-input-group>
      </a-form-item>

      <a-form-item field="orders" label="下单数量" show-colon>
        <a-input-group>
          <a-input v-model="form.orders[0]" placeholder="最小值" allow-clear>
            <template #suffix>
              笔
            </template>
          </a-input>
          <a-input v-model="form.orders[1]" placeholder="最大值" allow-clear>
            <template #suffix>
              笔
            </template>
          </a-input>
        </a-input-group>
      </a-form-item>

      <a-form-item field="orderAmount" label="下单金额" show-colon>
        <a-input-group>
          <a-input v-model="form.orderAmount[0]" placeholder="最小值" allow-clear>
            <template #suffix>
              元
            </template>
          </a-input>
          <a-input v-model="form.orderAmount[1]" placeholder="最大值" allow-clear>
            <template #suffix>
              元
            </template>
          </a-input>
        </a-input-group>
      </a-form-item>

      <a-form-item field="createTime" label="注册时间" show-colon>
        <a-range-picker v-model="form.createTime" @clear="form.createTime = []" />
      </a-form-item>
    </template>
  </FormSearch>
</template>
