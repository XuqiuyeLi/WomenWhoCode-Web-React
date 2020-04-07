import EventRepo from './EventRepo';
import WWCEvent from '../Entity/WWCEvent';

class NetworkEventRepo implements EventRepo {
    private httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getList(): Promise<WWCEvent[]> {
        return this.httpClient.httpFetch("http://localhost:8080/api/events/past")
    }
}

export interface HttpClient {
    httpFetch(url: string): Promise<any>
}

export class NetworkHttpClient implements HttpClient {
    httpFetch(url: string): Promise<any> {
        return fetch("http://localhost:8080/api/events/past", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000'
            }
        })
            .then(res => res.json())
    }
}

export default NetworkEventRepo
