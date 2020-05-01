import AuthRepo from './AuthRepo'
import {HttpClient} from '../Repo/HttpClient'

export class NetworkAuthRepo implements AuthRepo {
    private httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    login(username: string, password: string): Promise<void> {
        const loginFormData = new FormData()
        loginFormData.append('username', username)
        loginFormData.append('password', password)

        return this.httpClient.postForm('/api/login', loginFormData)
    }

    logout(): Promise<void> {
        return this.httpClient.post('/api/logout', null)
    }
}
