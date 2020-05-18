import React from 'react'
import Session from '../session/session'
import url from '../session/url'
import './PageProdutos.css'
import axios from 'axios'
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
                preco: '',
                maxparcelas: ''
            },
            toggleDrawer: false,
            user: {}
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
        if (this.state.preco < 1 || this.state.preco > 1000000) {
            valid = false
            validation.preco = 'Preço inválido'
            this.setState({ validation })
        } else {
            validation.preco = ''
            this.setState({ validation })
        }
        if (this.state.maxparcelas < 1 || this.state.max > 12) {
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

                                <h2>{produto.nome}</h2>

                                {this.state.user.id === produto.user.id
                                    ? <p>Oferta <strong>sua</strong></p>
                                    :

                                    <>
                                        <p>
                                            Oferta de <strong style={{ cursor: 'pointer' }}>
                                                {produto.user.nome}
                                            </strong>
                                        </p>
                                    </>
                                }

                                <p>{produto.preco}c</p>
                                <p>Máximo de {produto.maxparcelas} parcelas de {(produto.preco / produto.maxparcelas).toFixed(2)}c</p>

                                {this.state.user.id === produto.user.id
                                    ? <div style={{ color: 'crimson' }}>
                                        <span style={{ cursor: 'pointer' }} className="material-icons" onClick={() => this.deleteProduto(produto.id)}>delete</span>
                                    </div>
                                    : <div></div>
                                }


                            </div>

                        </div>

                    </div>
                ))}
                <div className="add-produto" onClick={() => this.setState({ toggleDrawer: true })}>
                    <span className="material-icons">add</span>
                </div>
            </>
        )
    }
}