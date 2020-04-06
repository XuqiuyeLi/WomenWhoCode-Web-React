import React, {useEffect, useState} from 'react'

function EventList(props) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    props.eventRepo.getList()
      .then(events => setEvents(events))
  }, [])

  return (
    <div>
      Events
      <div>
        {
          events.map((event, i) => {
            return <div key={i}>{event.name}</div>
          })
        }
      </div>
    </div>
  )
}

export default EventList