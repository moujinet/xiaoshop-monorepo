import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Account } from '@/staffs/account/entity'
import { AccountService } from '@/staffs/account/service'
import { AccountController } from '@/staffs/account/controller'

import { Department } from '@/staffs/department/entity'
import { DepartmentService } from '@/staffs/department/service'
import { DepartmentController } from '@/staffs/department/controller'

import { Position } from '@/staffs/position/entity'
import { PositionService } from '@/staffs/position/service'
import { PositionController } from '@/staffs/position/controller'

import { Role } from '@/staffs/role/entity'
import { RoleService } from '@/staffs/role/service'
import { RoleController } from '@/staffs/role/controller'

import { StaffLog } from '@/staffs/log/entity'
import { StaffLogService } from '@/staffs/log/service'
import { StaffLogController } from '@/staffs/log/controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Department,
      Position,
      Role,
      StaffLog,
    ]),
  ],

  controllers: [
    AccountController,
    DepartmentController,
    PositionController,
    RoleController,
    StaffLogController,
  ],

  providers: [
    AccountService,
    DepartmentService,
    PositionService,
    RoleService,
    StaffLogService,
  ],

  exports: [
    AccountService,
    StaffLogService,
  ],
})
export class StaffsModule {}
