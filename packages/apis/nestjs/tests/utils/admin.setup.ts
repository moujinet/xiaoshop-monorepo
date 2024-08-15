import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { apiURL, createTestingApplication, runSQL, truncateTable } from '~~/tests/utils'
import { AuthModule } from '@/auth/auth.module'
import { StaffModule } from '@/staff/staff.module'
import { AssetsModule } from '@/assets/assets.module'
import { SettingsModule } from '@/settings/settings.module'
import { GoodsModule } from '@/goods/goods.module'
import { LogisticsModule } from '@/logistics/logistics.module'
import { MemberModule } from '@/member/member.module'
import { UploadModule } from '@/upload/upload.module'

let app: INestApplication
let token: string = ''

async function getApp() {
  if (!app) {
    app = await createTestingApplication([
      SettingsModule.register(),
      AuthModule,
      StaffModule,
      AssetsModule,
      UploadModule,
      GoodsModule,
      LogisticsModule,
      MemberModule,
    ])
  }

  return app
}

function getRequest(method: string, url: string, skipAdmin = false) {
  const agent = request(app.getHttpServer())

  if (method === 'get') {
    return agent.get(apiURL(url, skipAdmin)).auth(token, { type: 'bearer' })
  }
  else if (method === 'post') {
    return agent.post(apiURL(url, skipAdmin)).auth(token, { type: 'bearer' })
  }
  else if (method === 'put') {
    return agent.put(apiURL(url, skipAdmin)).auth(token, { type: 'bearer' })
  }
  else if (method === 'delete') {
    return agent.delete(apiURL(url, skipAdmin)).auth(token, { type: 'bearer' })
  }
}

beforeAll(async () => {
  const app = await getApp()
  await app.init()

  // Truncate
  await truncateTable([
    'manage_staff_account',
    'manage_staff_log',
  ])

  // Init Admin
  await runSQL(`INSERT INTO manage_staff_account (is_admin, status, username, name, password, salt) VALUES
    ('Y', 'normal', 'admin', 'Admin', '$2b$10$6HjLrj5a0Jefr12T.76SRe/5AISF0uVaCaoL0grW.4mKBI/393zNO', '$2b$10$6HjLrj5a0Jefr12T.76SRe')`)

  // Init Token
  const { body } = await request(app.getHttpServer())
    .post('/admin/auth/staff/login')
    .send({
      username: 'admin',
      password: 'admin123',
    })
    .expect(200)

  token = body.data.token
}, 1000)

afterAll(async () => {
  const app = await getApp()
  await app.close()
})

export { getRequest }
