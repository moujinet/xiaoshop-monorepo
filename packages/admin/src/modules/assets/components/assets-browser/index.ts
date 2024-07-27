import { AssetType, type IAssetType } from '@xiaoshop/schema'
import { createVNode, render } from 'vue'
import AssetsBrowserLayoutModal from './layout/layout-modal.vue'

export interface IUseAssetsBrowserOpenOptions {
  type?: IAssetType
  limit?: number
  onSelect?: (fileList: string[]) => void
}

function openModal(options: IUseAssetsBrowserOpenOptions = {}) {
  let container: HTMLElement | null = document.createElement('div')

  const {
    type = AssetType.IMAGE,
    limit = 1,
    onSelect = () => {},
  } = options

  function handleSelect(selectedAssets: string[]) {
    onSelect(selectedAssets)
  }

  async function handleClose() {
    await nextTick()

    if (container) {
      document.body.removeChild(container)
      container = null
    }
  }

  const vm = createVNode(
    AssetsBrowserLayoutModal,
    {
      type,
      limit,
      visible: true,
      onSubmit: handleSelect,
      onClose: handleClose,
    },
  )

  render(vm, container)
  document.body.appendChild(container)
}

const AssetsBrowserModal = {
  openModal,
}

export default AssetsBrowserModal
