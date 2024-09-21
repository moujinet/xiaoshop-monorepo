import { IsNotEmpty, IsString } from 'class-validator'

export class SystemMonitorCronPayload {
  @IsString({ message: '所在模块不正确' })
  @IsNotEmpty({ message: '所在模块不能为空' })
  readonly module: string

  @IsString({ message: '任务名称不正确' })
  @IsNotEmpty({ message: '任务名称不能为空' })
  readonly name: string

  @IsString({ message: '任务描述不正确' })
  @IsNotEmpty({ message: '任务描述不能为空' })
  readonly desc: string

  @IsString({ message: '定时时间不正确' })
  @IsNotEmpty({ message: '定时时间不能为空' })
  readonly cron: string

  @IsString({ message: '最后执行结果不正确' })
  @IsNotEmpty({ message: '最后执行结果不能为空' })
  readonly result: string
}
