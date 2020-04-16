import EventRepo from './EventRepo'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'

class StubEventRepo implements EventRepo {
    addEvent_returnValue: Promise<void> = Promise.resolve()

    getList(): Promise<any> {
        return Promise.resolve([
            new WWCEvent(
                '111',
                'First Event',
                '2020-04-11T09:00:00',
                '2020-04-11T17:30:00',
                'event description',
                'Code Chrysalis'),
        ])
    }

    addEvent(event: NewWWCEvent): Promise<void> {
        return this.addEvent_returnValue
    }
}

export default StubEventRepo