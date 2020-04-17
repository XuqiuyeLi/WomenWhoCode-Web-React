import React, {useEffect, useState} from 'react'
import EventRepo from '../Repo/EventRepo'
import {useSafeRouteMatch} from '../useSafeRouteMatch'
import WWCEvent from '../Entity/WWCEvent'

interface EventDetailProps {
    eventRepo: EventRepo
}

function EventDetail(props: EventDetailProps) {
    const match = useSafeRouteMatch<{ eventId: string }>('/events/:eventId')
    const [eventDetail, setEventDetail] = useState<WWCEvent>()

    useEffect(() => {
        props.eventRepo.getEvent(match.params.eventId)
            .then(event => setEventDetail(event))
    }, [props.eventRepo, match.params.eventId])

    return (
        <div>
            EventDetail
            <div>{eventDetail?.name}</div>
            <div>{eventDetail?.description}</div>
        </div>
    )
}

export default EventDetail

