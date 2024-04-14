export interface IUseModalOptions {
  form?: Ref<any>
  label?: ComputedRef<string>
  visible?: Ref<boolean>
  loading?: Ref<boolean>
  status?: ComputedRef<boolean>
  onVisible?: () => void
  onBeforeOk?: () => Promise<void>
  onOk?: (done: any) => void
  onOkIfy?: () => Promise<void>
  onOkElse?: () => Promise<void>
  onAfterOk?: () => void
}

export interface IUseModalReturn {
  visible: Ref<boolean>
  loading: Ref<boolean>
  handleModalOk: (done: any) => void
}

export function useModal(options: IUseModalOptions): IUseModalReturn {
  const {
    visible = ref(false),
    loading = ref(false),
    status = computed(() => true),
    onVisible = () => {},
  } = options

  const label = options.label || computed(() => (status.value ? '更新' : '创建'))

  const onBeforeOk = () => {
    if (options.onBeforeOk) {
      return options.onBeforeOk()
    }
    else if (options.form) {
      return options.form.value?.validate()
        .then((err: any) => {
          return err ? Promise.reject(err) : Promise.resolve(true)
        })
    }

    return Promise.resolve(true)
  }

  watch(
    visible,
    () => {
      if (visible.value)
        onVisible()
    },
  )

  const handleModalOk = (done: any) => {
    loading.value = true

    const message = useMessage({
      onClose: () => {
        loading.value = false
        done()
      },
    })

    onBeforeOk()
      .then(() => {
        if (options.onOk) {
          options.onOk(done)
        }
        else {
          const handle = status.value
            ? options.onOkIfy
            : options.onOkElse

          if (handle) {
            handle()
              .then(() => {
                message.success(`${label.value}成功`)
              })
              .catch(() => {
                done(!status.value)
              })
              .finally(() => {
                options.onAfterOk && options.onAfterOk()
              })
          }
        }
      })
      .catch(() => {
        loading.value = false
        done(false)
      })
  }

  return {
    visible,
    loading,
    handleModalOk,
  }
}
