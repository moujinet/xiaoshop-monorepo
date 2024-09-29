import { IsNotEmpty, IsNumber, IsNumberString, IsString, Min } from 'class-validator'

export class ResourceUploadPayload {
  @IsNumberString({}, { message: '素材分组 ID 不正确' })
  readonly groupId: number
}

export class ResourceCreatePayload {
  @IsNumber({}, { message: '素材分组 ID 不正确' })
  readonly groupId: number

  @IsString({ message: '素材名称不正确' })
  @IsNotEmpty({ message: '素材名称不能为空' })
  readonly name: string

  @IsString({ message: '文件类型不正确' })
  @IsNotEmpty({ message: '文件类型不能为空' })
  readonly mimeType: string

  @IsString({ message: '文件路径不正确' })
  @IsNotEmpty({ message: '文件路径不能为空' })
  readonly path: string

  @IsNumber({}, { message: '文件大小不正确' })
  @Min(0, { message: '文件大小不正确' })
  readonly size: number
}
