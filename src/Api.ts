import axios from 'axios'
import { Statistics, Task } from './module'

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  }
})

export async function createTask (task:Task) : Promise<boolean> {
  try {
    await axiosInstance.post('tasks', task)
    return true
  } catch (e) {
    console.log(e)
    return Promise.reject<boolean>(e)
  }
}

export async function getStatistics () : Promise<Statistics[]> {
  try {
    const response = await axiosInstance.get('statistics')
    return response.data as Statistics[]
  } catch (e) {
    console.log(e)
    return Promise.reject<Statistics[]>(e)
  }
}

