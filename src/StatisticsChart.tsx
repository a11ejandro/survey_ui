import * as React from 'react'
import { ChartData } from 'chart.js'

import { Statistics } from './module'

interface Props {
  data?: Statistics[]
}

interface State {
  chartData: ChartData
}

export default class StatisticsChart extends React.Component<Props, State> {
  public render () {
    return null
  }
}
