import React, {useEffect, useState} from 'react'
import WWCEvent from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'
import EventItem from './EventItem'
import {Link, useHistory} from 'react-router-dom'
import AuthRepo from '../ Authentication/AuthRepo'
import './EventList.scss'

type EventListProps = {
    eventRepo: EventRepo,
    authRepo: AuthRepo
}

function EventList(props: EventListProps) {
    const [events, setEvents] = useState<WWCEvent[]>([])
    const history = useHistory()

    useEffect(loadEvents, [props.eventRepo])

    function loadEvents() {
        props.eventRepo.getList()
            .then(events => setEvents(events))
    }

    function handleRemoveOnClick(eventId: string) {
        props.eventRepo.deleteEvent(eventId)
            .then(loadEvents)
            .catch(() => history.push('/login'))
    }

    function handleLogoutOnClick() {
        props.authRepo.logout()
    }

    return (
        <div className="EventList">
            <button className="Logout"
                    onClick={handleLogoutOnClick}
            >
                Log out
            </button>
            <h1>Events</h1>

            <div>
                {
                    events.map((event: WWCEvent) => (
                      <div key={event.id}>
                          <Link style={{textDecoration: 'none'}}
                                to={`/events/${event.id}`}
                          >
                              <EventItem event={event}/>
                          </Link>
                          <button className="Remove"
                                  onClick={() => handleRemoveOnClick(event.id)}
                          >
                              Remove
                          </button>
                      </div>
                    ))
                }
            </div>
        </div>
    )
}

export default EventList