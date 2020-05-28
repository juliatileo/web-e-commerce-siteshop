import React from 'react'
import './Header.css'
import Session from '../session/session'
import { Drawer, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            toggleDrawer: false
        }
    }
    render() {
        const session = new Session()
        const user = session.getUserInfo()[0]
        return (
            <>
                <Drawer open={this.state.toggleDrawer} onClose={() => this.setState({ toggleDrawer: !this.state.toggleDrawer })}>
                    <div className="user">
                        <div className="user-img">
                            <img src={user.profpic} alt="user" />
                        </div>
                        <div className="user-name">{user.nome.length > 10 ? user.nome.substring(0, 10) + '...' : user.nome}</div>
                        <div className="sair">
                            <Button onClick={session.logout}>Sair</Button>
                        </div>
                    </div>

                    <Link to={{
                        pathname: `/perfil/${user.id}`
                    }}>
                        <Button style={{ textTransform: 'none', width: '100%', borderBottom: '1px solid #ddd', borderRadius: '0' }}>Perfil</Button>
                    </Link>

                    <Link to={{
                        pathname: `/carrinho/${user.id}`
                    }}>
                        <Button style={{ textTransform: 'none', width: '100%', borderBottom: '1px solid #ddd', borderRadius: '0' }}>Carrinho</Button>
                    </Link>

                    <Link to={{
                        pathname: `/historico/${user.id}`
                    }}>
                        <Button style={{ textTransform: 'none', width: '100%', borderBottom: '1px solid #ddd', borderRadius: '0' }}>Histórico</Button>
                    </Link>
                </Drawer>
                <header>
                    <ul className="header-ul">
                        <li className="menu">
                            <span className="material-icons" onClick={() => this.setState({ toggleDrawer: !this.state.toggleDrawer })}>menu</span>
                        </li>
                        <li className="header-li">
                            <div className="logo"><Link to="/" style={{
                                color: 'white',
                                textDecoration: 'none'
                            }}>SiteShop</Link></div>
                        </li>
                    </ul>
                </header>
            </>
        )
    }
}