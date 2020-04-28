import React, {useEffect, useState} from 'react'
import WWCEvent from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'
import EventItem from './EventItem'
import {Link} from 'react-router-dom'

type EventListProps = {
    eventRepo: EventRepo,
}

function EventList(props: EventListProps) {
    const [events, setEvents] = useState<WWCEvent[]>([])

    useEffect(loadEvents, [props.eventRepo])

    function loadEvents() {
        props.eventRepo.getList()
            .then(events => setEvents(events))
    }

    function handleRemoveOnClick(eventId: string) {
        props.eventRepo.deleteEvent(eventId)
            .then(loadEvents)
    }

    return (
        <div>
            <h1>Events</h1>

            <div>
                {
                    events.map((event: WWCEvent) => (
                        <Link style={{textDecoration: 'none'}}
                              to={`/events/${event.id}`}
                              key={event.id}
                        >
                            <EventItem event={event}/>
                            <button onClick={() => handleRemoveOnClick(event.id)}>Remove</button>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default EventList