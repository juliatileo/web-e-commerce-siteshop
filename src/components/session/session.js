import CryptoJS from 'crypto-js'


export default class Session {

    constructor() {
        if (!this.getUserInfo()) this.logout()
    }

    login(usuario) {
        if (localStorage.getItem('session') === null) {
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(usuario), '==15eD65-8fujdau9jj3850835083a310[31f03LlK67p7]').toString()
            localStorage.setItem('session', encrypted)
        }
        window.location.reload()
    }

    getUserInfo() {
        if (localStorage.getItem('session') !== null) {
            const encrypted = localStorage.getItem('session')
            const bytes = CryptoJS.AES.decrypt(encrypted, '==15eD65-8fujdau9jj3850835083a310[31f03LlK67p7]')
            let originalText = ''
            try {
                originalText = bytes.toString(CryptoJS.enc.Utf8)
                return JSON.parse(originalText)
            } catch (e) {
                this.logout()
            }
        }
        else
            return {}

    }

    logout() {
        localStorage.removeItem('session')
        window.location.reload()
    }

    isLogado() {
        return localStorage.getItem('session') !== null
    }
}