import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import { withAuthContext } from '../../lib/authContext'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value })
  };

  handleSubmit(e) {
    e.preventDefault()

    const { login } = this.props
    const { username, password } = this.state

    login({ username, password })
  }

  render() {
    const { classes, authError } = this.props
    const { username, password } = this.state

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              error={authError.type === 'username'}
              helperText={authError.type === 'username' ? authError.message : ' '}
              id="username"
              label="Username"
              className={classes.textField}
              value={username}
              onChange={this.handleChange('username')}
              margin="normal"
              variant="outlined"
              autoComplete="username"
              fullWidth
            />
            <TextField
              error={authError.type === 'password'}
              helperText={authError.type === 'password' ? authError.message : ' '}
              id="password"
              label="Password"
              className={classes.textField}
              value={password}
              type="password"
              onChange={this.handleChange('password')}
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
          {authError.type === 'general' ? (
            <Typography color="error">{authError.message}</Typography>
          ) : null}
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(withAuthContext(Login))
