export interface IUseModalOptions {
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
    label = computed(() => '操作'),
    status = computed(() => true),
    onVisible = () => {},
    onBeforeOk = () => Promise.resolve(),
  } = options

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
                loading.value = false
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
