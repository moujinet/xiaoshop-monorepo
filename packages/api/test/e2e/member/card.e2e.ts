import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Member Module - Card', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_card',
      'member_card_bind',
      'member_card_upgrade',
    ])
  })

  describe('Admin', () => {
    it('Create Card', async () => {
      await useRequest('post', '/admin/member/card/create')
        .send({
          name: 'test',
          cardStyle: { image: '', icon: '', textColor: '#000', bgColor: '#fff', bgImage: '' },
          badgeStyle: { image: '', icon: '', textColor: '#000', bgColor: '#fff' },
          discount: 100,
          pointsRatio: 100,
          plans: [
            { id: 1, type: { key: 1, value: 'test' }, due: 0, price: 0 },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Custom Card', async () => {
      await useRequest('put', '/admin/member/card/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          cardStyle: { image: '', icon: '', textColor: '#000', bgColor: '#fff', bgImage: '' },
          badgeStyle: { image: '', icon: '', textColor: '#000', bgColor: '#fff' },
          discount: 100,
          pointsRatio: 100,
          plans: [
            { id: 1, type: { key: 1, value: 'test' }, due: 1, price: 0 },
            { id: 2, type: { key: 2, value: 'test' }, due: 1, price: 0 },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })
  })

  // describe('Bind', () => {})

  describe('Level Up', () => {
    it('Get Member Card Level Up info List', async () => {
      await useRequest('get', '/admin/member/card/levelup/list')
        .query({ memberId: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })
  })

  describe('Upgrade', () => {
    it('Get Member Card Upgrade List', async () => {
      await useRequest('get', '/admin/member/card/upgrade/list')
        .query({ memberId: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })
  })
})
