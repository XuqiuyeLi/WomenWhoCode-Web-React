import React, {useEffect, useState} from 'react'
import NetworkEventRepo from "../Repo/NetworkEventRepo";
import WWCEvent from "../Entity/WWCEvent";

type EventListProps = {
    eventRepo: NetworkEventRepo
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