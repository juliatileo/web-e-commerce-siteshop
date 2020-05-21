import React from 'react'
import axios from 'axios'
import url from '../session/url'
import ReactLoading from 'react-loading'
import Session from '../session/session'
import Header from '../shared/Header'
import { Drawer, Button, TextField } from '@material-ui/core'
import './Perfil.css'


export default class Perfil extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            created: [],
            isLoading: true,
            exists: true,
            toggleDrawer: false,
            validation: {
                edit: ''
            },
            nome: '',
            email: '',
            senha: '',
            profpic: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleImagem = (e) => {
        this.setState({ profpic: e.target.files[0] })
    }

    getUser = () => {
        const { match: { params } } = this.props
        axios({
            method: 'GET',
            url: `${url}/user/${params.id}`
        })
            .then(res => {
                if (!res.data[0])
                    this.setState({ exists: false })
                console.log(res.data[0])
                this.setState({ user: res.data[0] })
                this.setState({ created: this.state.user.created_at.split('-').join().split(':').join().split(',').join().split(' ').join().split(',') })
                this.setState({ isLoading: false })
            })
            .catch(err => console.log(err))
    }

    editUser = () => {
        const { match: { params } } = this.props
        let data = new FormData()
        data.append('nome', this.state.nome)
        data.append('email', this.state.email)
        data.append('senha', this.state.senha)
        data.append('profpic', this.state.profpic)
        axios({
            method: 'PUT',
            url: `${url}/user/${params.id}`,
            headers: { 'Content-Type': 'multipart/formdata' },
            data: data
        })
            .then(() => {
                this.getUser()
                this.setState({ toggleDrawer: false })
            })
            .catch(() => {
                let { validation } = this.state
                validation.edit = 'Dados inválidos'
                this.setState({ validation })
            })
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        const { user } = this.state
        const { match: { params } } = this.props
        const session = new Session()
        const loggedUser = session.getUserInfo()[0]
        return (
            <>
                <Header />

                <>

                    <Drawer anchor="bottom" open={this.state.toggleDrawer} onClose={() => { this.setState({ toggleDrawer: false }) }}>
                        <div className="modal-add-produto">

                            <h2>Editar dados</h2>

                            <TextField placeholder="Nome" label="Nome" name="nome" onChange={this.handleChange} /> <br />

                            <TextField placeholder="Email" label="Email" name="email" onChange={this.handleChange} /> <br />

                            <TextField placeholder="Senha" label="Senha" name="senha" onChange={this.handleChange} /> <br /> <br />

                            <TextField type="file" onChange={this.handleImagem} /> <br /> <br />

                            <div className="error">{this.state.validation.edit}</div>

                            <Button variant="contained" color="primary" style={{ color: 'white' }} onClick={() => this.editUser()}>Editar</Button>
                        </div>

                    </Drawer>
                </>

                {!this.state.exists ? <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                    fontSize: '30px'
                }}>Usuário não existe</div> : <>
                        {this.state.isLoading ? <div className="loading">
                            <ReactLoading type="spin" height={50} width={50} color="black" />
                        </div>
                            : <div className="u-container">

                                <h2>Dados</h2>

                                {
                                    String(params.id) === String(loggedUser.id) ?
                                        <>
                                            <div className="u-img">
                                                <img src={user.profpic} alt="user-img" />
                                            </div>

                                            <div className="u-name">{String(user.nome).length > 30 ? String(user.nome).substring(0, 30) + '...' : user.nome}</div>
                                            <p>{user.creditos} créditos</p>
                                            <p>Registrou-se em {this.state.created[2]}/{this.state.created[1]}/{this.state.created[0]} às {this.state.created[3]}:{this.state.created[4]}</p>

                                            <div className="u-data">
                                                <div><span className="material-icons">email</span>{String(user.email).length > 20 ? String(user.email).substring(0, 20) + '...' : user.email}</div>
                                            </div>

                                            <div className="u-edit" onClick={() => this.setState({ toggleDrawer: true })}>Editar dados</div>
                                        </>
                                        :

                                        <>
                                            <div className="u-img">
                                                <img src={user.profpic} alt="user-img" />
                                            </div>

                                            <div className="u-name">{String(user.nome).length > 30 ? String(user.nome).substring(0, 30) + '...' : user.nome}</div>
                                            <p>{user.creditos} créditos</p>
                                            <p>Registrou-se em {this.state.created[2]}/{this.state.created[1]}/{this.state.created[0]} às {this.state.created[3]}:{this.state.created[4]}</p>
                                        </>
                                }


                            </div>}
                    </>}
            </>
        )
    }
}