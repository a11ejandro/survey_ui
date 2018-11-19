import * as React from 'react'
import 'chartjs-plugin-datalabels'
import { ChartData } from 'chart.js'
import { HorizontalBar } from 'react-chartjs-2'

import { Statistics } from './module'

interface Props {
  data?: Statistics[]
}

interface State {
  chartData: ChartData
}

const chartOptions = {
  plugins: {
    datalabels: {
      align: 'end',
      anchor: 'end',
      color: 'black'
    }
  }
}


export default class StatisticsChart extends React.Component<Props, State> {
  public static getDerivedStateFromProps(newProps: Props, oldState: State) {
    if (!newProps.data || newProps.data.length === 0 ) {
      return { chartData: null }
    }

    const labels:string[] = newProps.data.map((sample: Statistics) => sample.handler_type)
    const data:number[] = newProps.data.map((sample:Statistics) => sample.duration)

    const dataset = {
      label: newProps.data[0].collection_size + ' records',
      data
    }

    return {
      chartData: {
        labels,
        datasets: [dataset]
      }
    }
    
  }

  constructor (props:Props) {
    super(props)

    this.state = {} as State
  }

  public render () {
    if (!this.state.chartData) {
      return null
    }

    return (
      <HorizontalBar data={this.state.chartData} height={80} options={chartOptions}/>
    )
  }
}
