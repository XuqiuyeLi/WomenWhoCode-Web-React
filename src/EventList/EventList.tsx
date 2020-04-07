import React, {useEffect, useState} from 'react'
import WWCEvent from "../Entity/WWCEvent";
import EventRepo from "../Repo/EventRepo";

type EventListProps = {
    eventRepo: EventRepo
}

function EventList(props: EventListProps) {
  const [events, setEvents] = useState<WWCEvent[]>([])

  useEffect(() => {
    props.eventRepo.getList()
      .then(events => setEvents(events))
  }, [])

  return (
    <div>
      Events
      <div>
        {
          events.map((event: WWCEvent, i: number) => {
            return <div key={i}>{event.name}</div>
          })
        }
      </div>
    </div>
  )
}

export default EventList