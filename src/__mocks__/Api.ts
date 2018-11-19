import { Statistics, Task } from '../module'

const promisify = (resolver: any) => {
  return new Promise((resolve, reject) => {
    resolve(resolver)
  })
}

export const statistics = [
  { collection_size: 1000, duration: 0.02, handler_type: 'go' },
  { collection_size: 1000, duration: 0.05, handler_type: 'ruby no AR'},
  { collection_size: 1000, duration: 0.1, handler_type: 'ruby + AR'}
]

export function getStatistics () {
  return promisify(statistics as Statistics[])
}

export function createTask (task: Task) {
  return promisify(true)
}
