import * as React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

import { statistics } from '../__mocks__/Api'
import StatisticsChart from '../StatisticsChart'

let mountedComponent: any
const component = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<StatisticsChart data={statistics}/>)
  }
  return mountedComponent
}

const validData = {
  labels: ['go', 'ruby no AR', 'ruby + AR'],
  datasets: [
    {
      label: '1000 records',
      data: [0.02, 0.05, 0.1]
    }
  ]
}

it ('renders correctly', () => {
  expect(toJson(component())).toMatchSnapshot()
})

describe ('transforming data to chart data', () => {
  it ('transforms correct chart data', () => {
    expect(component().state().chartData).toEqual(validData)
  })

  it ('resets state when no data was passed', () => {
    component().setProps({data: []})
    expect(component().state().chartData).toBeNull()
  })
})

