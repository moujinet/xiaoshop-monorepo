import { TextDecoder } from 'node:util'
import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { IWhoisInfo } from './interface'

@Injectable()
export class WhoisService {
  private readonly logger = new Logger(WhoisService.name)

  constructor(
    @Inject(HttpService)
    private readonly http: HttpService,
  ) {}

  /**
   * 查询 Whois 信息
   *
   * @param ip IP 地址
   * @returns Whois 信息
   */
  async search(ip: string): Promise<IWhoisInfo> {
    try {
      const url = `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`
      const response = await this.http.axiosRef.get<IWhoisInfo>(url, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
        transformResponse: [
          (data) => {
            const decoder = new TextDecoder('gbk')
            const str = decoder.decode(data)
            return JSON.parse(str)
          },
        ],
      })

      return response.data
    }
    catch (e) {
      this.logger.error('Whois 查询失败', e)
    }
  }
}
