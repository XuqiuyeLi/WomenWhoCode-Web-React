import EventRepo from './EventRepo'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'

export class SpyEventRepo implements EventRepo {
    addEvent_Was_Called = false
    addEvent_argument_event?: NewWWCEvent

    addEvent(event: NewWWCEvent): Promise<void> {
        this.addEvent_argument_event = event
        this.addEvent_Was_Called = true
        return Promise.resolve()
    }

    getList(): Promise<WWCEvent[]> {
        return Promise.resolve([])
    }
}

export default SpyEventRepo