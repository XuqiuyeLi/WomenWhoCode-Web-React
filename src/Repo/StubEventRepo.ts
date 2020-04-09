import EventRepo from './EventRepo'
import WWCEvent, {Venue} from '../Entity/WWCEvent'

class StubEventRepo implements EventRepo{
    getList(): Promise<any> {
        return Promise.resolve([
            new WWCEvent(
                '111',
                'First Event',
                '2020-04-11T09:00:00',
                '2020-04-11T17:30:00',
                new Venue('Code Chrysalis'))
        ])
    }
}

export default StubEventRepo