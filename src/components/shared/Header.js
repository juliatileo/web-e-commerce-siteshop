import React from 'react'
import './Header.css'
import { Drawer, ListItem, ListItemText, List, Button } from '@material-ui/core'

export default class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            toggleDrawer: false
        }
    }

    render() {
        return (
            <>
                <Drawer open={this.state.toggleDrawer} onClose={() => this.setState({ toggleDrawer: !this.state.toggleDrawer })}>
                    <div className="user">
                        <div className="user-img">a</div>
                        <div className="user-name">b</div>
                    </div>
                    <Button style={{
                        padding: '10px 150px'
                    }}>teste</Button>
                </Drawer>
                <header>
                    <ul className="header-ul">
                        <li className="menu">
                            <span class="material-icons" onClick={() => this.setState({ toggleDrawer: !this.state.toggleDrawer })}>menu</span>
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