import {HttpClient} from './NetworkEventRepo'

class StubHttpClient implements HttpClient{
    set httpFetch_returnValue(value: any) {
        this._httpFetch_returnValue = value
    }
    private _httpFetch_returnValue: any

    get(url: string): Promise<any> {
        return Promise.resolve(this._httpFetch_returnValue)
    }

    post(url: string, body: object): Promise<void> {
        return Promise.resolve();
    }
}

export default StubHttpClient