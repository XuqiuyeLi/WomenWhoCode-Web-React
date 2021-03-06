import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'

interface EventRepo {
    getList(): Promise<WWCEvent[]>

    addEvent(event: NewWWCEvent): Promise<void>

    getEvent(eventId: string): Promise<WWCEvent>

    deleteEvent(eventId: string): Promise<void>
}

export default EventRepo