<script lang="ts" setup>
import { RoleAuthForm } from '@/auth/components'
import { fetchRoleDetail, updateRole } from '@/auth/apis'

defineOptions({
  name: 'AuthManageRoleEditPage',
})

const route = useRoute()
const router = useRouter()

const form = reactive<{
  name: string
  desc: string
  permissions: string[]
  sort: number
}>({
  name: '',
  desc: '',
  permissions: [],
  sort: 1,
})

const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入角色名称',
    },
  ],
}

const { loading, refreshData } = fetchRoleDetail(Number(route.query.id))

refreshData().then((res) => {
  form.name = res.name
  form.desc = res.desc
  form.sort = res.sort
  form.permissions = res.permissions
})

function handleSubmit() {
  const message = useMessage({
    onClose: () => {
      router.push({ path: '/auth/manage/roles' })
    },
  })

  updateRole(Number(route.query.id), form)
    .then(() => {
      message.success('保存成功')
    })
    .catch(() => {
      message.error('保存失败')
    })
}
</script>

<template>
  <CommonContainer>
    <FormCard
      :loading="loading"
      :rules="rules"
      :model="form"
      scroll-to-first-error
      @submit="handleSubmit"
    >
      <FormGroup title="角色信息">
        <a-form-item field="name" label="角色名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入角色名称" :disabled="loading" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="角色描述" show-colon>
          <div class="form-item">
            <a-textarea v-model="form.desc" placeholder="请输入角色描述" :disabled="loading" />
          </div>
        </a-form-item>

        <a-form-item field="sort" label="排序" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="form.sort" placeholder="请输入排序" :disabled="loading" />
          </div>
        </a-form-item>
      </FormGroup>

      <FormGroup title="权限信息">
        <RoleAuthForm v-model="form.permissions" />
      </FormGroup>

      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="loading">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
