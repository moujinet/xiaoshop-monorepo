import { useRequest } from '~~/tests/utils'

describe('System Setting Module', () => {
  describe('Admin', () => {
    it('Update Setting', async () => {
      await useRequest('put', '/system/settings/update')
        .send([{ key: 'store.name', value: 'XiaoShop Update' }])
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })
  })

  describe('Setting', () => {
    it('Fetch All Settings', async () => {
      const { body } = await useRequest('get', '/system/settings').expect(200)

      expect(Object.keys(body.data).length).toBeGreaterThan(1)
    })

    it('Fetch Store Setting', async () => {
      const { body } = await useRequest('get', '/system/settings/store')
        .query({ key: 'store.name' })
        .expect(200)

      expect(body.data['store.name']).toEqual('XiaoShop Update')
    })

    it('Fetch Single Setting', async () => {
      const { body } = await useRequest('get', '/system/settings/options')
        .query({ key: 'system.auth.security.passwordStrength' })
        .expect(200)

      expect(body.data['system.auth.security.passwordStrength']).toEqual(['number', 'lower'])
    })

    it('Fetch Settings By Wildcard', async () => {
      const { body } = await useRequest('get', '/system/settings/options')
        .query({ key: 'store.*' })
        .expect(200)

      expect(Object.keys(body.data).length).toEqual(11)
    })
  })
})
