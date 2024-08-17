<script lang="ts" setup>
import {
  type IMemberCardDict,
  type IMemberGroup,
  type IMemberGroupCondKey,
  type IMemberTagDict,
  MEMBER_CARD_TYPES,
  MEMBER_GENDERS,
  MEMBER_GROUP_COND_KEYS,
  MEMBER_GROUP_COND_OPERATORS,
  MEMBER_SOURCES,
  MEMBER_STATUSES,
  MemberGroupCondKey,
  MemberGroupCondOperator,
} from '@xiaoshop/schema'

import {
  createMemberGroup,
  fetchMemberCardDictList,
  fetchMemberGroup,
  fetchMemberTagDictList,
  updateMemberGroup,
} from '@/member/apis'

defineOptions({
  name: 'MemberGroupModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<Partial<IMemberGroup>>({})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入群体名称',
    },
  ],
}
const editCondKey = ref<IMemberGroupCondKey | null>()
const tagsDict = ref<IMemberTagDict[]>([])
const cardsDict = ref<IMemberCardDict[]>([])

const {
  loading,
  refreshData: loadData,
} = fetchMemberGroup(props.id || 0)

const { loading: loadingCards, refreshData: loadCards } = fetchMemberCardDictList()
const { loading: loadingTags, refreshData: loadTags } = fetchMemberTagDictList()

function loadCardsData() {
  if (
    cardsDict.value.length === 0
    && form.conditions
    && form.conditions.find(cond => cond.key === MemberGroupCondKey.CARD)
  ) {
    loadCards().then((res) => {
      cardsDict.value = res
    })
  }
}

function loadTagsData() {
  if (
    tagsDict.value.length === 0
    && form.conditions
    && form.conditions.find(cond => cond.key === MemberGroupCondKey.TAG)
  ) {
    loadTags().then((res) => {
      tagsDict.value = res
    })
  }
}

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      loadData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.desc = data.desc
          form.conditions = data.conditions
        })
        .then(() => {
          loadTagsData()
          loadCardsData()
        })
    }

    form.name = ''
    form.desc = ''
    form.conditions = []
  },
  onUpdate: () => {
    form.conditions?.map((cond) => {
      cond.value = cond.value.filter(val => !!val)
      return cond
    })

    return updateMemberGroup(props.id || 0, form)
  },
  onCreate: () => {
    form.conditions?.map((cond) => {
      cond.value = cond.value.filter(val => !!val)
      return cond
    })

    return createMemberGroup(form)
  },
  onDone: () => {
    emit('success')
  },
})

function isRangeCond(CondKey: IMemberGroupCondKey) {
  return ![
    MemberGroupCondKey.SOURCE,
    MemberGroupCondKey.STATUS,
    MemberGroupCondKey.CARD,
    MemberGroupCondKey.TAG,
    MemberGroupCondKey.GENDER,
  ].includes(CondKey as MemberGroupCondKey)
}

function isDateTimeCond(CondKey: IMemberGroupCondKey) {
  return [
    MemberGroupCondKey.BIRTHDAY,
    MemberGroupCondKey.CREATED_TIME,
  ].includes(CondKey as MemberGroupCondKey)
}

function isCondKeyChecked(CondKey: IMemberGroupCondKey) {
  return form.conditions?.some(cond => cond.key === CondKey)
}

