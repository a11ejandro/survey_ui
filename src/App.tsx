import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { ToastMessageAnimated } from 'react-toastr'
import 'toastr/build/toastr.css'

import { Statistics, Task, Toast } from './module'
import { createTask, getStatistics } from './Api'
import './App.css'
import StatisticsChart from './StatisticsChart'
import TaskForm from './TaskForm'

const DELAY_TO_REFRESH_RESULTS = 3000

interface State {
  results: Statistics[],
  toasts: Toast[]
}

class App extends React.Component<{}, State> {
  private timeout: number

  constructor(props: {}) {
    super(props)
    this.state = {
      results: [],
      toasts: []
    }

    this.createTask = this.createTask.bind(this)
    this.getResults = this.getResults.bind(this)
    this.removeToasts = this.removeToasts.bind(this)
    this.renderToasts = this.renderToasts.bind(this)
  }

  public componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  public async createTask (task: Task) {
    let newToast:Toast

    try {
      const result = await createTask(task)

      if (result.status === 200) {
        newToast = {
          message: result.data.message,
          type: 'success'
        }
        setTimeout(this.getResults, DELAY_TO_REFRESH_RESULTS)
      } else {
        newToast = {
          type: 'warning',
          message: 'Something went wrong. Check server logs for the stacktrace'
        }
      }
    } catch (e) {
      newToast = {
        type: 'warning',
        message: 'An error has occured. Check logs'
      }
    }

    this.setState({
      toasts: [newToast, ...this.state.toasts]
    })
  }


  public getResults () {
    getStatistics().then((data: Statistics[]) => {
      this.setState({
        results: data
      })
    })
  }

  public removeToasts (event: React.MouseEvent<HTMLElement>) {
    this.setState({
      toasts: []
    })
  }

  public renderToasts () {
    return (
      this.state.toasts.map((toast, index) => (
          <ToastMessageAnimated key={index}
                                onClick={this.removeToasts}
                                {...toast}    
          />
        )
      )
    )
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
        <div id='toast-container' className='toast-top-right'>
          { this.renderToasts() }
        </div>
      </div>
    )
  }
}

export default App
