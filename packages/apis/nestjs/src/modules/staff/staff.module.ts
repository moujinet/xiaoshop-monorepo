import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { StaffAccount } from '@/staff/account/entity'
import { StaffAccountService } from '@/staff/account/service'
import { StaffAccountAdminController } from '@/staff/account/controller.admin'

import { StaffDepartment } from '@/staff/department/entity'
import { StaffDepartmentService } from '@/staff/department/service'
import { StaffDepartmentAdminController } from '@/staff/department/controller.admin'

import { StaffPosition } from '@/staff/position/entity'
import { StaffPositionService } from '@/staff/position/service'
import { StaffPositionAdminController } from '@/staff/position/controller.admin'

import { StaffRole } from '@/staff/role/entity'
import { StaffRoleService } from '@/staff/role/service'
import { StaffRoleAdminController } from '@/staff/role/controller.admin'

import { StaffLog } from '@/staff/log/entity'
import { StaffLogService } from '@/staff/log/service'
import { StaffLogAdminController } from '@/staff/log/controller.admin'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffAccount,
      StaffDepartment,
      StaffPosition,
      StaffRole,
      StaffLog,
    ]),
  ],

  controllers: [
    StaffAccountAdminController,
    StaffDepartmentAdminController,
    StaffPositionAdminController,
    StaffRoleAdminController,
    StaffLogAdminController,
  ],

  providers: [
    StaffAccountService,
    StaffDepartmentService,
    StaffPositionService,
    StaffRoleService,
    StaffLogService,
  ],

  exports: [
    StaffAccountService,
    StaffLogService,
  ],
})
export class StaffModule {}
