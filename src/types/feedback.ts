export interface Alert {
  id: string
  title: string
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
}
