import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { StaffAccount } from '@/staffs/account/entity'
import { StaffAccountService } from '@/staffs/account/service'
import { StaffAccountAdminController } from '@/staffs/account/controller.admin'

import { StaffDepartment } from '@/staffs/department/entity'
import { StaffDepartmentService } from '@/staffs/department/service'
import { StaffDepartmentAdminController } from '@/staffs/department/controller.admin'

import { StaffPosition } from '@/staffs/position/entity'
import { StaffPositionService } from '@/staffs/position/service'
import { StaffPositionAdminController } from '@/staffs/position/controller.admin'

import { StaffRole } from '@/staffs/role/entity'
import { StaffRoleService } from '@/staffs/role/service'
import { StaffRoleAdminController } from '@/staffs/role/controller.admin'

import { StaffLog } from '@/staffs/log/entity'
import { StaffLogService } from '@/staffs/log/service'
import { StaffLogAdminController } from '@/staffs/log/controller.admin'

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
export class StaffsModule {}
