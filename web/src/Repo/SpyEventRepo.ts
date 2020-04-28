import EventRepo from './EventRepo'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'
import {createWWCEvent} from '../testHelpers/createEntities'

export class SpyEventRepo implements EventRepo {
    addEvent_Was_Called = false
    addEvent_argument_event?: NewWWCEvent
    getEvent_argument_id?: string
    deleteEvent_argument_eventId?: string

    addEvent(event: NewWWCEvent): Promise<void> {
        this.addEvent_argument_event = event
        this.addEvent_Was_Called = true
        return Promise.resolve()
    }

    getEvent(id: string): Promise<WWCEvent> {
        this.getEvent_argument_id = id
        return Promise.resolve(
            createWWCEvent({}),
        )
    }

    getList(): Promise<WWCEvent[]> {
        return Promise.resolve([])
    }

    deleteEvent(eventId: string): Promise<void> {
        this.deleteEvent_argument_eventId = eventId
        return Promise.resolve()
    }
}

export default SpyEventRepo