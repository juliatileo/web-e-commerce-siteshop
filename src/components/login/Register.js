import React from 'react'
import url from '../session/url'
import axios from 'axios'
import { Paper, TextField, Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {

    state = {
        username: '',
        email: '',
        senha: '',
        imagem: '',
        redirecionar: false
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state.username, this.state.email, this.state.senha, this.state.imagem)
    }

    handleImage = e => {
        this.setState({ imagem: e.target.files[0] })
    }

    registrar = () => {
        let data = new FormData()
        data.append('username', this.state.username)
        data.append('email', this.state.email)
        data.append('senha', this.state.senha)
        data.append('profpic', this.state.imagem)
        axios({
            method: 'POST',
            url: `${url}/user`,
            data: data
        })
            .then(() => {
                this.setState({ redirecionar: true })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { email, senha, username, imagem } = this.state
        if (this.state.redirecionar)
            return <Redirect to="/" />
        return (
            <div className="fundo">
                <div className="login">
                    <Paper className="paper" elevation={3}>
                        <h2>Registro</h2>
                        <TextField type="text" label="Username" name="username" onChange={this.handleChange} value={username} /> <br />
                        <TextField type="text" label="E-mail" name="email" onChange={this.handleChange} value={email} /> <br />
                        <TextField type="password" label="Senha" name="senha" onChange={this.handleChange} value={senha} /> <br />
                        <TextField type="file" accept="image/x-png,image/gif,image/jpeg" name="imagem" onChange={this.handleImage} /> <br />
                        <Button variant="contained" color="primary" disableElevation onClick={this.registrar}>Registrar</Button>

                    </Paper>
                </div>
            </div>
        )
    }
}