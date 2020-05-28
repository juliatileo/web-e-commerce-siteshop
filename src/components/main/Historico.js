import React from 'react'
import axios from 'axios'
import Session from '../session/session'
import url from '../session/url'
import ReactLoading from 'react-loading'
import './Historico.css'
import Header from '../shared/Header'

export default class Historico extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            vendas: [],
            created: [],
            isLoading: true,
            logged: []
        }
    }

    getUser = () => {
        const { match: { params } } = this.props
        axios({
            method: 'GET',
            url: `${url}/users/${params.id}`
        })
            .then(res => {
                this.setState({ user: res.data[0] })
            })
            .catch(err => console.log(err))
    }

    getVendas = () => {
        const { match: { params } } = this.props
        axios({
            method: 'GET',
            url: `${url}/vendas/${params.id}`
        })
            .then(res => {
                console.log(res.data)
                this.setState({ vendas: res.data })
                this.setState({ isLoading: false })
            })
            .catch(err => console.log(err))
    }

    async componentDidMount() {
        this.getVendas()
        this.getUser()
        const logged = new Session().getUserInfo()[0]
        this.setState({ logged: logged })
    }
    render() {
        const { match: { params } } = this.props
        return (
            <>
                <Header />
                {
                    this.state.logged.id === Number(params.id)
                        ?
                        <div className="h-container">
                            <h2>Compras</h2>
                            <p>Total de {this.state.user.compras} compras</p>
                            {this.state.isLoading
                                ?
                                <div className="loading">
                                    <ReactLoading type="spin" color="black" width={50} height={50} />
                                </div>
                                :
                                <>
                                    {this.state.vendas.map(compra =>
                                        Number(compra.comprador_id) === Number(params.id)
                                            ?
                                            <div className="h-card" key={compra.id}>
                                                <div className="h-img">
                                                    <img src={compra.produto_imagem} alt="produto" />
                                                </div>

                                                <div className="h-content">
                                                    <h3>{String(compra.produto_nome).length > 30 ? String(compra.produto_nome).substring(0, 30) + '...' : compra.produto_nome}</h3>
                                                    <p>{compra.preco}c</p>
                                                </div>

                                                <div className="h-content-vendedor">
                                                    <div className="h-img-vendedor">
                                                        <img src={compra.vendedor_imagem} alt="vendedor"></img>
                                                    </div>
                                                    <ul>
                                                        <li><h4 style={{ margin: '0 0 5px 0' }}>Vendedor</h4></li>
                                                        <li>{compra.vendedor_nome}</li>
                                                    </ul>
                                                </div>

                                            </div>
                                            : null
                                    )
                                    }
                                </>
                            }
                            <h2>Vendas</h2>
                            <p>Total de {this.state.user.vendas} vendas</p>
                            {this.state.vendas.map(venda =>
                                Number(venda.vendedor_id) === Number(params.id)
                                    ?
                                    <div className="h-card" key={venda.id}>
                                        <div className="h-img">
                                            <img src={venda.produto_imagem} alt="produto" />
                                        </div>

                                        <div className="h-content">
                                            <h3>{String(venda.produto_nome).length > 30 ? String(venda.produto_nome).substring(0, 30) + '...' : venda.produto_nome}</h3>
                                            <p>{venda.preco}c</p>
                                        </div>

                                        <div className="h-content-vendedor">
                                            <div className="h-img-vendedor">
                                                <img src={venda.comprador_imagem} alt="vendedor"></img>
                                            </div>
                                            <ul>
                                                <li><h4 style={{ margin: '0 0 5px 0' }}>Comprador</h4></li>
                                                <li>{venda.comprador_nome}</li>
                                            </ul>
                                        </div>

                                    </div>
                                    : null
                            )
                            }
                        </div>
                        : <div style={{ textAlign: 'center' }}>Este histórico não existe... pra você pelo menos</div>}
            </>
        )
    }
}