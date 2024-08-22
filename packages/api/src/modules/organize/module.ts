import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrganizeDepartment } from '@/organize/department/entity'
import { OrganizeDepartmentService } from '@/organize/department/service'
import { OrganizeDepartmentAdminController } from '@/organize/department/controller.admin'

import { OrganizePosition } from '@/organize/position/entity'
import { OrganizePositionService } from '@/organize/position/service'
import { OrganizePositionAdminController } from '@/organize/position/controller.admin'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrganizeDepartment,
      OrganizePosition,
    ]),
  ],

  controllers: [
    OrganizeDepartmentAdminController,
    OrganizePositionAdminController,
  ],

  providers: [
    OrganizeDepartmentService,
    OrganizePositionService,
  ],

  exports: [
    OrganizeDepartmentService,
    OrganizePositionService,
  ],
})
export class OrganizeModule {}
