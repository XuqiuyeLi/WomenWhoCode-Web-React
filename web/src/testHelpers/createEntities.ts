import WWCEvent from '../Entity/WWCEvent'

export function createWWCEvent(wwcEvent: Partial<WWCEvent>): WWCEvent {
    return new WWCEvent(
        wwcEvent.id ?? '',
        wwcEvent.name ?? '',
        wwcEvent.startDateTime ?? new Date(0),
        wwcEvent.endDateTime ?? new Date(0),
        wwcEvent.description ?? '',
        wwcEvent.venueName ?? '',
    )
}