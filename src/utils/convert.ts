/** bytes转kb */
export function bytesToKB(bytes: number) {
  return bytes / 1024
}

/** bytes转mb */
export function bytesToMB(bytes: number) {
  return bytes / (1024 * 1024)
}

/** bytes转gb */
export function bytesToGB(bytes: number) {
  return bytes / (1024 * 1024 * 1024)
}

/** kb转bytes */
export function KBToBytes(kb: number) {
  return kb * 1024
}

/** mb转bytes */
export function MBToBytes(mb: number) {
  return mb * 1024 * 1024
}

/** gb转bytes */
export function GBToBytes(gb: number) {
  return gb * 1024 * 1024 * 1024
}

/**
 * 转换时间单位
 * @param time 时间 "DAY"
 * @return "天"
 */
export function convertIntervalUnit(time: string) {
  switch (time) {
    case 'MILLISECOND':
      return '毫秒'
    case 'SECOND':
      return '秒'
    case 'MINUTE':
      return '分钟'
    case 'HOUR':
      return '小时'
    case 'DAY':
      return '天'
    case 'WEEK':
      return '周'
    case 'MONTH':
      return '月'
    case 'YEAR':
      return '年'
    default:
      return time
  }
}

/**
 * 将数值转换为星期
 *
 * @param week 星期
 * @param isChinese 是否为中文
 */
export function convertCalendarWeek(week: string, isChinese: boolean = true) {
  switch (week) {
    case '1':
      return isChinese ? '日' : 'SUNDAY'
    case '2':
      return isChinese ? '一' : 'MONDAY'
    case '3':
      return isChinese ? '二' : 'TUESDAY'
    case '4':
      return isChinese ? '三' : 'WEDNESDAY'
    case '5':
      return isChinese ? '四' : 'THURSDAY'
    case '6':
      return isChinese ? '五' : 'FRIDAY'
    case '7':
      return isChinese ? '六' : 'SATURDAY'
    default:
      return week
  }
}
