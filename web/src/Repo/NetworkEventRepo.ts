import EventRepo from './EventRepo'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'

class NetworkEventRepo implements EventRepo {
    private httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getList(): Promise<WWCEvent[]> {
        return this.httpClient.get('/api/events')
            .then(events => {
                return events.map((event: any) => {
                    return new WWCEvent(
                        event.id,
                        event.name,
                        event.startDateTime,
                        event.endDateTime,
                        event.venue,
                    )
                })
            })
    }

    addEvent(event: NewWWCEvent): Promise<void> {
        return Promise.resolve()
    }
}

export interface HttpClient {
    get(url: string): Promise<any>
}

export class NetworkHttpClient implements HttpClient {
    private fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
    constructor(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
        this.fetch = fetch
    }

    get(url: string): Promise<any> {
        return this.fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => res.json())
    }
}

export default NetworkEventRepo
