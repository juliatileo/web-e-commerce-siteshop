import React from 'react'
import Header from '../shared/Header'
import PageProdutos from './PageProdutos'

export default class Home extends React.Component {
    render() {
        return (
            <>
                <Header />
                <PageProdutos />
            </>
        )
    }
}