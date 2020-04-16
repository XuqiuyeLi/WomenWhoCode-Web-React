import {HttpClient} from './NetworkEventRepo'

class StubHttpClient implements HttpClient {
    get_returnValue: any
    post_returnValue: Promise<void> = Promise.resolve()

    get(url: string): Promise<any> {
        return Promise.resolve(this.get_returnValue)
    }

    post(url: string, body: object): Promise<void> {
        return this.post_returnValue
    }
}

export default StubHttpClient