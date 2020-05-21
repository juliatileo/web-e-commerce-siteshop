import React from 'react'
import Session from '../session/session'
import url from '../session/url'
import axios from 'axios'
import { Button } from '@material-ui/core'
import Header from '../shared/Header'
import './Ganhar.css'

export default class Ganhar extends React.Component {
    constructor() {
        super()
        this.state = {
            creditos: 0,
            desabilitado: false
        }
    }

    ganharCreditos = () => {
        this.setState({ desabilitado: true })
        let user = new Session().getUserInfo()[0]
        let creditos
        let ganhaPerde = Math.floor(Math.random() * 10)
        switch (ganhaPerde) {
            case 0: creditos = Math.floor(Math.random() * 1000)
                break;
            case 1: creditos = Math.floor(Math.random() * -100)
                break;
            case 2: creditos = Math.floor(Math.random() * -100)
                break;
            case 3: creditos = Math.floor(Math.random() * -100)
                break;
            case 4: creditos = Math.floor(Math.random() * -100)
                break;
            case 5: creditos = Math.floor(Math.random() * -1000)
                break;
            case 6: creditos = Math.floor(Math.random() * -100)
                break;
            case 7: creditos = Math.floor(Math.random() * -100)
                break;
            case 8: creditos = Math.floor(Math.random() * -100)
                break;
            case 9: creditos = Math.floor(Math.random() * 100)
                break;
        }
        this.setState({ creditos })
        console.log(this.state.creditos)
        let data = new FormData()
        data.append('creditos', creditos)
        axios({
            method: 'PUT',
            url: `${url}/creditos/${user.id}`,
            data: data
        })
            .then(res => {
                console.log(res.data)
                this.setState({ desabilitado: false })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <Header />
                <div className="g-container">
                    <div className="g-card">
                        {this.state.creditos >= 0
                            ? <div style={{ margin: '20px' }}>Você ganhou {this.state.creditos} créditos</div>
                            :
                            <div style={{ margin: '20px' }}> Você perdeu {this.state.creditos} créditos</div>
                        }
                        <Button color="primary" variant="contained" onClick={this.ganharCreditos} disabled={this.state.desabilitado}>Gerar créditos</Button>
                    </div>
                </div>
            </>
        )
    }
}