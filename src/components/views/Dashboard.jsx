import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from './AppBar'

const styles = () => ({
  root: {
    display: 'flex',
    padding: '0',
  },
})

const Dashboard = ({ classes }) => (
  <div className={classes.root}>
    <AppBar />
  </div>
)

export default withStyles(styles)(Dashboard)
