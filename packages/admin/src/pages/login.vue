<script lang="ts" setup>
defineOptions({
  name: 'LoginPage',
})

const appName = 'XiaoShop'

const splitLogo = computed(() => {
  return appName.split('') || []
})

const isLogin = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false,
})

const route = useRoute()
const router = useRouter()
const { login } = useSession()
const { spaces } = useApp()

function handleLogin() {
  useMessage().loading('登录中...')

  login(
    loginForm.username,
    loginForm.password,
  ).then(() => {
    useMessage({
      onClose: () => {
        router.push({
          path: route.query.redirect
            ? String(route.query.redirect)
            : spaces.value.find(space => space.id === 'shop')?.path,
        })
      },
    }).success('登录成功')
  }).catch(() => {
    useMessage({
      onClose: () => {
        window.location.reload()
      },
    }).error('登录失败')
  })
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-wrapper__view">
      <div class="login-layout">
        <div class="login-layout__hero">
          <IconImageLogo class="login-layout__hero--logo" />

          <div class="login-layout__hero--welcome">
            欢迎使用 <strong>
              <span
                v-for="(word, index) in splitLogo"
                :key="word"
                :style="{
                  zIndex: splitLogo.length - index,
                }"
              >
                {{ word }}
              </span>
            </strong>
          </div>

          <div class="login-layout__hero--slogan">
            致力于提供开箱即用的中后台技术解决方案，助力中小型开发团队快速交付产品。
          </div>

          <div v-if="!isLogin" class="login-layout__hero--actions">
            <div class="login-layout__hero--actions--login" @click="isLogin = true">
              登录管理后台
            </div>
          </div>
        </div>

        <Transition>
          <div v-if="isLogin" class="login-layout__form">
            <div class="login-layout__form--logo">
              <img src="/img/logo.png" alt="logo">
            </div>

            <div class="login-layout__form--title">
              登录您的账号
            </div>

            <div class="login-layout__form--wrapper">
              <a-form :model="loginForm" @submit="handleLogin">
                <a-form-item field="username" hide-label>
                  <a-input v-model="loginForm.username" size="large" placeholder="登录账号">
                    <template #prefix>
                      <CommonIcon name="mingcute:user-1" />
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item field="password" hide-label>
                  <a-input v-model="loginForm.password" size="large" type="password" placeholder="登录密码">
                    <template #prefix>
                      <CommonIcon name="mingcute:key-2" />
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item field="rememberMe" hide-label>
                  <a-checkbox v-model="loginForm.rememberMe">
                    记住我
                  </a-checkbox>
                </a-form-item>

                <a-form-item hide-label>
                  <a-button type="primary" html-type="submit" size="large" long>
                    登 录
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </Transition>
      </div>

      <div class="login-wrapper__view--foot">
        <div class="login-wrapper__view--links">
          <CommonLink>
            关于我们
          </CommonLink>

          <CommonLink>
            意见反馈
          </CommonLink>

          <CommonLink>
            更多资源
          </CommonLink>
        </div>

        <div class="login-wrapper__view--extends">
          本系统由「{{ appName }}」提供技术支持
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#app {
  height: 100%;
  background-image: linear-gradient(-225deg, #E3FDF5 0%, #e6eaff 100%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.login {
  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &__view {
      display: flex;
      flex-direction: column;

      &--foot {
        display: flex;
        padding: 16px 0;
        justify-content: space-between;
      }

      &--links {
        display: flex;
        gap: 20px;
      }

      &--extends {
        color: #999;
      }
    }
  }

  &-layout {
    display: flex;
    width: 980px;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
    transition: var(--page-transition);

    &__form {
      flex: 0 0 39%;
      padding: 100px 40px 0;

      &--logo {
        img {
          width: 32px;
        }
      }

      &--title {
        font-size: 20px;
        font-weight: 500;
        margin: 30px 0;
      }
    }

    &__hero {
      flex: auto;
      color: #fff;
      height: 660px;
      background: url('/img/hero-bg.png') no-repeat center;
      background-size: cover;
      transition: var(--page-transition);

      &--logo {
        float: right;
        margin: 30px 30px 0 0;
        font-size: 20px;
      }

      &--welcome {
        margin-top: 140px;
        font-size: 40px;
        line-height: 1.3;
        padding: 40px;
        user-select: none;

        strong {
          display: block;
          font-size: 60px;
          letter-spacing: -7px;
          padding: 0;
          text-transform: uppercase;

          span {
            position: relative;
            text-shadow: 4px 0 5px rgb(0 0 0 / 20%);
          }
        }
      }

      &--slogan {
        flex: 1;
        font-size: 16px;
        line-height: 1.6;
        padding: 40px 140px 0 40px;
      }

      &--actions {
        padding-top: 100px;
        text-align: center;

        &--login {
          display: inline-block;
          border: 1px solid #fff;
          border-radius: 4px;
          padding: 12px 24px;
          cursor: pointer;

          &:hover {
            background: #fff;
            color: var(--theme-color);
          }
        }
      }
    }
  }
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "blank"
  }
}
</route>
