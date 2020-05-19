import React from 'react'
import axios from 'axios'
import url from '../session/url'
import Session from '../session/session'
import Header from '../shared/Header'
import './Perfil.css'


export default class Perfil extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {}
        }
    }

    getUser = () => {
        const { match: { params } } = this.props
        axios({
            method: 'GET',
            url: `${url}/user/${params.id}`
        })
            .then(res => {
                console.log(res.data[0])
                this.setState({ user: res.data[0] })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getUser()
    }
    render() {
        const { user } = this.state
        const { match: { params } } = this.props
        const session = new Session()
        const loggedUser = session.getUserInfo()[0]
        console.log(loggedUser.id)
        return (
            <>
                <Header />
                <div className="u-container">

                    <h2>Dados</h2>

                    {
                        params.id == loggedUser.id ?
                            <div className="u-content">

                                <div className="u-info">

                                    <div>
                                        Nome:
                                </div>

                                    <div>
                                        {String(user.nome).length > 20 ? String(user.nome).substring(0, 20) + '...' : user.nome}
                                    </div>

                                </div>

                                <div className="u-info">

                                    <div>
                                        Email:
                                </div>

                                    <div>
                                        {String(user.email).length > 20 ? String(user.email).substring(0, 20) + '...' : user.email}
                                    </div>

                                </div>

                                <div className="u-info">

                                    <div>
                                        Senha:
                                </div>

                                    <div>
                                        {String(user.senha).length > 20 ? String(user.senha).substring(0, 20) + '...' : user.senha}
                                    </div>

                                </div>

                                <div className="u-info">

                                    <div>
                                        Foto de perfil
                                </div>

                                    <div>

                                    </div>

                                </div>

                                <div className="u-info">

                                    <div>
                                        Créditos:
                                </div>

                                    <div>
                                        {user.creditos}
                                    </div>

                                </div>

                                <div style={{
                                    fontSize: '20px'
                                }}>Editar dados</div>

                                <span class="material-icons" style={{ color: 'crimson', cursor: 'pointer' }}>delete</span> Excluir conta

                            </div>

                            :
                            <>

                                <div className="u-content">
                                    <div className="u-info">

                                        <div>
                                            Nome:
                                </div>

                                        <div>
                                            {String(user.nome).length > 20 ? String(user.nome).substring(0, 20) + '...' : user.nome}
                                        </div>

                                        <div>

                                        </div>

                                    </div>



                                    <div className="u-info">

                                        <div>
                                            Créditos:
                                </div>

                                        <div>
                                            {user.creditos}
                                        </div>

                                        <div>

                                        </div>

                                    </div>
                                </div>
                            </>

                    }


                </div>
            </>
        )
    }
}