export interface IUseFormOptions {
  form?: Ref<any>
  label?: ComputedRef<string>
  visible?: Ref<boolean>
  loading?: Ref<boolean>
  status?: ComputedRef<boolean>
  onVisible?: () => void
  onBeforeSubmit?: () => Promise<void>
  onSubmit?: (done: any) => void
  onUpdate?: () => Promise<void>
  onCreate?: () => Promise<void>
  onDone?: () => void
}

export interface IUseFormReturn {
  visible: Ref<boolean>
  loading: Ref<boolean>
  handleModalOk: (done: any) => void
}

export function useForm(options: IUseFormOptions): IUseFormReturn {
  const {
    visible = ref(false),
    loading = ref(false),
    status = computed(() => false),
    onVisible = () => {},
  } = options

  const label = options.label || computed(() => (status.value ? '更新' : '创建'))

  const onBeforeSubmit = () => {
    if (options.onBeforeSubmit) {
      return options.onBeforeSubmit()
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

    onBeforeSubmit()
      .then(() => {
        if (options.onSubmit) {
          options.onSubmit(done)
        }
        else {
          const handle = status.value
            ? options.onUpdate
            : options.onCreate

          if (handle) {
            handle()
              .then(() => {
                message.success(`${label.value}成功`)
              })
              .catch(() => {
                done(!status.value)
              })
              .finally(() => {
                if (options.onDone)
                  options.onDone()
              })
          }
        }
      })
      .catch(() => {
        loading.value = false
        done(false)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    visible,
    loading,
    handleModalOk,
  }
}
