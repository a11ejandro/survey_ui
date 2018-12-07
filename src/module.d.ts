export interface Statistics {
  handler_type: string
  collection_size: number
  duration: number
}

export interface Task {
  page: number
  per_page: number
}

export interface Toast {
  type: string
  message: string
}