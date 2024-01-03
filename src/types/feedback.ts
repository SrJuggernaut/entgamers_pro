export interface Alert {
  title: string
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
}
