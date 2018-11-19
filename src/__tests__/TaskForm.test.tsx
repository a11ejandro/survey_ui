import * as React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

import TaskForm from '../TaskForm'

const createTask= jest.fn()

let mountedComponent: any
const component = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<TaskForm createdCallback={createTask}/>)
  }
  return mountedComponent
}

it ('renders correctly', () => {
  expect(toJson(component())).toMatchSnapshot()
})

describe ('inputs', () => {
  it ('is initialized with zero values', () => {
    expect(component().state().page).toBe(0)
    expect(component().state().per_page).toBe(0)
  })


  it('connects page input to state', () => {
    const input = component().find('TextField#page').first()
    const event = { target: { value: 9000 }}
    input.simulate('change', event)
    expect(component().state().page).toBe(9000)
  })

  it('connects per page input to state', () => {
    const input = component().find('TextField#per_page').first()
    const event = { target: { value: 2061 }}
    input.simulate('change', event)
    expect(component().state().per_page).toBe(2061)
  })
})

describe ('task creation', () => {
  it ('calls callback with current page and per_page', () => {
    component().setState({
      page: 22,
      per_page: 22
    })

    const button = component().find('#submit_task')
    button.simulate('click', { preventDefault: () => false })
    expect(createTask).toBeCalledWith({page: 22, per_page: 22})
  })
})
