import React, { Component } from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import { navigate } from '@reach/router'

const blankError = {
  type: '',
  message: '',
}

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

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: blankError,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value })
  };

  handleSubmit(e) {
    e.preventDefault()
    const { username, password } = this.state

    this.setState({ error: blankError }, () => {
      axios
        .post('http://localhost:3000/auth/login', { username, password })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          navigate('/dashboard')
        })
        .catch((error) => {
          if (error.response) {
            const { type, message } = error.response.data
            this.setState({ error: { type, message } })
          } else if (error.request) {
            this.setState({
              error: {
                type: 'general',
                message: 'Unable to connect to server.',
              },
            })
          } else {
            this.setState({
              error: {
                type: 'general',
                message: 'Unable to create the request.',
              },
            })
          }
        })
    })
  }

  render() {
    const { classes } = this.props
    const { username, password, error } = this.state

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              error={error.type === 'username'}
              helperText={error.type === 'username' ? error.message : ' '}
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
              error={error.type === 'password'}
              helperText={error.type === 'password' ? error.message : ' '}
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
          {error.type === 'general' ? (
            <Typography color="error">{error.message}</Typography>
          ) : null}
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(SignIn)
