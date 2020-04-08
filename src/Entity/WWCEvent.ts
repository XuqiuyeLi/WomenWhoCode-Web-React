class WWCEvent {
    name: string
    startDateTime: Date
    endDateTime: Date
    venue: Venue

    constructor(
        name: string,
        startDateTime: string,
        endDateTime: string,
        venue: Venue) {
        this.name = name
        this.startDateTime = new Date(startDateTime)
        this.endDateTime = new Date(endDateTime)
        this.venue = venue
    }
}

export class Venue {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

export default WWCEvent