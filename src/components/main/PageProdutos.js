import React from 'react'
import Session from '../session/session'
import url from '../session/url'
import './PageProdutos.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Drawer, Button, TextField } from '@material-ui/core'

export default class PageProdutos extends React.Component {

    constructor() {
        super()
        this.state = {
            produtos: [],
            nome: '',
            preco: 0,
            maxparcelas: 0,
            imagem: '',
            validation: {
                nome: '',
                preco: '',
                maxparcelas: ''
            },
            toggleDrawer: false,
            user: {},
            isLoading: true
        }
    }

    async componentDidMount() {
        this.getProdutos()
        const session = new Session()
        const user = await session.getUserInfo()[0]
        this.setState({ user: user })
    }

    getProdutos = () => {
        axios({
            method: 'GET',
            url: `${url}/produtos`
        })
            .then(res => {
                console.log(res.data)
                this.setState({ produtos: res.data })
            })
            .catch(err => console.log(err))
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleImagem = (e) => {
        this.setState({ imagem: e.target.files[0] })
    }

    addProduto = () => {
        let data = new FormData()
        data.append('nome', this.state.nome)
        data.append('preco', this.state.preco)
        data.append('maxparcelas', this.state.maxparcelas)
        data.append('imagem', this.state.imagem)
        const session = new Session()
        const user = session.getUserInfo()[0]
        axios({
            method: 'POST',
            url: `${url}/produtos/${user.id}`,
            data: data
        })
            .then(() => {
                this.setState({ toggleDrawer: false })
                this.getProdutos()
            })
            .catch(err => console.log(err))
    }

    validate = () => {
        let valid = true
        let { validation } = this.state
        if (this.state.nome.length > 75) {
            valid = false
            validation.nome = 'Nome muito grande'
            this.setState({ validation })
        } else {
            validation.preco = ''
            this.setState({ validation })
        }
        if (this.state.preco < 1 || this.state.preco > 1000000) {
            valid = false
            validation.preco = 'Preço inválido'
            this.setState({ validation })
        } else {
            validation.preco = ''
            this.setState({ validation })
        }
        if (this.state.maxparcelas < 1 || this.state.maxparcelas > 12) {
            valid = false
            validation.maxparcelas = 'Parcelas inválidas'
            this.setState({ validation })
        } else {
            validation.maxparcelas = ''
            this.setState({ validation })
        }
        if (valid) {
            this.addProduto()
        }
    }

    deleteProduto = (id) => {
        axios({
            method: 'DELETE',
            url: `${url}/produtos/${id}`
        })
            .then(() => this.getProdutos())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Drawer anchor="bottom" open={this.state.toggleDrawer} onClose={() => { this.setState({ toggleDrawer: false }) }}>
                    <div className="modal-add-produto">

                        <h2>Adicionar produto</h2>

                        <TextField placeholder="Nome" label="Nome" name="nome" onChange={this.handleChange} /> <br />
                        <div className="error">{this.state.validation.nome}</div>
                        <TextField placeholder="Preço" label="Preço" name="preco" type="number" onChange={this.handleChange} /> <br />
                        <div className="error">{this.state.validation.preco}</div>
                        <TextField placeholder="Parcelas" label="Parcelas" name="maxparcelas" type="number" onChange={this.handleChange} /> <br /> <br />
                        <div className="error">{this.state.validation.maxparcelas}</div>
                        <TextField type="file" onChange={this.handleImagem} /> <br /> <br />

                        <Button variant="contained" color="primary" style={{ color: 'white' }} onClick={this.validate}>Adicionar</Button>
                    </div>
                </Drawer>
                {this.state.produtos.map(produto => (
                    <div className="produto-container" key={produto.id}>

                        <div className="produto-card">

                            <div className="produto-img">
                                <img src={produto.imagem} alt="produto-imagem"></img>
                            </div>

                            <div className="produto-content">

                                <h2>
                                    <Link to={{
                                        pathname: `produto/${produto.id}`
                                    }}>
                                        {produto.nome.length > 40 ? produto.nome.substring(0, 40) + '...' : produto.nome}
                                    </Link>
                                </h2>

                                <p>{produto.preco}c</p>

                                {this.state.user.id === produto.user.id
                                    ? <p>Oferta <strong>sua</strong></p>
                                    :

                                    <>
                                        <p>
                                            Oferta de
                                            <Link to={{
                                                pathname: `/perfil/${produto.user.id}`
                                            }} style={{
                                                marginLeft: '5px'
                                            }}>
                                                <strong style={{ cursor: 'pointer' }}>
                                                    {String(produto.user.nome.length) > 10 ? String(produto.user.nome.substring(0, 10)) + '...' : produto.user.nome}
                                                </strong>
                                            </Link>
                                        </p>
                                    </>
                                }

                                <p className="p-span"> <span className="material-icons" style={{
                                    color: 'green',
                                    marginRight: '3px'
                                }}>payment</span>{produto.maxparcelas}x de {(produto.preco / produto.maxparcelas).toFixed(2)}c sem juros</p>

                                {this.state.user.id === produto.user.id
                                    ?
                                    <span style={{
                                        cursor: 'pointer', lineHeight: '0', color: 'crimson', margin: '20px 0'
                                    }} className="material-icons" onClick={() => this.deleteProduto(produto.id)}>delete</span>

                                    : <div></div>
                                }


                            </div>

                        </div>

                    </div >
                ))
                }
                <div className="add-produto" onClick={() => this.setState({ toggleDrawer: true })}>
                    <span className="material-icons">add</span>
                </div>
            </>
        )
    }
}