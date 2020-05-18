import React from 'react'
import './Header.css'
import Session from '../session/session'
import { Drawer, Button } from '@material-ui/core'

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
                        <div className="user-img" alt="user">
                            <img src={user.profpic} />
                        </div>
                        <div className="user-name">{user.nome.length > 10 ? user.nome.substring(0, 10) + '...' : user.nome}</div>
                        <div className="sair">
                            <Button onClick={session.logout}>Sair</Button>
                        </div>
                    </div>
                    <Button style={{
                        padding: '10px 150px'
                    }}>teste</Button>
                </Drawer>
                <header>
                    <ul className="header-ul">
                        <li className="menu">
                            <span className="material-icons" onClick={() => this.setState({ toggleDrawer: !this.state.toggleDrawer })}>menu</span>
                        </li>
                        <li className="header-li">
                            <div className="logo">SiteShop</div>
                        </li>
                    </ul>
                </header>
            </>
        )
    }
}