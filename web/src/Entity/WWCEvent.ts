class WWCEvent {
    id: string
    name: string
    startDateTime: Date
    endDateTime: Date
    description: string
    venueName: string

    constructor(
        id: string,
        name: string,
        startDateTime: Date,
        endDateTime: Date,
        description: string,
        venueName: string,
    ) {
        this.id = id
        this.name = name
        this.startDateTime = startDateTime
        this.endDateTime = endDateTime
        this.description = description
        this.venueName = venueName
    }

    static fromJSON(jsonObject: any): WWCEvent {
        return new WWCEvent(
            jsonObject.id,
            jsonObject.name,
            new Date(jsonObject.startDateTime),
            new Date(jsonObject.endDateTime),
            jsonObject.description,
            jsonObject.venueName,
        )
    }
}

export class NewWWCEvent {
    name: string
    startDateTime: Date
    endDateTime: Date
    description: string
    venueName: string

    constructor(
        name: string,
        startDateTime: string,
        endDateTime: string,
        description: string,
        venueName: string,
    ) {
        this.name = name
        this.startDateTime = new Date(startDateTime)
        this.endDateTime = new Date(endDateTime)
        this.description = description
        this.venueName = venueName
    }
}

export default WWCEvent