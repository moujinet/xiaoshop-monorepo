import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SystemDepartment } from './department/entity'
import { SystemDepartmentPosition } from './position/entity'
import { SystemDepartmentService } from './department/service'
import { SystemDepartmentPositionService } from './position/service'
import { SystemDepartmentAdminController } from './department/controller.admin'
import { SystemDepartmentPositionAdminController } from './position/controller.admin'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemDepartment,
      SystemDepartmentPosition,
    ]),
  ],

  controllers: [
    SystemDepartmentAdminController,
    SystemDepartmentPositionAdminController,
  ],

  providers: [
    SystemDepartmentService,
    SystemDepartmentPositionService,
  ],
})
export class SystemOrganizeModule {}
