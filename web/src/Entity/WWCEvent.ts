class WWCEvent {
    id: string
    name: string
    startDateTime: Date
    endDateTime: Date
    venue: Venue

    constructor(
        id: string,
        name: string,
        startDateTime: string,
        endDateTime: string,
        venue: Venue,
    ) {
        this.id = id
        this.name = name
        this.startDateTime = new Date(startDateTime)
        this.endDateTime = new Date(endDateTime)
        this.venue = venue
    }
}

export class NewWWCEvent {
    name: string
    venueName: string

    constructor(
        name: string,
        venueName: string,
    ) {
        this.name = name
        this.venueName = venueName
    }
}

export class Venue {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

export default WWCEvent