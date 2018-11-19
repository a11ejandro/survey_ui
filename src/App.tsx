import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { Statistics, Task } from './module'
import { createTask, getStatistics } from './Api'
import './App.css'
import StatisticsChart from './StatisticsChart'
import TaskForm from './TaskForm'

interface State {
  results: Statistics[]
}

class App extends React.Component<{}, State> {
  private timeout: number

  constructor(props: {}) {
    super(props)
    this.state = {
      results: []
    }

    this.createTask = this.createTask.bind(this)
    this.getResults = this.getResults.bind(this)
  }

  public componentWillUnmount () {
    clearTimeout(this.timeout)
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
              <Button
                variant="outlined"
                color="primary"
                onClick={this.getResults}>
                Get last results
              </Button>
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
    createTask(task).then((success: boolean) => {
      setTimeout(this.getResults, 3000)
    })
  }

  private getResults () {
    getStatistics().then((data: Statistics[]) => {
      this.setState({
        results: data
      })
    })
  }
}

export default App
