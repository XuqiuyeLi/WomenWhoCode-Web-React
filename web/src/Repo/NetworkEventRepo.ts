import EventRepo from './EventRepo'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'
import {HttpClient} from './HttpClient'

class NetworkEventRepo implements EventRepo {
    private httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getList(): Promise<WWCEvent[]> {
        return this.httpClient.get('/api/events')
            .then(events => events.map(WWCEvent.fromJSON))
    }

    addEvent(event: NewWWCEvent): Promise<void> {
        return this.httpClient.post(
            '/api/events',
            event,
        )
    }

    getEvent(eventId: string): Promise<WWCEvent> {
        return this.httpClient.get(`/api/events/${eventId}`)
            .then(WWCEvent.fromJSON)
    }

    deleteEvent(eventId: string): Promise<void> {
        throw Error('Not Implemented')
    }
}

export default NetworkEventRepo
