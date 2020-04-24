import AuthRepo from './AuthRepo'

class SpyAuthRepo implements AuthRepo {
    login_argument_username?: string
    login_argument_password?: string

    login(username: string, password: string): Promise<void> {
        this.login_argument_username = username
        this.login_argument_password = password

        return Promise.resolve()
    }
}

export default SpyAuthRepo