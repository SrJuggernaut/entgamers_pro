import { format, formatDistance, setDefaultOptions } from 'date-fns'
import { es } from 'date-fns/locale'

setDefaultOptions({ locale: es })

const DATE_FORMAT = 'yyyy-MM-dd HH:mm'

export const formatDate = (date: Date): string => format(date, DATE_FORMAT)

export const formatDistanceDate = (date: Date): string => formatDistance(date, new Date(), { locale: es })
