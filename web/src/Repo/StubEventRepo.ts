import EventRepo from './EventRepo'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'
import {createWWCEvent} from '../testHelpers/createEntities'

class StubEventRepo implements EventRepo {
    addEvent_returnValue: Promise<void> = Promise.resolve()
    getEvent_returnValue: Promise<WWCEvent> = Promise.resolve(createWWCEvent({}))
    deleteEvent_returnValue: Promise<void> = Promise.resolve()

    getList(): Promise<any> {
        return Promise.resolve([
            new WWCEvent(
                '111',
                'First Event',
                new Date('2020-04-11T09:00:00'),
                new Date('2020-04-11T17:30:00'),
                'event description',
                'Code Chrysalis'),
        ])
    }

    addEvent(event: NewWWCEvent): Promise<void> {
        return this.addEvent_returnValue
    }

    getEvent(eventId: string): Promise<WWCEvent> {
        return this.getEvent_returnValue
    }

    deleteEvent(eventId: string): Promise<void> {
        return this.deleteEvent_returnValue
    }
}

export default StubEventRepo