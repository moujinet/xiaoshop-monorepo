import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemPositionEntity } from './position/entity'
import { SystemPositionService } from './position/service'
import { SystemDepartmentEntity } from './department/entity'
import { SystemDepartmentService } from './department/service'
import { SystemPositionAdminController } from './position/controller.admin'
import { SystemDepartmentAdminController } from './department/controller.admin'

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
    SystemDepartmentService,
    SystemPositionService,
  ],
})
export class SystemOrganizationModule {}
