import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { withAuthContext } from '../../lib/authContext'

const styles = {
  appbar: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const ButtonAppBar = (props) => {
  const {
    classes,
    authorised,
    user,
    logout,
  } = props

  return (
    <div className={classes.appbar}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Campus
          </Typography>
          {
            authorised
              ? <Button color="inherit" onClick={logout}>{ user.givenName }</Button>
              : <Button color="inherit" href="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(withAuthContext(ButtonAppBar))
