import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { Task } from './module'
import './App.css'
import TaskForm from './TaskForm'

class App extends React.Component<{}, {}> {


  constructor(props: {}) {
    super(props)

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
          </Grid>
        </Paper>
      </div>
    )
  }

  private createTask (task: Task) {
    console.log('submitted task')
  }
}

export default App

