import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Task } from './module'

interface State {
  page: number,
  per_page: number
}

interface Props { createdCallback: (task: Task) => void }

export default class TaskForm extends React.Component<Props, State> {
  public constructor(props:Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)

    this.state = {
      page: 0,
      per_page: 0
    }
  }

  public handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  public submit (event: React.SyntheticEvent) {
    event.preventDefault()
    const task = { page: this.state.page, per_page: this.state.per_page} as Task

    this.props.createdCallback(task)
  }

  public render () {
    const {page, per_page} = this.state
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <TextField
            id='page'
            label="Page"
            value={page}
            onChange={this.handleChange('page')}
            margin="normal"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='per_page'
            label="Per Page"
            value={per_page}
            onChange={this.handleChange('per_page')}
            margin="normal"
          />
        </Grid>
        <Grid item xs={4}>
          <br/>
          <Button
            id="submit_task"
            variant="outlined"
            color="primary"
            onClick={this.submit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    )
  }
}
