import IP2Region from 'ip2region'
import { Injectable, Logger } from '@nestjs/common'

import { IWhoisInfo } from './interface'

@Injectable()
export class WhoisService {
  private readonly logger = new Logger(WhoisService.name)

  /**
   * 查询 Whois 信息
   *
   * @param ip IP 地址
   * @returns Whois 信息
   */
  async search(ip: string): Promise<IWhoisInfo> {
    try {
      const searcher = new IP2Region()

      const result = searcher.search(ip)

      if (!result)
        return { region: '未知' }

      const region = [
        result.country,
        result.province,
        result.city,
        result.isp,
      ].filter(Boolean).join('/')

      this.logger.debug(`查询 Whois 信息: ${ip} - ${region}`)

      return {
        ...result,
        region,
      }
    }
    catch (e) {
      this.logger.error(e)
      return { region: '未知' }
    }
  }
}