function handleCondKeyCheck(CondKey: IMemberGroupCondKey) {
  if (isCondKeyChecked(CondKey)) {
    form.conditions?.splice(
      form.conditions.findIndex(cond => cond.key === CondKey as IMemberGroupCondKey),
      1,
    )
    editCondKey.value = editCondKey.value === CondKey ? null : CondKey
  }
  else {
    form.conditions?.push({
      key: CondKey,
      name: MEMBER_GROUP_COND_KEYS.find(cond => cond.value === CondKey)?.label || '',
      operator: MemberGroupCondOperator.IN,
      value: [],
    })

    editCondKey.value = CondKey

    loadTagsData()
    loadCardsData()
  }
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="isEdit ? '编辑会员群体' : '创建会员群体'"
    :on-before-ok="handleModalOk"
    :disable-ok="loading"
    :width="900"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        layout="vertical"
        scroll-to-first-error
      >
        <a-form-item field="name" label="群体名称" show-colon>
          <a-input v-model="form.name" placeholder="请输入群体名称" />
        </a-form-item>

        <a-form-item field="desc" label="群体描述" show-colon>
          <a-textarea v-model="form.desc" placeholder="群体描述" :max-length="60" show-word-limit auto-size />
        </a-form-item>

        <a-form-item label="筛选条件" show-colon>
          <a-grid :cols="9" :col-gap="12" :row-gap="12">
            <a-grid-item v-for="cond in MEMBER_GROUP_COND_KEYS" :key="cond.value">
              <a-tag
                color="arcoblue"
                bordered
                checkable
                :checked="isCondKeyChecked(cond.value)"
                @check="handleCondKeyCheck(cond.value)"
              >
                {{ cond.label }}
              </a-tag>
            </a-grid-item>
          </a-grid>
        </a-form-item>

        <a-form-item label="条件设置" show-colon>
          <div class="form-item-full">
            <div class="common-grid mb-2" style="grid-template-columns: 110px 180px 1fr">
              <div class="common-grid__header">
                选项
              </div>
              <div class="common-grid__header">
                范围
              </div>
              <div class="common-grid__header">
                条件
              </div>
            </div>

            <a-scrollbar style="height: 265px; overflow: auto">
              <div class="common-grid place-items-stretch!" style="grid-template-columns: 110px 180px 1fr">
                <template v-for="cond in form.conditions" :key="cond.key">
                  <div class="common-grid__col">
                    <a-tag bordered>
                      {{ cond.name }}
                    </a-tag>
                  </div>

                  <div class="common-grid__col">
                    <a-radio-group v-model="cond.operator" :disabled="isRangeCond(cond.key)" direction="horizontal">
                      <a-radio v-for="opt in MEMBER_GROUP_COND_OPERATORS" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                      </a-radio>
                    </a-radio-group>
                  </div>

                  <div class="common-grid__col" :class="cond.value.length ? 'flex-between' : 'flex-justify-end'">
                    <template v-if="editCondKey !== cond.key">
                      <div class="flex-(~ 1 gap-2 wrap v-center)">
                        <template v-for="(val, index) in cond.value.filter(val => !!val)" :key="val">
                          <a-tag>
                            <template v-if="cond.key === MemberGroupCondKey.GENDER">
                              {{ MEMBER_GENDERS.find(opt => opt.value === val)?.label }}
                            </template>

                            <template v-else-if="cond.key === MemberGroupCondKey.SOURCE">
                              {{ MEMBER_SOURCES.find(opt => opt.value === val)?.label }}
                            </template>

                            <template v-else-if="cond.key === MemberGroupCondKey.STATUS">
                              {{ MEMBER_STATUSES.find(opt => opt.value === val)?.label }}
                            </template>

                            <template v-else-if="cond.key === MemberGroupCondKey.CARD">
                              {{ cardsDict.find(opt => opt.id === Number(val))?.name }}
                            </template>

                            <template v-else-if="cond.key === MemberGroupCondKey.TAG">
                              {{ tagsDict.find(opt => opt.id === Number(val))?.name }}
                            </template>

                            <template v-else>
                              {{ val }}
                            </template>
                          </a-tag>

                          <template v-if="isRangeCond(cond.key) && index < cond.value.length - 1">
                            <small class="text-$color-text-2">-</small>
                          </template>
                        </template>
                      </div>
                    </template>

                    <div v-else class="flex-1">
                      <template v-if="cond.key === MemberGroupCondKey.GENDER">
                        <a-checkbox-group v-model="cond.value">
                          <a-checkbox v-for="opt in MEMBER_GENDERS" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                          </a-checkbox>
                        </a-checkbox-group>
                      </template>

                      <template v-else-if="cond.key === MemberGroupCondKey.STATUS">
                        <a-checkbox-group v-model="cond.value">
                          <a-checkbox v-for="opt in MEMBER_STATUSES" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                          </a-checkbox>
                        </a-checkbox-group>
                      </template>

                      <template v-else-if="cond.key === MemberGroupCondKey.SOURCE">
                        <a-checkbox-group v-model="cond.value">
                          <a-grid :cols="3" :col-gap="8" :row-gap="8">
                            <a-grid-item v-for="opt in MEMBER_SOURCES" :key="opt.value">
                              <a-checkbox :value="opt.value">
                                {{ opt.label }}
                              </a-checkbox>
                            </a-grid-item>
                          </a-grid>
                        </a-checkbox-group>
                      </template>

                      <template v-else-if="cond.key === MemberGroupCondKey.CARD">
                        <a-spin :loading="loadingCards">
                          <a-checkbox-group v-model="cond.value">
                            <FormGroup v-for="type in MEMBER_CARD_TYPES" :key="type.value" :title="type.label">
                              <a-grid :cols="4" :col-gap="8" :row-gap="8">
                                <a-grid-item v-for="opt in cardsDict.filter(card => card.type === type.value)" :key="opt.id">
                                  <a-checkbox :value="opt.id">
                                    {{ opt.name }}
                                  </a-checkbox>
                                </a-grid-item>
                              </a-grid>
                            </FormGroup>
                          </a-checkbox-group>
                        </a-spin>
                      </template>

                      <template v-else-if="cond.key === MemberGroupCondKey.TAG">
                        <a-spin :loading="loadingTags">
                          <a-checkbox-group v-model="cond.value">
                            <a-grid :cols="3" :col-gap="8" :row-gap="8">
                              <a-grid-item v-for="opt in tagsDict" :key="opt.id">
                                <a-checkbox :value="opt.id">
                                  {{ opt.name }}
                                </a-checkbox>
                              </a-grid-item>
                            </a-grid>
                          </a-checkbox-group>
                        </a-spin>
                      </template>

                      <template v-else-if="isDateTimeCond(cond.key)">
                        <a-range-picker v-model="cond.value" />
                      </template>

                      <template v-else-if="isRangeCond(cond.key)">
                        <a-input-group>
                          <a-input v-model="cond.value[0]">
                            <template #prefix>
                              从
                            </template>
                          </a-input>
                          <a-input v-model="cond.value[1]">
                            <template #prefix>
                              至
                            </template>
                          </a-input>
                        </a-input-group>
                      </template>
                    </div>

                    <CommonLink type="primary" class="mr-3" @click="() => editCondKey = editCondKey === cond.key ? null : cond.key">
                      {{ editCondKey === cond.key ? '确认' : '设置' }}
                    </CommonLink>
                  </div>
                </template>
              </div>
              <CommonEmpty
                v-if="form.conditions && form.conditions.length === 0"
                description="请选择至少一个条件进行筛选"
              />
            </a-scrollbar>
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
