import {HttpClient} from './NetworkEventRepo'

class SpyHttpClient implements HttpClient{
    request_url: string = ""

    get(url: string): Promise<any> {
        this.request_url = url
        return Promise.resolve([])
    }
}

export default SpyHttpClient