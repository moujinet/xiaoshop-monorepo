import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemPositionEntity } from './position/entity'
import { SystemDepartmentEntity } from './department/entity'
import { SystemPositionAdminService } from './position/admin/service'
import { SystemDepartmentAdminService } from './department/admin/service'
import { SystemPositionAdminController } from './position/admin/controller'
import { SystemDepartmentAdminController } from './department/admin/controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemDepartmentEntity,
      SystemPositionEntity,
    ]),
  ],

  controllers: [
    SystemDepartmentAdminController,
    SystemPositionAdminController,
  ],

  providers: [
    SystemDepartmentAdminService,
    SystemPositionAdminService,
  ],
})
export class SystemOrganizationModule {}
