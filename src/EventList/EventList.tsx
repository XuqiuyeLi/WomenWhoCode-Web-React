import React, {useEffect, useState} from 'react'
import WWCEvent from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'
import EventItem from './EventItem'
import WWCRouter from '../Router/WWCRouter'

type EventListProps = {
    eventRepo: EventRepo,
    router: WWCRouter
}

function EventList(props: EventListProps) {
    const [events, setEvents] = useState<WWCEvent[]>([])

    useEffect(() => {
        props.eventRepo.getList()
            .then(events => setEvents(events))
    }, [props.eventRepo])

    const eventClicked = (eventId: Number) => {
        console.log('---clicked with id:', eventId)
        props.router.redirectToEventDetailsPage(eventId)
    }

    return (
        <div>
            <h1>Events</h1>
            <div>
                {
                    events.map((event: WWCEvent, i: number) => {
                        // console.log(event.id)
                        return (
                            <div key={i} onClick={() => eventClicked(event.id)}>
                                <EventItem event={event}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventList