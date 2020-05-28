import React from 'react';
import Login from './components/login/Login'
import Register from './components/login/Register'
import Session from './components/session/session'
import Home from './components/main/Home'
import Produto from './components/main/Produto'
import Perfil from './components/main/Perfil'
import Carrinho from './components/main/Carrinho'
import Historico from './components/main/Historico'
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
            <>
              <Route exact path="/" component={Home} />
              <Route path="/produto/:id" component={Produto} />
              <Route path="/perfil/:id" component={Perfil} />
              <Route path="/carrinho/:id" component={Carrinho} />
              <Route path="/historico/:id" component={Historico} />
            </>
            :
            <Switch>
              <Route path="/registrar" component={Register} />
              <Route exact path="/*" component={Login} />
            </Switch>
          }
        </ThemeProvider>
      </Router>
    );
  }
}