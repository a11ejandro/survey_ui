import * as React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

import App from '../App'
import * as Api from '../Api'

jest.mock('../Api')
jest.useFakeTimers()

let mountedApp: any
const app = () => {
  if (!mountedApp) {
    mountedApp = shallow(<App/>)
  }
  return mountedApp
}

it ('renders correctly', () => {
  expect(toJson(app())).toMatchSnapshot()
})

it ('clears timeout on unmount', () => {
  app().instance().componentWillUnmount()
  expect(clearTimeout).toHaveBeenCalledTimes(1)
})

describe ('results', () => {
  it ('is initialized as empty array', () => {
    expect(app().state().results).toHaveLength(0)
  })

  it ('gets results from Api', async () => {
    const spyOnGetStatistics = jest.spyOn(Api, 'getStatistics')
    await app().instance().getResults()
    expect(spyOnGetStatistics).toBeCalled()
    expect(app().instance().state.results).toHaveLength(3)

    spyOnGetStatistics.mockReset()
    spyOnGetStatistics.mockRestore()
  })
})

describe ('task creation', () => {
  const newTask = {
    page: 1,
    per_page: 1000
  }

  it ('posts results to Api', async () => {
    const spyOnCreateTask = jest.spyOn(Api, 'createTask')
    await app().instance().createTask(newTask)
    expect(spyOnCreateTask).toBeCalled()

    spyOnCreateTask.mockReset()
    spyOnCreateTask.mockRestore()
  })

  it ('delays result refresh', async () => {
    await app().instance().createTask(newTask)
    expect(setTimeout).toHaveBeenLastCalledWith(app().instance().getResults, 3000)
  })

  describe ('toast notifications', () => {
    beforeEach(() => {
      app().setState({toasts: []})
    })

    it ('displays success notification', async () => {
      await app().instance().createTask(newTask)
      expect(app().state().toasts).toHaveLength(1)
      const toasts = app().find('#toast-container').children()
      expect(toasts).toHaveLength(1)
      expect(toasts.first().props().type).toBe('success')
    })

    it ('displays error', async () => {
      const spyOnCreateTask = jest.spyOn(Api, 'createTask').mockImplementation(() => Promise.reject)

      await app().instance().createTask(newTask)
      expect(app().state().toasts).toHaveLength(1)
      const toasts = app().find('#toast-container').children()
      expect(toasts).toHaveLength(1)
      expect(toasts.first().props().type).toBe('warning')

      spyOnCreateTask.mockReset()
      spyOnCreateTask.mockRestore()
    })

    it ('removes all toasts on click', async () => {
      await app().instance().createTask(newTask)
      await app().instance().createTask(newTask)
      expect(app().state().toasts).toHaveLength(2)
      const firstToast = app().find('#toast-container').children().first()
      firstToast.simulate('click')
      expect(app().state().toasts).toHaveLength(0)
      const toasts = app().find('#toast-container').children()
      expect(toasts).toHaveLength(0)
    })
  })
})
