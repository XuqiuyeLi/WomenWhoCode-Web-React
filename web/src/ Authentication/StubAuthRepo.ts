import AuthRepo from './AuthRepo'

export class StubAuthRepo implements AuthRepo{
    login_returnValue?: Promise<void>
    logout_returnValue: Promise<void> = Promise.resolve()

    login(username: string, password: string): Promise<void> {
        return this.login_returnValue!!
    }

    logout(): Promise<void> {
        return this.logout_returnValue;
    }
}