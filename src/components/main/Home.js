import React from 'react'
import Session from '../session/session'
import { Button } from '@material-ui/core'
import Header from '../shared/Header'

export default class Home extends React.Component {
    render() {
        const session = new Session
        return (
            <>
                <Header />
                <Button variant="contained" onClick={session.logout}>Sair</Button>
            </>
        )
    }
}