import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Approve Member Unregister Event
 */
export class MemberUnregisterApproveEvent extends AdminEvent {
  constructor(
    public readonly applyId: number,
    public readonly memberId: number,
    public readonly memberUsername: string,
    public readonly reason: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `通过注销审批 - ${this.memberUsername} - ${this.reason}`
  }
}

/**
 * Reject Member Unregister Event
 */
export class MemberUnregisterRejectEvent extends AdminEvent {
  constructor(
    public readonly applyId: number,
    public readonly memberId: number,
    public readonly memberUsername: string,
    public readonly reason: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `拒绝注销审批 - ${this.memberUsername} - ${this.reason}`
  }
}
