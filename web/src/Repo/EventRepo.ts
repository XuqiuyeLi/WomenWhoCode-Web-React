import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'

interface EventRepo {
    getList(): Promise<WWCEvent[]>

    addEvent(event: NewWWCEvent): Promise<void>
}

export default EventRepo