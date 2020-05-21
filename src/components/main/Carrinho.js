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
                                                {carrinho.produto.nome}
                                            </div>

                                            <div className="c-content">
                                                {carrinho.produto.preco}c
                                            </div>

                                            <div className="c-content">
                                                <Button variant="contained" color="primary">Comprar</Button>
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