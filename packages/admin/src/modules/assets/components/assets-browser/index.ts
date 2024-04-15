import { createVNode, render } from 'vue'
import AssetsBrowserLayoutModal from './layout/layout-modal.vue'
import { ASSET_TYPE_IMAGE } from '~/constants'
import type { IAssetSnapshot, IAssetType } from '@/assets/types'

export interface IUseAssetsBrowserOpenOptions {
  type?: IAssetType
  limit?: number
  onSelect?: (fileList: IAssetSnapshot[]) => void
}

function openModal(options: IUseAssetsBrowserOpenOptions = {}) {
  let container: HTMLElement | null = document.createElement('div')

  const {
    type = ASSET_TYPE_IMAGE,
    limit = 1,
    onSelect = () => {},
  } = options

  function handleSelect(selectedAssets: IAssetSnapshot[]) {
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
