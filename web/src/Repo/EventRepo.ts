import WWCEvent from "../Entity/WWCEvent";

interface EventRepo {
    getList(): Promise<WWCEvent[]>
}

export default EventRepo