import { useRequest } from '#/request'

describe('System Setting Module', () => {
  describe('Admin', () => {
    it('Update Setting', async () => {
      await useRequest('put', '/admin/system/settings/update')
        .send([{ key: 'system.log.cleanup.enable', value: '0' }])
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch All Settings', async () => {
      const { body } = await useRequest('get', '/admin/system/settings').expect(200)

      expect(Object.keys(body.data).length).toBeGreaterThan(1)
    })

    it('Fetch Single Setting', async () => {
      const { body } = await useRequest('get', '/admin/system/settings/options')
        .query({ key: 'system.auth.security.passwordStrength' })
        .expect(200)

      expect(body.data['system.auth.security.passwordStrength']).toEqual(['number', 'lower'])
    })

    it('Fetch Settings By Wildcard', async () => {
      const { body } = await useRequest('get', '/admin/system/settings/options')
        .query({ key: 'system.log.*' })
        .expect(200)

      expect(Object.keys(body.data).length).toEqual(2)
    })
  })

  describe('Shop', () => {
    it('Fetch All Settings', async () => {
      const { body } = await useRequest('get', '/system/settings').expect(200)

      expect(Object.keys(body.data).length).toBeGreaterThan(1)
    })

    it('Fetch Single Setting', async () => {
      const { body } = await useRequest('get', '/system/settings/options')
        .query({ key: 'system.auth.security.passwordStrength' })
        .expect(200)

      expect(body.data['system.auth.security.passwordStrength']).toEqual(['number', 'lower'])
    })

    it('Fetch Settings By Wildcard', async () => {
      const { body } = await useRequest('get', '/system/settings/options')
        .query({ key: 'system.log.*' })
        .expect(200)

      expect(Object.keys(body.data).length).toEqual(2)
    })
  })
})
