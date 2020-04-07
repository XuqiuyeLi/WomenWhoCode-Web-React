import {HttpClient} from "./NetworkEventRepo";

class SpyHttpClient implements HttpClient{
    request_url: string = ""

    httpFetch(url: string): Promise<any> {
        this.request_url = url
        return Promise.resolve({})
    }
}

export default SpyHttpClient