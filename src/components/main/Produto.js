import React from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading';
import { Button } from '@material-ui/core'
import url from '../session/url'
import Header from '../shared/Header'
import './Produto.css'

export default class Produto extends React.Component {
    constructor() {
        super()
        this.state = {
            produto: [],
            isLoading: true
        }
    }

    getProduto = () => {
        const { match: { params } } = this.props;

        axios({
            method: 'GET',
            url: `${url}/produtos/${params.id}`
        })
            .then(res => {
                console.log(res.data[0])
                this.setState({ produto: res.data[0], isLoading: false })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getProduto()
    }
    render() {
        const { produto } = this.state
        return (
            <>
                <Header />

                {
                    this.state.isLoading
                        ? <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                            width: '100vw'
                        }}><ReactLoading type="spin" color="black" height={30} width={30} /></div>
                        : <div className="p-container">

                            <div className="p-img">
                                <img src={produto.imagem} alt="imagem produto"></img>
                            </div>

                            <div className="p-content">
                                <h2>{String(produto.nome).length > 30 ? String(produto.nome).substring(0, 30) + '...' : produto.nome}</h2>
                                <p className="preco">{produto.preco}c</p>
                                <p className="p-span">
                                    <span className="material-icons" style={{ color: 'green', marginRight: '3px' }}>payment</span>{produto.maxparcelas}x de {(produto.preco / produto.maxparcelas).toFixed(2)}c sem juros
                                </p>
                                <Button variant="contained" color="primary" style={{ color: 'white', marginTop: '30px' }}>Adicionar ao carrinho</Button>
                            </div>

                        </div>
                }


            </>
        )
    }
}