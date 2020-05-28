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
            url: `${url}/carrinhos/${params.id}`
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
            url: `${url}/carrinhos/${id}`
        })
            .then(() => this.getCarrinho())
            .catch(err => console.log(err))
    }

    comprarProduto = (produtoid, vendedorid, carrinhoid, preco) => {
        axios({
            method: 'POST',
            url: `${url}/vendas`,
            data: {
                comprador_id: this.state.user.id,
                produto_id: produtoid,
                vendedor_id: vendedorid,
                carrinho_id: carrinhoid,
                preco: preco
            }
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
                            !carrinho.produto_id
                                ? null
                                :
                                <div key={carrinho.id}>
                                    <div className="c-card">
                                        <div className="c-info">
                                            <div className="c-img">
                                                <img src={carrinho.produto_imagem} alt="produto" />
                                            </div>
                                            <div className="c-content">
                                                <h3>{carrinho.produto_nome}</h3>
                                            </div>

                                            <div className="c-content">
                                                <h3>{carrinho.produto_preco}c</h3>
                                            </div>

                                            <div className="c-content">
                                                <Button variant="contained" color="primary" onClick={() => this.comprarProduto(carrinho.produto_id, carrinho.vendedor_id, carrinho.id, carrinho.produto_preco)}>Comprar</Button>
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