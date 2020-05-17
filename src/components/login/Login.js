import React from 'react'
import Session from '../session/session'
import './Login.css'
import url from '../session/url'
import axios from 'axios'
import { Paper, TextField, Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'

export default class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        validate: {
            login: ''
        },
        redirecionar: false
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    logar = () => {
        const data = new FormData()
        data.append('email', this.state.email)
        data.append('senha', this.state.senha)
        axios({
            method: 'POST',
            url: `${url}/login`,
            data: data
        })
            .then((res) => {
                const session = new Session()
                session.login(res.data)
                this.setState({ redirecionar: true })
            })
            .catch(() => {
                let { validate } = this.state
                validate.login = 'Dados inválidos'
                this.setState({ validate })
            })
    }

    render() {
        const { validate, email, senha } = this.state
        if (this.state.redirecionar)
            return <Redirect to="/" />
        return (
            <div className="fundo">
                <div className="login">
                    <Paper className="paper" elevation={3}>
                        <h2>Login</h2>
                        <TextField type="text" label="E-mail" name="email" onChange={this.handleChange} value={email} /> <br />
                        <TextField type="password" label="Senha" name="senha" onChange={this.handleChange} value={senha} />
                        <Button variant="contained" color="primary" disableElevation onClick={this.logar}>Login</Button>

                        <div>Ainda não tem uma conta? <Link to="/registrar">Registre-se</Link></div>

                        <div className="error-login">{validate.login}</div>

                    </Paper>
                </div>
            </div>
        )
    }
}