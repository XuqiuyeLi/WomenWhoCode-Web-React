import React, {useEffect, useState} from 'react'
import WWCEvent from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'

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
            Events
            <div>
                {
                    events.map((event: WWCEvent, i: number) => {
                        const startDate = formatDate(event.startDateTime)
                        const time = formatTime(event.startDateTime, event.endDateTime)
                        return (
                            <div key={i}>
                                <div>{event.name}</div>
                                <div>{event.venue.name}</div>
                                <div>{startDate}</div>
                                <div>{time}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function formatDate(date: Date) {
    const options = {month: 'short', weekday: 'short', day: 'numeric'};
    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);

    const month = parts.find(part => part.type === 'month')?.value
    const day = parts.find(part => part.type === 'day')?.value
    const weekday = parts.find(part => part.type === 'weekday')?.value

    return `${month} ${day}, ${weekday}`
}

function formatTime(startDateTime: Date, endDateTime: Date) {
    const options = {hour: 'numeric', minute: 'numeric', hour12: true}
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    const startTime = dateTimeFormat.format(startDateTime);
    const endTime = dateTimeFormat.format(endDateTime);
    return `${startTime} - ${endTime}`
}


export default EventList