import React from 'react'
import axios from 'axios'
import url from '../session/url'
import Session from '../session/session'
import Header from '../shared/Header'
import './Carrinho.css'
import { Button } from '@material-ui/core'

export default class Carrinho extends React.Component {
    constructor() {
        super()
        this.state = {
            carrinho: [],
            user: []
        }
    }

    getCarrinho = () => {
        const { match: { params } } = this.props
        axios({
            method: 'GET',
            url: `${url}/carrinho/${params.id}`
        })
            .then(res => {
                console.log(res.data)
                this.setState({ carrinho: res.data })
            })
            .catch(err => console.log(err))
    }

    deleteCarrinho = id => {
        axios({
            method: 'DELETE',
            url: `${url}/carrinho/${id}`
        })
            .then(() => this.getCarrinho())
            .catch(err => console.log(err))
    }

    comprarProduto = (id, vendedorid, produtoid, preco) => {
        let data = new FormData()
        data.append('comprador_id', this.state.user.id)
        data.append('vendedor_id', vendedorid)
        data.append('produto_id', produtoid)
        data.append('carrinho_id', id)
        data.append('preco', preco)
        axios({
            method: 'PUT',
            url: `${url}/venda`,
            data: data
        })
            .then((res) => {
                console.log(res.data)
                this.getCarrinho()
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        const session = new Session()
        const user = session.getUserInfo()[0]
        this.setState({ user })
        this.getCarrinho()
    }

    render() {
        const { match: { params } } = this.props
        return (
            <>
                <Header />
                <div className="c-container">
                    {this.state.user.id === Number(params.id)
                        ?
                        this.state.carrinho.map(carrinho =>
                            !carrinho.produto
                                ? null
                                :
                                <div key={carrinho.id}>
                                    <div className="c-card">
                                        <div className="c-info">
                                            <div className="c-img">
                                                <img src={carrinho.produto.imagem} alt="produto" />
                                            </div>
                                            <div className="c-content">
                                                <h3>{carrinho.produto.nome}</h3>
                                            </div>

                                            <div className="c-content">
                                                <h3>{carrinho.produto.preco}c</h3>
                                            </div>

                                            <div className="c-content">
                                                <Button variant="contained" color="primary" onClick={() => this.comprarProduto(carrinho.id, carrinho.produto.user_id, carrinho.produto.id, carrinho.produto.preco)}>Comprar</Button>
                                            </div>

                                            <div className="c-content">
                                                <span className="material-icons" style={{ color: 'crimson', cursor: 'pointer' }} onClick={() => this.deleteCarrinho(carrinho.id)}>delete</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                        )
                        :
                        <div style={{ textAlign: 'center' }}>Este carrinho não existe... pra você pelo menos</div>
                    }</div>
            </>
        )
    }
}