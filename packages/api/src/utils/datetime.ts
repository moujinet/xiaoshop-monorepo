import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import utc from 'dayjs/plugin/utc'

import {
  DEFAULT_DATETIME_LOCALE,
} from '~/common/constants/intl.constant'

dayjs.extend(utc)
dayjs.locale(DEFAULT_DATETIME_LOCALE)

export {
  dayjs,
}
