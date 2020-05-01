import {HttpClient} from './HttpClient'

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

    post(url: string, body: object | null): Promise<void> {
        return this.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status === 403) {
                throw Error('Forbidden')
            }
        })
    }

    postForm(url: string, body: FormData): Promise<void> {
        return this.fetch(url, {
            method: 'POST',
            body: body,
        }).then((response) => {
            if (response.status === 401) {
                throw Error('Unauthorized')
            }
        })
    }

    delete(url: string): Promise<void> {
        return this.fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw Error('Event could not be removed')
            }
        })
    }
}