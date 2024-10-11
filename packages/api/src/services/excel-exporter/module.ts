import { Module } from '@nestjs/common'

import { ExcelExporterService } from './service'

@Module({
  providers: [
    ExcelExporterService,
  ],

  exports: [
    ExcelExporterService,
  ],
})
export class ExcelExporterModule {}
