import {HttpClient} from './NetworkEventRepo'

class SpyHttpClient implements HttpClient{
    request_argument_url: string = ''
    post_argument_url: string = ''
    post_argument_body?: object

    get(url: string): Promise<any> {
        this.request_argument_url = url
        return Promise.resolve([])
    }

    post(url: string, body: object): Promise<void> {
        this.post_argument_url = url
        this.post_argument_body = body
        return Promise.resolve();
    }
}

export default SpyHttpClient