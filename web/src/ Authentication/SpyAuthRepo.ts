import AuthRepo from './AuthRepo'

class SpyAuthRepo implements AuthRepo {
    login_argument_username?: string
    login_argument_password?: string
    logout_was_called: boolean = false

    login(username: string, password: string): Promise<void> {
        this.login_argument_username = username
        this.login_argument_password = password

        return Promise.resolve()
    }

    logout(): Promise<void> {
        this.logout_was_called = true
        return Promise.resolve();
    }
}

export default SpyAuthRepo