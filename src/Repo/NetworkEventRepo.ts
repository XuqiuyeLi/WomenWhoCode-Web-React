import EventRepo from './EventRepo';
import WWCEvent from '../Entity/WWCEvent';

class NetworkEventRepo implements EventRepo{
  getList(): Promise<WWCEvent[]> {
    return Promise.resolve([
      new WWCEvent(1,'First Event'),
      new WWCEvent(2,'Second Event')
    ])
  }
}

export default NetworkEventRepo