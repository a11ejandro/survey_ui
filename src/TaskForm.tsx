import * as React from 'react'

import { Task } from './module'

interface State {
  page: number,
  per_page: number
}

interface Props { createdCallback: (task: Task) => void }

export default class TaskForm extends React.Component<Props, State> {
  public render () {
    return null
  }
}
