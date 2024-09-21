/**
 * 系统定时任务执行事件
 */
export class SystemCronJobExecuteEvent {
  constructor(
    public readonly key: string,
    public readonly module: string,
    public readonly name: string,
    public readonly desc: string,
    public readonly cron: string,
    public readonly result: string,
  ) {}
}
