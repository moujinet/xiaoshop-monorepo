import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { setTimeout } from 'node:timers/promises'
import type { ILocation } from '@xiaoshop/schema'
import * as clack from '@clack/prompts'
import { minify } from 'html-minifier'
import { ofetch } from 'ofetch'
import { resolvePath } from './utils'
import config from './config'

interface IFetchOptions {
  code: string
  type: 'province' | 'city' | 'area' | 'street'
}

interface INormalizeParamsReturn {
  page: string
  regexp: RegExp
  codeLen: number
}

// eslint-disable-next-line regexp/no-super-linear-backtracking
const REG_LINK = /<a.*?>(.*?)<\/a>/g
const REG_PROVINCE = /<td><a href='(.*?).html'>(.*?)<br><\/a><\/td>/g
const REG_CITY = /<tr class='.*?'><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/g
const REG_VILLAGE = /<tr class='.*?'><td>(.*?)<\/td><td>.*?<\/td><td>(.*?)<\/td><\/tr>/g

export async function fetch(options: IFetchOptions, useCache = true): Promise<ILocation[]> {
  const {
    code = '',
    type = 'province',
  } = options

  const {
    page,
    codeLen,
    regexp,
  } = normalizeParams(type, code)

  const cacheFile = resolvePath(page, 'json', '.json')

  if (useCache && existsSync(cacheFile)) {
    const cache = JSON.parse(readFileSync(cacheFile, 'utf-8'))

    if (cache.length > 0)
      return cache as ILocation[]
  }

  const data: ILocation[] = []
  const html = await fetchPage(page, useCache)

  if (html && html.length > 0) {
    let current: string[] | null = []

    while (current !== null) {
      current = regexp.exec(html)

      if (current !== null) {
        data.push({
          code: current[1].replace(REG_LINK, '$1').trim().substring(0, codeLen),
          name: current[2].replace(REG_LINK, '$1').trim(),
        })
      }
    }

    if (useCache && data.length > 0)
      writeFileSync(cacheFile, JSON.stringify(data), 'utf-8')
  }

  return data
}

export async function fetchPage(page: string, useCache = true): Promise<string> {
  const cacheFile = resolvePath(page, 'html', '.html')

  let html: string = ''

  if (useCache && existsSync(cacheFile)) {
    const cache = readFileSync(cacheFile, 'utf-8') || ''

    if (cache && !cache.includes('Please enable JavaScript and refresh the page.'))
      html = cache
  }

  if (html === '') {
    const url = config.path.replace('{page}', page)

    html = await ofetch(`${url}?t=${Date.now()}`, {
      baseURL: config.host,
      retry: config.retry,
      retryDelay: config.retryDelay,
      timeout: config.timeout,
    }).catch((e) => {
      if (
        e.statusCode === 404
        && !page.endsWith('01')
        && !page.endsWith('1331')
        && !page.endsWith('350527')
      ) {
        // 全部市辖区、河北雄安新区、福建泉州金门，则跳过异常
        clack.log.error(e.message)
      }
      else if (
        e.statusCode !== 404
        && !e.message.includes('This operation was aborted')
      ) {
        clack.log.error(e.message)
      }
    })
  }

  let rawData: string = ''

  if (html && html.length > 0) {
    rawData = minify(html, {
      collapseWhitespace: true,
      quoteCharacter: '\'',
    })

    if (useCache) {
      writeFileSync(cacheFile, rawData, 'utf-8')
    }
  }

  await setTimeout(Math.random() * 100)

  return rawData
}

function normalizeParams(
  type: IFetchOptions['type'],
  code: IFetchOptions['code'],
): INormalizeParamsReturn {
  let page: string
  let regexp: RegExp
  let codeLen: number

  switch (type) {
    case 'province':
      page = 'index'
      regexp = REG_PROVINCE
      codeLen = 2
      break

    case 'city':
      page = code
      regexp = REG_CITY
      codeLen = 4
      break

    case 'area':
      // eslint-disable-next-line no-case-declarations
      let cityCode = code

      regexp = REG_CITY
      codeLen = 6

      if (isVillageCity(code)) {
        codeLen = 9
        cityCode = code.substring(0, 6)
      }

      page = `${code.substring(0, 2)}/${cityCode}`
      break

    case 'street':
      page = `${code.substring(0, 2)}/${code.substring(2, 4)}/${code}`
      regexp = REG_CITY
      codeLen = 9

      if (isVillageCity(code)) {
        codeLen = 12
        regexp = REG_VILLAGE
      }

      break
  }

  return {
    page,
    regexp,
    codeLen,
  }
}

// 县级市处理: 广东省中山市(4420), 广东省东莞市(4419), 海南省儋州市(4604)
function isVillageCity(code: string) {
  return code.startsWith('4420') || code.startsWith('4419') || code.startsWith('4604')
}
