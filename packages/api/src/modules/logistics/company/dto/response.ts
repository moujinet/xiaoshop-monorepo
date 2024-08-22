import type {
  ILogisticsCompany,
  ILogisticsCompanyListItem,
} from '@xiaoshop/shared'
import { ApiProperty, OmitType } from '@nestjs/swagger'

/**
 * 获取物流公司响应 DTO
 */
export class LogisticsCompanyResponse implements ILogisticsCompany {
  @ApiProperty({ description: '物流公司 ID' })
  readonly id: number

  @ApiProperty({ description: '公司名称', example: '快递公司' })
  readonly name: string

  @ApiProperty({ description: '公司介绍', example: '快递公司介绍' })
  readonly desc: string

  @ApiProperty({ description: '公司官网', example: 'https://www.express.com' })
  readonly url: string

  @ApiProperty({ description: '排序', default: 1 })
  readonly sort: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 获取物流公司列表响应 DTO
 */
export class LogisticsCompanyListResponse
  extends OmitType(LogisticsCompanyResponse, ['createdTime'] as const)
  implements ILogisticsCompanyListItem {}
