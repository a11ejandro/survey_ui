import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { statistics } from './__mocks__/Api'
import { Statistics, Task } from './module'
import './App.css'
import StatisticsChart from './StatisticsChart'
import TaskForm from './TaskForm'

interface State {
  results: Statistics[]
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      results: []
    }
  
    this.createTask = this.createTask.bind(this)
    this.getResults = this.getResults.bind(this)

    this.createTask = this.createTask.bind(this)
  }

  public render() {
    return (
      <div className="App">
        <Paper>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h3>Client for survey calculator</h3>
            </Grid>
            <Grid item xs={12}>
              <TaskForm createdCallback={this.createTask}/>
            </Grid>
            <Grid item xs={12}>
              <StatisticsChart data={this.state.results}/>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

  private createTask (task: Task) {
    console.log('submitted task')
    this.getResults()
  }

  private getResults () {
    this.setState({
      results: statistics
    })
  }
}

export default App

