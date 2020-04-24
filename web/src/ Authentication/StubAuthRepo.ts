import AuthRepo from './AuthRepo'

export class StubAuthRepo implements AuthRepo{
    login_returnValue?: Promise<void>

    login(username: string, password: string): Promise<void> {
        return this.login_returnValue!!
    }
}