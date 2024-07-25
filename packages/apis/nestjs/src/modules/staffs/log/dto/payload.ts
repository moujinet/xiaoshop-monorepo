import type { IStaffAccountInfo, IStaffLogExtra } from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator'
import { example } from './example'
import { AccountInfoPayload } from '@/staffs/account/dto'

/**
 * 员工操作日志额外信息 DTO
 */
export class StaffLogExtraPayload implements IStaffLogExtra {
  @ApiProperty({ description: '操作系统', example: example.extra.os })
  os: string

  @ApiProperty({ description: '浏览器', example: example.extra.ua })
  ua: string

  @ApiProperty({ description: '操作 IP', example: example.extra.ip })
  ip: string
}

/**
 * 员工操作日志 DTO
 */
export class StaffLogPayload {
  @ApiProperty({ type: AccountInfoPayload, description: '操作员工', example: example.staff })
  @Type(() => AccountInfoPayload)
  @IsNotEmptyObject()
  readonly staff: IStaffAccountInfo

  @ApiProperty({ description: '日志操作', example: example.action })
  @IsString()
  @IsNotEmpty()
  readonly action: string

  @ApiProperty({ description: '日志内容', example: example.content })
  @IsString()
  @IsNotEmpty()
  readonly content: string

  @ApiProperty({ type: StaffLogExtraPayload, description: '额外信息' })
  @Type(() => StaffLogExtraPayload)
  @IsNotEmptyObject()
  readonly extra: IStaffLogExtra
}
