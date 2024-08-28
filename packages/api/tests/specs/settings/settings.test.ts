import { runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Settings Module', () => {
  beforeAll(async () => {
    await truncateTable(['manage_settings'])

    await runSQL(`INSERT INTO \`manage_settings\` (\`key\`, \`value\`) VALUES
      ('store.name', 'XiaoShop'),
      ('store.logo', ''),
      ('store.tel', ''),
      ('store.enableWeapp', '1'),
      ('store.enableH5', '1'),
      ('store.contact', '云链小朔'),
      ('store.contactMobile', ''),
      ('store.contactPhone', ''),
      ('store.email', 'xiaos@mouji.net'),
      ('store.location', '[]'),
      ('store.address', ''),
      ('store.longitude', ''),
      ('store.latitude', ''),
      ('map.key', ''),
      ('map.enableMobileLocation', '1'),
      ('map.mobileLocationExpire', '15'),
      ('verifyCode.enableOnAdminLogin', '1'),
      ('verifyCode.enableOnLogin', '1'),
      ('verifyCode.enableOnRegister', '1')`)
  })

  it('Update Setting', async () => {
    await useRequest('put', '/settings/update')
      .send([{ key: 'store.name', value: 'XiaoShop Update' }])
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch All Settings', async () => {
    const { body } = await useRequest('get', '/settings/list').expect(200)

    expect(Object.keys(body.data).length).toEqual(19)
  })

  it('Fetch Single Setting', async () => {
    const { body } = await useRequest('get', '/settings/option')
      .query({ key: 'store.name' })
      .expect(200)

    expect(body.data['store.name']).toEqual('XiaoShop Update')
  })

  it('Fetch Settings By Wildcard', async () => {
    const { body } = await useRequest('get', '/settings/option')
      .query({ key: 'map.*' })
      .expect(200)

    expect(Object.keys(body.data).length).toEqual(3)
  })
})
