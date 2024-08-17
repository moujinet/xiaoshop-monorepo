<script lang="ts" setup>
import {
  MEMBER_GENDERS,
  MemberGender,
  MemberStatus,
} from '@xiaoshop/schema'

import {
  MemberAddressPanel,
  MemberAvatar,
  MemberCardBadge,
  MemberCardSetupModal,
  MemberFavoritePanel,
  MemberHistoryPanel,
  MemberOperationPanel,
  MemberOrdersPanel,
  MemberPointsPanel,
  MemberPointsSetupModal,
  MemberSourceBadge,
  MemberStatusBadge,
  MemberTagSetupModal,
} from '@/member/components'

import {
  fetchMemberAccount,
  fetchMemberProfile,
  updateMemberStatus,
} from '@/member/apis'

defineOptions({
  name: 'MemberManageAccountProfilePage',
  inheritAttrs: false,
})

const { getFullUrl } = useAsset()
const { getOption } = useSettings()
const { toName } = useLocation()

const route = useRoute()
const memberId = Number(route.query.id)
const avatarUrl = ref<string>('')
const tab = ref<string>('orders')

const defaultAvatar = getOption('member.register.defaultAvatar', '') as string

const {
  loading: profileLoading,
  data: profile,
  refreshData: loadProfile,
} = fetchMemberProfile(memberId)

const {
  loading: accountLoading,
  data: account,
  refreshData: loadAccount,
} = fetchMemberAccount(memberId)

const message = useMessage({
  onClose: () => {
    refresh()
  },
})

watch(
  () => route.query.id,
  () => {
    loadProfile()
      .then((res) => {
        avatarUrl.value = getFullUrl(res.avatar || defaultAvatar)
      })

    loadAccount()
  },
  { immediate: true },
)

function refresh() {
  loadProfile()
}

function handleBlockMember(id: number) {
  updateMemberStatus(id, MemberStatus.BLOCKED)
    .then(() => {
      message.success('冻结成功')
    })
}

function handleEnableMember(id: number) {
  updateMemberStatus(id, MemberStatus.NORMAL)
    .then(() => {
      message.success('恢复成功')
    })
}
</script>

