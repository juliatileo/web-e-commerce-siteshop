import React from 'react';
import Login from './components/login/Login'
import Register from './components/login/Register'
import Session from './components/session/session'
import Home from './components/main/Home'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main:
        '#4cbbb9',
    }
  }
})

export default class App extends React.Component {
  render() {
    const session = new Session()
    return (
      <Router>
        <ThemeProvider theme={theme}>
          {session.isLogado()
            ?
            <Route exact path="/" component={Home} />
            :
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/registrar" component={Register} />
            </Switch>
          }
        </ThemeProvider>
      </Router>
    );
  }
}