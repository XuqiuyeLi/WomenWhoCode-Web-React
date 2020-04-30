import {HttpClient} from './HttpClient'

class StubHttpClient implements HttpClient {
    get_returnValue: Promise<any> = Promise.resolve()
    post_returnValue: Promise<void> = Promise.resolve()
    postForm_returnValue: Promise<void> = Promise.resolve()
    delete_returnValue: Promise<void> = Promise.resolve()

    get(url: string): Promise<any> {
        return this.get_returnValue
    }

    post(url: string, body: object): Promise<void> {
        return this.post_returnValue
    }

    postForm(url: string, body: FormData): Promise<void> {
        return this.postForm_returnValue;
    }

    delete(url: string): Promise<void> {
        return this.delete_returnValue;
    }
}

export default StubHttpClient