<template>
  <CommonContainer>
    <template #extra>
      <a-space>
        <MemberCardSetupModal :ids="[memberId]" @success="refresh">
          <a-button type="primary">
            设置等级
          </a-button>
        </MemberCardSetupModal>

        <MemberTagSetupModal :ids="[memberId]" @success="refresh">
          <a-button type="primary">
            设置标签
          </a-button>
        </MemberTagSetupModal>

        <MemberPointsSetupModal :ids="[memberId]" @success="refresh">
          <a-button type="primary">
            赠送积分
          </a-button>
        </MemberPointsSetupModal>
      </a-space>
    </template>

    <a-layout>
      <a-layout-sider class="shadow-none!" style="background: transparent" :width="260">
        <CommonPanel collapsed>
          <template v-if="profileLoading">
            <a-skeleton animation>
              <div class="p-4">
                <div class="flex-(~ row v-center) gap-4 mb-6">
                  <div>
                    <a-skeleton-shape shape="circle" size="large" />
                  </div>
                  <div class="flex-1">
                    <a-skeleton-line :rows="2" />
                  </div>
                </div>

                <a-skeleton-line :rows="8" />
              </div>
            </a-skeleton>
          </template>

          <template v-else>
            <div class="flex-(~ col)">
              <div
                class="rounded-t-3px overflow-hidden"
                :style="{
                  backgroundImage: `url(${avatarUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: profile.status === MemberStatus.BLOCKED ? 'grayscale(1)' : '',
                }"
              >
                <div class="backdrop-blur-2xl px-8 py-7">
                  <div class="flex-(~ v-center) gap-4">
                    <MemberAvatar shape="circle" :avatar="profile.avatar" :size="64" class="ring-(~ white/70)" />

                    <div class="flex-(~ 1 col) gap-2">
                      <div class="flex-(~ 1 v-center) gap-0.5">
                        <div class="text-18px font-500 max-w-(100px) truncate">
                          {{ profile.nickname || '' }}
                        </div>

                        <CommonIcon
                          v-if="profile.gender !== MemberGender.UNKNOWN"
                          :name="MEMBER_GENDERS.find(item => item.value === profile.gender)?.icon || ''"
                          :color="MEMBER_GENDERS.find(item => item.value === profile.gender)?.color || ''"
                          :inline="false"
                        />
                      </div>

                      <div class="flex-(~ v-center) gap-2">
                        <MemberCardBadge v-if="profile.card" :card="profile.card" />

                        <MemberCardSetupModal v-if="profile.status === MemberStatus.NORMAL" :ids="[memberId]" @success="refresh">
                          <CommonIcon
                            name="mingcute:edit"
                            :inline="false"
                            class="hover:text-$theme-color-light text-$theme-color cursor-pointer"
                          />
                        </MemberCardSetupModal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 py-2">
              <ul class="member-profile-list">
                <li>
                  <a-tooltip content="用户名" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:user-3" :inline="false" />
                  </a-tooltip>
                  <span>{{ profile.username || '-' }}</span>
                </li>

                <li>
                  <a-tooltip content="会员卡号" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:idcard" :inline="false" />
                  </a-tooltip>
                  <span>{{ profile.cardNo || '-' }}</span>
                </li>

                <li>
                  <a-tooltip content="手机号" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:phone" :inline="false" />
                  </a-tooltip>
                  <span>{{ profile.mobile ? hidePhone(profile.mobile) : '-' }}</span>
                </li>

                <li>
                  <a-tooltip content="生日" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:birthday-2" :inline="false" />
                  </a-tooltip>
                  <span>
                    {{ profile.birthday ? `${formatDateTime(profile.birthday, 'MM月DD日')} (${getAge(profile.birthday)}岁)` : '-' }}
                  </span>
                </li>

                <li>
                  <a-tooltip content="所在城市" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:mailbox" :inline="false" />
                  </a-tooltip>
                  <span>{{ profile.location.length ? toName(profile.location, ' ') : '-' }}</span>
                </li>

                <li>
                  <a-tooltip content="注册来源" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:device" :inline="false" />
                  </a-tooltip>

                  <MemberSourceBadge :value="profile.source" />
                </li>

                <li>
                  <a-tooltip content="注册时间" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:calendar-3" :inline="false" />
                  </a-tooltip>
                  <span>{{ profile.createdTime ? formatDateTime(profile.createdTime) : '-' }}</span>
                </li>

                <li>
                  <a-tooltip content="最后登录时间" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:time" :inline="false" />
                  </a-tooltip>
                  <span>{{ profile.lastLoginTime ? formatTimeAgo(profile.lastLoginTime) : '-' }}</span>
                </li>

                <li>
                  <a-tooltip content="账号状态" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:warning" :inline="false" />
                  </a-tooltip>

                  <div class="flex-(~ 1 v-center between)">
                    <MemberStatusBadge :status="profile.status" dotted />

                    <CommonConfirm
                      btn-size="small"
                      btn-status="normal"
                      :confirm-ok-text="profile.status === MemberStatus.BLOCKED ? '恢复' : '冻结'"
                      @ok="profile.status === MemberStatus.BLOCKED ? handleEnableMember(profile.id) : handleBlockMember(profile.id)"
                    />
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="profile.group || profile.tags.length" class="px-4 py-2 b-t-(1 dotted $color-border-2)">
              <ul class="member-profile-list">
                <li v-if="profile.group">
                  <a-tooltip content="群体" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:group-3" :inline="false" />
                  </a-tooltip>

                  <a-tag size="small" color="blue">
                    {{ profile.group.name }}
                  </a-tag>
                </li>
                <li v-if="profile.tags.length">
                  <a-tooltip content="标签" mini>
                    <CommonIcon class="member-profile-icon" name="mingcute:tag-2" :inline="false" />
                  </a-tooltip>

                  <div class="flex-(inline v-center wrap) gap-2">
                    <a-tag v-for="tag in profile.tags" :key="tag.id" size="small" color="gray">
                      {{ tag.name }}
                    </a-tag>

                    <MemberTagSetupModal v-if="profile.status === MemberStatus.NORMAL" :ids="[memberId]" @success="refresh">
                      <CommonIcon
                        name="mingcute:edit"
                        :inline="false"
                        class="hover:text-$theme-color-light text-$theme-color cursor-pointer"
                      />
                    </MemberTagSetupModal>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </CommonPanel>
      </a-layout-sider>

      <a-layout-content class="pl-5">
        <div class="flex-(~ col) gap-4 w-full">
          <CommonPanel>
            <template v-if="accountLoading">
              <a-skeleton animation>
                <div class="flex-(~ v-center between) gap-8 px-8 py-2">
                  <div v-for="i in 5" :key="i" class="flex-1">
                    <a-skeleton-line :rows="2" />
                  </div>
                </div>
              </a-skeleton>
            </template>

            <template v-else>
              <div class="flex-(~ v-center between) px-8 py-2">
                <a-statistic :value="account.orderAmount || 0" :precision="2" :value-from="0" show-group-separator animation>
                  <template #title>
                    <span class="text-($color-text-3 12px)"> 累计消费总额</span>
                  </template>

                  <template #suffix>
                    <span class="text-$color-text-3 font-normal"> 元</span>
                  </template>
                </a-statistic>

                <a-statistic :value="account.orders || 0" :value-from="0" show-group-separator animation>
                  <template #title>
                    <span class="text-($color-text-3 12px)">累计订单量</span>
                  </template>

                  <template #suffix>
                    <span class="text-$color-text-3 font-normal"> 单</span>
                  </template>
                </a-statistic>

                <a-statistic :value="account.balance || 0" :value-from="0" show-group-separator animation>
                  <template #title>
                    <span class="text-($color-text-3 12px)">账户余额</span>
                  </template>

                  <template #suffix>
                    <span class="text-$color-text-3 font-normal"> 元</span>
                  </template>
                </a-statistic>

                <a-statistic :value="account.exp || 0" :value-from="0" show-group-separator animation>
                  <template #title>
                    <span class="text-($color-text-3 12px)">当前成长值</span>
                  </template>

                  <template #suffix>
                    <span class="text-$color-text-3 font-normal"> 点</span>
                  </template>
                </a-statistic>

                <a-statistic :value="account.points || 0" :value-from="0" show-group-separator animation>
                  <template #title>
                    <div class="flex-(~ v-center)">
                      <span class="text-($color-text-3 12px)">当前积分</span>

                      <MemberPointsSetupModal v-if="profile && profile.status === MemberStatus.NORMAL" :ids="[memberId]" @success="refresh">
                        <CommonIcon
                          name="mingcute:edit"
                          :inline="false"
                          class="hover:text-$theme-color-light text-$theme-color cursor-pointer ml-1"
                        />
                      </MemberPointsSetupModal>
                    </div>
                  </template>

                  <template #suffix>
                    <span class="text-$color-text-3 font-normal"> 点</span>
                  </template>
                </a-statistic>

                <a-statistic :value="account.signIn || 0" :value-from="0" show-group-separator animation>
                  <template #title>
                    <span class="text-($color-text-3 12px)">累计签到</span>
                  </template>

                  <template #suffix>
                    <span class="text-$color-text-3 font-normal"> 次</span>
                  </template>
                </a-statistic>
              </div>
            </template>
          </CommonPanel>

          <CommonPanel>
            <div class="w-full">
              <a-tabs v-model:active-key="tab" size="large" type="rounded">
                <a-tab-pane key="orders" title="消费记录">
                  <MemberOrdersPanel :id="memberId" :visible="tab === 'orders'" />
                </a-tab-pane>

                <a-tab-pane key="points" title="积分明细">
                  <MemberPointsPanel :id="memberId" :visible="tab === 'points'" />
                </a-tab-pane>

                <a-tab-pane key="history" title="浏览记录">
                  <MemberHistoryPanel :id="memberId" :visible="tab === 'history'" />
                </a-tab-pane>

                <a-tab-pane key="favorites" title="收藏商品">
                  <MemberFavoritePanel :id="memberId" :visible="tab === 'favorites'" />
                </a-tab-pane>

                <a-tab-pane key="address" title="收货地址">
                  <MemberAddressPanel :id="memberId" :visible="tab === 'address'" />
                </a-tab-pane>

                <a-tab-pane key="operation" title="操作日志">
                  <MemberOperationPanel :id="memberId" :visible="tab === 'operation'" />
                </a-tab-pane>
              </a-tabs>
            </div>
          </CommonPanel>
        </div>
      </a-layout-content>
    </a-layout>
  </CommonContainer>
</template>

<style lang="less" scoped>
.member-profile-list {
  list-style: none;
  padding: 0;
  margin-left: 8px;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .member-profile-icon {
      color: var(--color-text-4);
      margin-right: 12px;
      font-size: 16px;
    }
  }
}
</style>
