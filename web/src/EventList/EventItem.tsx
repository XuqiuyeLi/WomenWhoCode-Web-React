import React from 'react'
import WWCEvent from '../Entity/WWCEvent'
import './EventItem.scss'

type EventItemProps = {
    event: WWCEvent
}

function EventItem(props: EventItemProps) {
    const {event} = props
    const startDate = formatDate(event.startDateTime)
    const time = formatTime(event.startDateTime, event.endDateTime)

    return (
        <div className="EventItem">
            <div className="date">{startDate}</div>
            <div className="title">{event.name}</div>
            <div className="time">{time}</div>
            <div className="location">{event.venueName}</div>
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

export default EventItem
