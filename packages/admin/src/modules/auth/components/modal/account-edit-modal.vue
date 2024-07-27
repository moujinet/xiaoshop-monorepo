<script lang="ts" setup>
import { Enabled, StaffAccountStatus } from '@xiaoshop/schema'
import { DepartmentSelector, PositionSelector, StaffRoleSelector, StaffStatusSelector } from '@/auth/components'

import {
  createAccount,
  fetchAccountDetail,
  updateAccount,
} from '@/auth/apis'

defineOptions({
  name: 'AccountEditModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const positionSelectorRef = ref()
const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<{
  username: string
  password: string
  name: string
  mobile: string
  isAdmin: string
  status: string
  roleIds: number[]
  departmentId: number
  positionId: number
}>({
  username: '',
  password: '',
  name: '',
  mobile: '',
  isAdmin: '',
  status: '',
  roleIds: [],
  departmentId: 0,
  positionId: 0,
})
const rules: IFormRules = {
  username: [
    {
      required: true,
      message: '请输入员工账号',
    },
    {
      minLength: 4,
      message: '员工账号至少 4 个字符',
    },
    {
      validator: (value: string, cb: any) => {
        if (!isAlphanumeric(value))
          cb('员工账号必须为字母或数字')
      },
    },
  ],
  password: [
    !isEdit.value && {
      required: true,
      message: '请输入员工密码',
    },
    !isEdit.value && {
      minLength: 6,
      message: '员工密码至少 6 位',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入员工姓名',
    },
  ],
  mobile: [
    {
      required: true,
      message: '请输入员工手机',
    },
    {
      validator: (value: string, cb: any) => {
        if (!isMobilePhone(value, 'zh-CN'))
          cb('请输入正确的手机号码')
      },
    },
  ],
}

const { loading, refreshData } = fetchAccountDetail(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.username = data.username
          form.name = data.name
          form.mobile = data.mobile
          form.status = data.status
          form.isAdmin = data.isAdmin
          form.departmentId = data.department.id
          form.positionId = data.position.id
          form.roleIds = data.roles.map(role => role.id) || []
        })
    }

    form.username = ''
    form.name = ''
    form.mobile = ''
    form.password = ''
    form.isAdmin = Enabled.NO
    form.status = StaffAccountStatus.NORMAL
    form.roleIds = []
    form.departmentId = 0
    form.positionId = 0
  },
  onUpdate: () => {
    if (form.isAdmin === Enabled.YES) {
      form.roleIds = []
    }

    return updateAccount(props.id || 0, form)
  },
  onCreate: () => {
    if (form.isAdmin === Enabled.YES) {
      form.roleIds = []
    }

    return createAccount(form)
  },
  onDone: () => {
    emit('success')
  },
})

function handleDepartmentChange(departmentId: number) {
  form.positionId = 0
  positionSelectorRef.value?.refresh({ departmentId: departmentId || 0 })
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="isEdit ? '编辑员工' : '创建员工'"
    :on-before-ok="handleModalOk"
    :disable-ok="loading"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        scroll-to-first-error
      >
        <FormGroup title="登录信息">
          <a-form-item field="username" label="员工账号" show-colon>
            <div class="form-item">
              <a-input v-model="form.username" placeholder="请输入员工账号" />
            </div>
          </a-form-item>

          <a-form-item field="password" label="员工密码" show-colon>
            <div class="form-item">
              <a-input v-model="form.password" placeholder="请输入员工密码" />
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="角色信息">
          <a-form-item field="isAdmin" label="是否管理员" show-colon>
            <a-switch v-model="form.isAdmin" :checked-value="Enabled.YES" :unchecked-value="Enabled.NO" checked-text="是" unchecked-text="否" />
          </a-form-item>

          <a-form-item v-if="form.isAdmin === Enabled.NO" field="roleIds" label="分配角色" show-colon>
            <div class="form-item">
              <StaffRoleSelector v-model="form.roleIds" placeholder="请分配角色" multiple />
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="账号信息">
          <a-form-item field="departmentId" label="所属部门" show-colon>
            <div class="form-item">
              <DepartmentSelector v-model="form.departmentId" placeholder="请选择所属部门" @change="handleDepartmentChange" />
            </div>
          </a-form-item>

          <a-form-item field="positionId" label="所属职位" show-colon>
            <div class="form-item">
              <PositionSelector ref="positionSelectorRef" v-model="form.positionId" placeholder="请选择所属职位" />
            </div>
          </a-form-item>

          <a-form-item field="name" label="员工姓名" show-colon>
            <div class="form-item">
              <a-input v-model="form.name" placeholder="请输入员工姓名" />
            </div>
          </a-form-item>

          <a-form-item field="mobile" label="员工手机" show-colon>
            <div class="form-item">
              <a-input v-model="form.mobile" placeholder="请输入员工手机" />
            </div>
          </a-form-item>

          <a-form-item field="status" label="状态" show-colon>
            <div class="form-item">
              <StaffStatusSelector v-model="form.status" placeholder="请选择员工状态" />
            </div>
          </a-form-item>
        </FormGroup>
      </a-form>
    </template>
  </CommonModal>
</template>
