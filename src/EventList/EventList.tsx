import React, {useEffect, useState} from 'react'
import WWCEvent from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'
import EventItem from './EventItem'

type EventListProps = {
    eventRepo: EventRepo
}

function EventList(props: EventListProps) {
    const [events, setEvents] = useState<WWCEvent[]>([])

    useEffect(() => {
        props.eventRepo.getList()
            .then(events => setEvents(events))
    }, [props.eventRepo])

    return (
        <div>
            <h1>Events</h1>
            <div>
                {
                    events.map((event: WWCEvent, i: number) => {
                        return (
                            <EventItem key={i} event={event}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventList