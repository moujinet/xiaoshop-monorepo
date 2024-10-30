import { MemberUnregisterStatus } from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsString, Min, ValidateIf } from 'class-validator'

/**
 * Apply Member Unregister
 */
export class ApplyMemberUnregisterPayload {
}

/**
 * Audit Member Unregister
 */
export class AuditMemberUnregisterPayload {
  @IsNumber({}, { message: '审批状态不正确' })
  @Min(MemberUnregisterStatus.APPROVED, { message: '审批状态不正确' })
  readonly status: MemberUnregisterStatus

  @IsString({ message: '审批原因不正确' })
  @ValidateIf(o => o.status === MemberUnregisterStatus.REJECTED)
  @IsNotEmpty({ message: '审批原因不能为空' })
  readonly auditReason?: string
}
