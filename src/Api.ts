import axios, { AxiosResponse } from 'axios'
import { Statistics, Task } from './module'

const socketAddress = process.env.API_URL || ''
const axiosInstance = axios.create({
  baseURL: socketAddress + '/api/v1',
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  }
})


export async function createTask (task:Task) : Promise<AxiosResponse> {
  try {
    return await axiosInstance.post('tasks', task)
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
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

